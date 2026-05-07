import styles from './Footer.module.css'
import { machines } from '../data/machines'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <div className={styles.logo}>VendTech<span>Pro</span></div>
            <p>Premium vending machines, direct from manufacturer to you.</p>
          </div>
          <nav className={styles.nav}>
            <div className={styles.col}>
              <strong>Machines</strong>
              {machines.map(m => (
                <a key={m.id} href={`#${m.id}`}>{m.label}</a>
              ))}
            </div>
            <div className={styles.col}>
              <strong>Company</strong>
              <a href="#why-us">Why Us</a>
              <a href="#contact">Contact</a>
            </div>
          </nav>
        </div>
        <div className={styles.bottom}>
          <p>© 2026 VendTech Pro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
