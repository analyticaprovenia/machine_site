import { describe, it, expect } from 'vitest'
import { machines } from '../data/machines'

describe('machines data', () => {
  it('exports a non-empty array', () => {
    expect(Array.isArray(machines)).toBe(true)
    expect(machines.length).toBeGreaterThan(0)
  })

  it.each(machines)('$label has all required fields', (machine) => {
    expect(machine.id).toBeTruthy()
    expect(machine.label).toBeTruthy()
    expect(machine.headline).toBeTruthy()
    expect(machine.tagline).toBeTruthy()
    expect(machine.description).toBeTruthy()
    expect(machine.badgeColor).toMatch(/^#/)
  })

  it.each(machines)('$label has at least one image with src and caption', (machine) => {
    expect(machine.images.length).toBeGreaterThan(0)
    machine.images.forEach(img => {
      expect(img.src).toBeTruthy()
      expect(img.caption).toBeTruthy()
    })
  })

  it.each(machines)('$label has at least one spec', (machine) => {
    expect(machine.specs.length).toBeGreaterThan(0)
    machine.specs.forEach(spec => {
      expect(spec.label).toBeTruthy()
      expect(spec.value).toBeTruthy()
    })
  })

  it('has unique ids', () => {
    const ids = machines.map(m => m.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})
