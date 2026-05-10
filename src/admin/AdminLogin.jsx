import { useState } from 'react'
import styles from './admin.module.css'

const ADMIN_USER = 'admin'
const ADMIN_PASS = 'vendtech2026'

export default function AdminLogin({ onLogin }) {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      sessionStorage.setItem('adminAuth', 'true')
      onLogin()
    } else {
      setError('Invalid credentials.')
    }
  }

  return (
    <div className={styles.loginWrap}>
      <div className={styles.loginBox}>
        <div className={styles.loginLogo}>
          <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
            <defs>
              <linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6c63ff"/>
                <stop offset="100%" stopColor="#a78bfa"/>
              </linearGradient>
            </defs>
            <rect width="48" height="48" rx="12" fill="url(#lg)"/>
            <polyline points="13,14 24,34 35,14" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>VendTech<b>NZ</b> Admin</span>
        </div>
        <h2>Sign in</h2>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <label>Username</label>
          <input
            type="text"
            value={user}
            onChange={e => { setUser(e.target.value); setError('') }}
            autoComplete="username"
            placeholder="admin"
            required
          />
          <label>Password</label>
          <input
            type="password"
            value={pass}
            onChange={e => { setPass(e.target.value); setError('') }}
            autoComplete="current-password"
            placeholder="••••••••••"
            required
          />
          {error && <p className={styles.loginError}>{error}</p>}
          <button type="submit" className={styles.loginBtn}>Sign in</button>
        </form>
        <a href="#" className={styles.backLink} onClick={e => { e.preventDefault(); window.location.hash = '' }}>
          ← Back to site
        </a>
      </div>
    </div>
  )
}
