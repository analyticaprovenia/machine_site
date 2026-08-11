import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../App'
import { machines } from '../data/machines'

describe('App', () => {
  it('renders every machine section', () => {
    const { container } = render(<App />)
    expect(machines).toHaveLength(6)
    machines.forEach(m => {
      expect(container.querySelector(`#${m.id}`)).toBeTruthy()
      expect(screen.getAllByText(m.headline).length).toBeGreaterThan(0)
    })
  })

  it('leads with the phone case machine', () => {
    render(<App />)
    const headings = screen.getAllByRole('heading', { level: 2 }).map(h => h.textContent)
    expect(headings[0]).toBe('Custom Phone Case Printing Kiosk')
  })

  it('has no gym-partnership sections left', () => {
    const { container } = render(<App />)
    expect(container.querySelector('#for-your-gym')).toBeNull()
    expect(container.querySelector('#how-it-works')).toBeNull()
    expect(container.querySelector('#why-us')).toBeTruthy()
  })
})
