import { useState } from 'react'
import styles from './Hero.module.css'

export default function Hero() {
  const [imgState, setImgState] = useState('loading')

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
          <div className={styles.stat}><strong>6</strong><span>Machine Types</span></div>
          <div className={styles.stat}><strong>24/7</strong><span>Remote Monitoring</span></div>
          <div className={styles.stat}><strong>12mo</strong><span>Warranty</span></div>
        </div>
      </div>
      <div className={styles.visual}>
        <div className={styles.glow} />
        <div className={styles.imgWrap}>
          <div
            className={styles.imgFallback}
            style={imgState === 'error' ? { display: 'flex' } : undefined}
          >
            <span>🤖</span>
            <p>Add your hero image to<br /><code>public/assets/images/</code></p>
          </div>
          <img
            src="/assets/images/H25eeaf30b7044c5a8cab6867939c2979B.png_300x300.webp"
            alt="Smart Vending Machine"
            onLoad={() => setImgState('loaded')}
            onError={() => setImgState('error')}
            style={{
              opacity: imgState === 'loaded' ? 1 : 0,
              display: imgState === 'error' ? 'none' : undefined,
            }}
          />
        </div>
      </div>
    </section>
  )
}
