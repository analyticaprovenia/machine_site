import styles from './HowItWorks.module.css'

const steps = [
  {
    number: '01',
    title: 'We Install',
    body: 'We deliver and install the machine at no cost to you. Setup takes a few hours with zero disruption to your gym floor.',
  },
  {
    number: '02',
    title: 'Members Buy',
    body: 'Your members order fresh protein shakes on demand — any time, 24/7. The machine handles mixing, dispensing, and payment automatically.',
  },
  {
    number: '03',
    title: 'You Earn',
    body: 'You receive a share of every sale made in your venue. Monthly reports, zero admin. We restock and maintain everything.',
  },
]

export default function HowItWorks() {
  return (
    <section className={styles.section} id="how-it-works">
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2>How the Partnership Works</h2>
          <p>Three steps. No catch. No cost.</p>
        </div>
        <div className={styles.steps}>
          {steps.map((s, i) => (
            <div key={i} className={styles.step}>
              <div className={styles.number}>{s.number}</div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
