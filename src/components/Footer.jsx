import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <div className={styles.logo}>VendTech<span>NZ</span></div>
            <p>Fresh protein for your members. Revenue for your gym.</p>
          </div>
          <nav className={styles.nav}>
            <div className={styles.col}>
              <strong>Partnership</strong>
              <a href="#how-it-works">How It Works</a>
              <a href="#protein">The Machine</a>
              <a href="#for-your-gym">For Your Gym</a>
              <a href="#contact">Partner With Us</a>
            </div>
          </nav>
        </div>
        <div className={styles.bottom}>
          <p>© 2026 ProShake NZ. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
