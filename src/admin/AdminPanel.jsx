import styles from './admin.module.css'

const THEMES = [
  { value: 'dark',   label: '🌑 Dark' },
  { value: 'candy',  label: '🍬 Candy' },
  { value: 'arcade', label: '🕹️ Arcade' },
  { value: 'kids',   label: '🎉 Kids' },
  { value: 'meta',   label: '💼 Meta' },
]

const BGS = [
  { value: 'default',  label: 'Default' },
  { value: 'midnight', label: 'Midnight' },
  { value: 'arcade',   label: 'Arcade Purple' },
  { value: 'navy',     label: 'Navy' },
  { value: 'plum',     label: 'Plum' },
  { value: 'forest',   label: 'Forest' },
  { value: 'graphite', label: 'Graphite' },
  { value: 'ember',    label: 'Ember' },
]

const BG_COLOURS = {
  default:  '#0a0a12',
  midnight: '#08080f',
  arcade:   '#0a0015',
  navy:     '#000e1a',
  plum:     '#0d0018',
  forest:   '#051209',
  graphite: '#111318',
  ember:    '#130800',
}

const THEME_ACCENTS = {
  dark:   '#6c63ff',
  candy:  '#ff2d78',
  arcade: '#ff1493',
  kids:   '#ffcc00',
  meta:   '#0078d4',
}

function logout() {
  sessionStorage.removeItem('adminAuth')
  window.location.hash = ''
}

export default function AdminPanel({ theme, setTheme, bg, setBg }) {
  return (
    <div className={styles.panelWrap}>
      <header className={styles.panelHeader}>
        <div className={styles.loginLogo}>
          <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
            <defs>
              <linearGradient id="plg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6c63ff"/>
                <stop offset="100%" stopColor="#a78bfa"/>
              </linearGradient>
            </defs>
            <rect width="48" height="48" rx="12" fill="url(#plg)"/>
            <polyline points="13,14 24,34 35,14" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>VendTech<b>NZ</b> Admin</span>
        </div>
        <div className={styles.headerActions}>
          <a href="#" className={styles.viewSite} onClick={e => { e.preventDefault(); window.location.hash = '' }}>
            View Site
          </a>
          <button className={styles.logoutBtn} onClick={logout}>Log out</button>
        </div>
      </header>

      <main className={styles.panelMain}>
        <h1>Site Appearance</h1>
        <p className={styles.panelSub}>Changes apply instantly and are saved for all visitors.</p>

        <div className={styles.panelGrid}>

          <section className={styles.card}>
            <h2>Theme</h2>
            <p>Controls the colour scheme and glow effects across the site.</p>
            <div className={styles.optionList}>
              {THEMES.map(t => (
                <button
                  key={t.value}
                  className={`${styles.optionBtn} ${theme === t.value ? styles.active : ''}`}
                  style={theme === t.value ? { borderColor: THEME_ACCENTS[t.value], boxShadow: `0 0 16px ${THEME_ACCENTS[t.value]}55` } : {}}
                  onClick={() => setTheme(t.value)}
                >
                  <span className={styles.dot} style={{ background: THEME_ACCENTS[t.value] }} />
                  {t.label}
                  {theme === t.value && <span className={styles.activeBadge}>Active</span>}
                </button>
              ))}
            </div>
          </section>

          <section className={styles.card}>
            <h2>Background</h2>
            <p>Sets the base background colour behind all content.</p>
            <div className={styles.optionList}>
              {BGS.map(b => (
                <button
                  key={b.value}
                  className={`${styles.optionBtn} ${bg === b.value ? styles.active : ''}`}
                  style={bg === b.value ? { borderColor: '#6c63ff', boxShadow: '0 0 16px rgba(108,99,255,0.4)' } : {}}
                  onClick={() => setBg(b.value)}
                >
                  <span className={styles.swatch} style={{ background: BG_COLOURS[b.value] }} />
                  {b.label}
                  {bg === b.value && <span className={styles.activeBadge}>Active</span>}
                </button>
              ))}
            </div>
          </section>

        </div>

        <div className={styles.preview}>
          <h2>Current Selection</h2>
          <div className={styles.previewRow}>
            <div className={styles.previewChip} style={{ background: THEME_ACCENTS[theme] + '22', border: `1px solid ${THEME_ACCENTS[theme]}66`, color: THEME_ACCENTS[theme] }}>
              Theme: {THEMES.find(t => t.value === theme)?.label}
            </div>
            <div className={styles.previewChip} style={{ background: BG_COLOURS[bg] + '55', border: '1px solid rgba(255,255,255,0.15)', color: '#fff' }}>
              <span className={styles.swatch} style={{ background: BG_COLOURS[bg], border: '1px solid rgba(255,255,255,0.2)' }} />
              BG: {BGS.find(b => b.value === bg)?.label}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
