import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Hero from '../components/Hero'

describe('Hero', () => {
  it('renders the main headline', () => {
    render(<Hero />)
    expect(screen.getByText(/fresh protein/i)).toBeInTheDocument()
    expect(screen.getByText(/extra revenue/i)).toBeInTheDocument()
    expect(screen.getByText(/zero investment/i)).toBeInTheDocument()
  })

  it('renders Partner With Us and See How It Works links', () => {
    render(<Hero />)
    expect(screen.getByRole('link', { name: /partner with us/i })).toHaveAttribute('href', '#contact')
    expect(screen.getByRole('link', { name: /see how it works/i })).toHaveAttribute('href', '#how-it-works')
  })

  it('renders the stats', () => {
    render(<Hero />)
    expect(screen.getByText('$0')).toBeInTheDocument()
    expect(screen.getByText('24/7')).toBeInTheDocument()
    expect(screen.getByText('Rev Share')).toBeInTheDocument()
  })

  it('hides the fallback when the image loads', () => {
    render(<Hero />)
    const img = screen.getByAltText(/protein shake vending machine/i)
    const fallback = img.previousSibling
    expect(fallback).toBeInTheDocument()
    fireEvent.load(img)
    expect(fallback.style.display).toBe('none')
  })

  it('hides the image and shows fallback on image error', () => {
    render(<Hero />)
    const img = screen.getByAltText(/protein shake vending machine/i)
    const fallback = img.previousSibling
    fireEvent.error(img)
    expect(img.style.display).toBe('none')
    expect(fallback.style.display).toBe('flex')
  })
})
