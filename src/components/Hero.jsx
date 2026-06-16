import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.badge}>Direct Import · Premium Quality</div>
        <h1>
          The Future of<br />
          <span>Automated Retail</span>
        </h1>
        <p>
          Premium smart vending machines for every market.
          Sourced direct from manufacturer, delivered to your door.
        </p>
        <div className={styles.actions}>
          <a href="#machines" className={styles.primary}>Explore Machines</a>
          <a href="#contact" className={styles.secondary}>Get a Quote</a>
        </div>
        <div className={styles.stats}>
          <div className={styles.stat}><strong>5+</strong><span>Machine Types</span></div>
          <div className={styles.stat}><strong>24/7</strong><span>Remote Monitoring</span></div>
          <div className={styles.stat}><strong>12mo</strong><span>Warranty</span></div>
        </div>
      </div>
      <div className={styles.visual}>
        <div className={styles.glow} />
        <div className={styles.imgWrap}>
          <div className={styles.imgFallback}>
            <span>🤖</span>
            <p>Add your hero image to<br /><code>public/assets/hero.jpg</code></p>
          </div>
          <img
            src="/assets/images/protein-hero.png"
            alt="Protein Shake Vending Machine"
            onLoad={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.previousSibling.style.display = 'none'; }}
            onError={e => { e.currentTarget.style.display = 'none'; e.currentTarget.previousSibling.style.display = 'flex'; }}
          />
        </div>
      </div>
    </section>
  )
}
