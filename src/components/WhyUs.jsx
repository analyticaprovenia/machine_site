import styles from './WhyUs.module.css'

const pillars = [
  { icon: '🏭', title: 'Direct from Factory', body: 'We source directly from verified Chinese manufacturers — no middlemen, better margins for you.' },
  { icon: '🚢', title: 'Full Import Service', body: 'We manage shipping, customs, and delivery to your door. Completely hassle-free.' },
  { icon: '🔧', title: 'Installation & Training', body: 'Our team installs every machine and trains your staff on operation and maintenance.' },
  { icon: '📡', title: 'Remote Monitoring', body: 'Monitor stock levels, sales, and machine health 24/7 from your phone or computer.' },
  { icon: '💳', title: 'Modern Payments', body: 'Every machine accepts tap, card, QR code, and cash — no sales lost to payment friction.' },
  { icon: '🛡️', title: 'Warranty & Support', body: '12-month warranty on all machines with ongoing local support and spare parts.' },
]

export default function WhyUs() {
  return (
    <section className={styles.section} id="why-us">
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2>Why Choose VendTechNZ?</h2>
          <p>We handle everything from factory to footpath.</p>
        </div>
        <div className={styles.grid}>
          {pillars.map(p => (
            <div key={p.title} className={styles.card}>
              <div className={styles.icon}>{p.icon}</div>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
