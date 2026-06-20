import styles from './HowItWorks.module.css'

const steps = [
  {
    number: '01',
    title: 'We Install',
    body: 'We deliver and install the machine at no cost to you. Setup and testing takes around 1 hour with zero disruption to your gym floor. We monitor stock levels remotely and resupply water and fresh powder as needed.',
  },
  {
    number: '02',
    title: 'Members & Customers Engage',
    body: 'Adds a premium option to your clientele — fresh protein on demand, 24/7. The machine\'s built-in digital screen also runs advertising for selected partners, elevating your venue and adding another revenue stream.',
  },
  {
    number: '03',
    title: 'You Earn',
    body: 'You receive a share of every shake sold in your venue, plus income from advertising slots on the built-in screen. Monthly reports, zero admin. We restock and maintain everything.',
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
