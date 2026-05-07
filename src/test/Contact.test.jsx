import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Contact from '../components/Contact'
import { machines } from '../data/machines'

const STORAGE_KEY = 'enquiry_counts'

function fillForm(overrides = {}) {
  return {
    name: 'Test User',
    email: 'test@example.com',
    message: 'Hello',
    ...overrides,
  }
}

async function submitForm(user, fields = fillForm()) {
  if (fields.name)    await user.type(screen.getByLabelText(/your name/i), fields.name)
  if (fields.email)   await user.type(screen.getByLabelText(/email address/i), fields.email)
  if (fields.message) await user.type(screen.getByLabelText(/message/i), fields.message)
  await user.click(screen.getByRole('button', { name: /send enquiry/i }))
}

beforeEach(() => {
  localStorage.clear()
  vi.restoreAllMocks()
})

describe('Contact form', () => {
  it('renders all form fields', () => {
    render(<Contact machines={machines} />)
    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/machine interest/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
  })

  it('shows contact name and phone, not email address', () => {
    render(<Contact machines={machines} />)
    expect(screen.getByText('Aadil Khatau')).toBeInTheDocument()
    expect(screen.getByText('02040291492')).toBeInTheDocument()
    expect(screen.queryByText('enjoyskullenergy@gmail.com')).not.toBeInTheDocument()
  })

  it('shows success message after successful submission', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true })
    const user = userEvent.setup()
    render(<Contact machines={machines} />)
    await submitForm(user)
    await waitFor(() => expect(screen.getByText(/message sent/i)).toBeInTheDocument())
  })

  it('shows error message when fetch fails', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false })
    const user = userEvent.setup()
    render(<Contact machines={machines} />)
    await submitForm(user)
    await waitFor(() => expect(screen.getByText(/something went wrong/i)).toBeInTheDocument())
  })

  it('shows error message when fetch throws', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('network error'))
    const user = userEvent.setup()
    render(<Contact machines={machines} />)
    await submitForm(user)
    await waitFor(() => expect(screen.getByText(/could not send message/i)).toBeInTheDocument())
  })

  it('shows button as loading while submitting', async () => {
    let resolve
    global.fetch = vi.fn().mockReturnValue(new Promise(r => { resolve = r }))
    const user = userEvent.setup()
    render(<Contact machines={machines} />)
    await submitForm(user)
    expect(screen.getByRole('button', { name: /sending/i })).toBeDisabled()
    resolve({ ok: true })
  })

  describe('rate limiting', () => {
    it('blocks submission after 4 attempts from the same email', async () => {
      global.fetch = vi.fn().mockResolvedValue({ ok: true })
      const email = 'repeat@example.com'
      const counts = { [email]: 4 }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(counts))

      const user = userEvent.setup()
      render(<Contact machines={machines} />)
      await submitForm(user, fillForm({ email }))

      await waitFor(() =>
        expect(screen.getByText(/already submitted 4 enquiries/i)).toBeInTheDocument()
      )
      expect(global.fetch).not.toHaveBeenCalled()
    })

    it('allows exactly 4 submissions then blocks the 5th', async () => {
      global.fetch = vi.fn().mockResolvedValue({ ok: true })
      const email = 'counter@example.com'

      for (let i = 0; i < 4; i++) {
        const user = userEvent.setup()
        const { unmount } = render(<Contact machines={machines} />)
        await submitForm(user, fillForm({ email }))
        await waitFor(() => screen.getByText(/message sent/i))
        unmount()
      }

      expect(global.fetch).toHaveBeenCalledTimes(4)

      const user = userEvent.setup()
      render(<Contact machines={machines} />)
      await submitForm(user, fillForm({ email }))
      await waitFor(() =>
        expect(screen.getByText(/already submitted 4 enquiries/i)).toBeInTheDocument()
      )
      expect(global.fetch).toHaveBeenCalledTimes(4)
    })

    it('treats email addresses case-insensitively', async () => {
      global.fetch = vi.fn().mockResolvedValue({ ok: true })
      const counts = { 'case@example.com': 4 }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(counts))

      const user = userEvent.setup()
      render(<Contact machines={machines} />)
      await submitForm(user, fillForm({ email: 'CASE@EXAMPLE.COM' }))

      await waitFor(() =>
        expect(screen.getByText(/already submitted 4 enquiries/i)).toBeInTheDocument()
      )
    })

    it('counts different emails independently', async () => {
      global.fetch = vi.fn().mockResolvedValue({ ok: true })
      const counts = { 'blocked@example.com': 4 }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(counts))

      const user = userEvent.setup()
      render(<Contact machines={machines} />)
      await submitForm(user, fillForm({ email: 'new@example.com' }))

      await waitFor(() => expect(screen.getByText(/message sent/i)).toBeInTheDocument())
      expect(global.fetch).toHaveBeenCalledTimes(1)
    })
  })

  it('populates machine dropdown from machines prop', () => {
    render(<Contact machines={machines} />)
    machines.forEach(m => {
      expect(screen.getByRole('option', { name: m.label })).toBeInTheDocument()
    })
  })
})
