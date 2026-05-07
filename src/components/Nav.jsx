import { useState, useEffect } from 'react'
import styles from './Nav.module.css'

export default function Nav({ machines, theme, setTheme, bg, setBg }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <a href="#" className={styles.logo}>
          VendTech<span>Pro</span>
        </a>

        <div className={styles.controls}>
          <select
            id="theme-select"
            className={styles.themeSelect}
            value={theme}
            onChange={e => setTheme(e.target.value)}
            aria-label="Choose theme"
          >
            <option value="dark">🌑 Dark</option>
            <option value="candy">🍬 Candy</option>
            <option value="kids">🎉 Kids</option>
            <option value="meta">💼 Meta</option>
          </select>

          {theme !== 'meta' && (
            <select
              id="bg-select"
              className={styles.themeSelect}
              value={bg}
              onChange={e => setBg(e.target.value)}
              aria-label="Choose background"
            >
              <option value="default">🎨 Default BG</option>
              <option value="midnight">⬛ Midnight</option>
              <option value="navy">🌊 Navy</option>
              <option value="plum">🟣 Plum</option>
              <option value="forest">🌲 Forest</option>
              <option value="graphite">🪨 Graphite</option>
              <option value="ember">🔥 Ember</option>
            </select>
          )}
        </div>

        <button className={styles.burger} onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
          <span /><span /><span />
        </button>

        <nav className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
          <a href="#machines" onClick={() => setMenuOpen(false)}>Machines</a>
          {machines.map(m => (
            <a key={m.id} href={`#${m.id}`} onClick={() => setMenuOpen(false)} className={styles.sub}>
              {m.label}
            </a>
          ))}
          <a href="#why-us" onClick={() => setMenuOpen(false)}>Why Us</a>
          <a href="#contact" onClick={() => setMenuOpen(false)} className={styles.cta}>Get a Quote</a>
        </nav>
      </div>
    </header>
  )
}
