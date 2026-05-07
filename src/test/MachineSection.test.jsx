import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import MachineSection from '../components/MachineSection'

const machine = {
  id: 'test-machine',
  label: 'Test Machine',
  badgeColor: '#6c63ff',
  headline: 'Test Headline',
  tagline: 'Test tagline.',
  description: 'Test description.',
  specs: [
    { label: 'Speed', value: 'Fast' },
    { label: 'Power', value: '220V' },
  ],
  images: [
    { src: '/img/first.jpg', caption: 'First' },
    { src: '/img/second.jpg', caption: 'Second' },
    { src: '/img/third.jpg', caption: 'Third' },
  ],
  video: '/video/test.mp4',
  videoPoster: '/video/poster.jpg',
}

describe('MachineSection', () => {
  it('renders headline, tagline and description', () => {
    render(<MachineSection machine={machine} />)
    expect(screen.getByText('Test Headline')).toBeInTheDocument()
    expect(screen.getByText('Test tagline.')).toBeInTheDocument()
    expect(screen.getByText('Test description.')).toBeInTheDocument()
  })

  it('renders all specs', () => {
    render(<MachineSection machine={machine} />)
    expect(screen.getByText('Speed')).toBeInTheDocument()
    expect(screen.getByText('Fast')).toBeInTheDocument()
    expect(screen.getByText('Power')).toBeInTheDocument()
    expect(screen.getByText('220V')).toBeInTheDocument()
  })

  it('shows first image and caption by default', () => {
    render(<MachineSection machine={machine} />)
    const mainImg = screen.getAllByAltText('First')[0]
    expect(mainImg).toBeInTheDocument()
    expect(mainImg).toHaveAttribute('src', '/img/first.jpg')
  })

  it('switches main image when a thumbnail is clicked', () => {
    render(<MachineSection machine={machine} />)
    fireEvent.click(screen.getByRole('button', { name: /second/i }))
    const mainImg = screen.getAllByAltText('Second')[0]
    expect(mainImg).toHaveAttribute('src', '/img/second.jpg')
  })

  it('renders all thumbnail buttons', () => {
    render(<MachineSection machine={machine} />)
    expect(screen.getByRole('button', { name: /first/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /second/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /third/i })).toBeInTheDocument()
  })

  it('switches to video tab when Video button is clicked', () => {
    render(<MachineSection machine={machine} />)
    fireEvent.click(screen.getByRole('button', { name: /video/i }))
    const videoEl = document.querySelector('video')
    expect(videoEl).toBeInTheDocument()
    expect(videoEl.querySelector('source')).toHaveAttribute('src', '/video/test.mp4')
  })

  it('switches back to photos tab', () => {
    render(<MachineSection machine={machine} />)
    fireEvent.click(screen.getByRole('button', { name: /video/i }))
    fireEvent.click(screen.getByRole('button', { name: /photos/i }))
    expect(screen.getAllByAltText('First')[0]).toBeInTheDocument()
  })

  it('applies reverse layout class when reverse prop is true', () => {
    const { container } = render(<MachineSection machine={machine} reverse />)
    expect(container.firstChild.className).toMatch(/reverse/)
  })

  it('renders enquire link pointing to #contact', () => {
    render(<MachineSection machine={machine} />)
    expect(screen.getByRole('link', { name: /enquire now/i })).toHaveAttribute('href', '#contact')
  })
})
