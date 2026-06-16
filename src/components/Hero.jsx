import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.badge}>No Upfront Cost · Revenue Share · We Handle Everything</div>
        <h1>
          Fresh Protein.<br />
          <span>Extra Revenue.</span><br />
          Zero Effort.
        </h1>
        <p>
          We place and operate a smart protein shake vending machine in your gym.
          Your members get convenient nutrition — you earn a share of every sale.
        </p>
        <div className={styles.actions}>
          <a href="#contact" className={styles.primary}>Partner With Us</a>
          <a href="#how-it-works" className={styles.secondary}>See How It Works</a>
        </div>
        <div className={styles.stats}>
          <div className={styles.stat}><strong>$0</strong><span>Upfront Cost</span></div>
          <div className={styles.stat}><strong>24/7</strong><span>Automated Operation</span></div>
          <div className={styles.stat}><strong>Rev Share</strong><span>From Day One</span></div>
        </div>
      </div>
      <div className={styles.visual}>
        <div className={styles.glow} />
        <div className={styles.imgWrap}>
          <div className={styles.imgFallback}>
            <span>🥤</span>
            <p>Add your hero image to<br /><code>public/assets/images/protein-hero.png</code></p>
          </div>
          <img src="/assets/images/protein-hero.png" alt="Protein Shake Vending Machine" />
        </div>
      </div>
    </section>
  )
}
