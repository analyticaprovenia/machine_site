import { useState, useEffect } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import MachineSection from './components/MachineSection'
import WhyUs from './components/WhyUs'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { machines } from './data/machines'

const BG_TINTS = {
  default:  null,
  midnight: '#08080f',
  arcade:   '#0a0015',
  navy:     '#000e1a',
  plum:     '#0d0018',
  forest:   '#051209',
  graphite: '#111318',
  ember:    '#130800',
}

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'candy')
  const [bg, setBg]       = useState(() => localStorage.getItem('bg') || 'midnight')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const color = BG_TINTS[bg]
    if (color) {
      document.documentElement.style.setProperty('--bg', color)
    } else {
      document.documentElement.style.removeProperty('--bg')
    }
    localStorage.setItem('bg', bg)
  }, [bg])

  return (
    <>
      <Nav machines={machines} theme={theme} setTheme={setTheme} bg={bg} setBg={setBg} />
      <Hero />
      <section id="machines">
        {machines.map((machine, i) => (
          <MachineSection key={machine.id} machine={machine} reverse={i % 2 !== 0} />
        ))}
      </section>
      <WhyUs />
      <Contact machines={machines} />
      <Footer />
    </>
  )
}
