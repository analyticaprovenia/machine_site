import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Hero from '../components/Hero'

describe('Hero', () => {
  it('renders the main headline', () => {
    render(<Hero />)
    expect(screen.getByText(/the future of/i)).toBeInTheDocument()
    expect(screen.getByText(/automated retail/i)).toBeInTheDocument()
  })

  it('renders Explore Machines and Get a Quote links', () => {
    render(<Hero />)
    expect(screen.getByRole('link', { name: /explore machines/i })).toHaveAttribute('href', '#machines')
    expect(screen.getByRole('link', { name: /get a quote/i })).toHaveAttribute('href', '#contact')
  })

  it('renders the stats', () => {
    render(<Hero />)
    expect(screen.getByText('6')).toBeInTheDocument()
    expect(screen.getByText('24/7')).toBeInTheDocument()
    expect(screen.getByText('12mo')).toBeInTheDocument()
  })

  it('reveals the image once it loads', () => {
    render(<Hero />)
    const img = screen.getByAltText(/smart vending machine/i)
    expect(img.style.opacity).toBe('0')
    fireEvent.load(img)
    expect(img.style.opacity).toBe('1')
  })

  it('hides the image and shows fallback on image error', () => {
    render(<Hero />)
    const img = screen.getByAltText(/smart vending machine/i)
    const fallback = img.previousSibling
    fireEvent.error(img)
    expect(img.style.display).toBe('none')
    expect(fallback.style.display).toBe('flex')
  })
})
