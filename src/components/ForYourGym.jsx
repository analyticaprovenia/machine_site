import styles from './WhyUs.module.css'

const pillars = [
  { icon: '💰', title: 'Revenue Without Lifting a Finger', body: 'Earn a share of every shake sold in your venue. No work required — we handle everything.' },
  { icon: '🏋️', title: 'Elevate Member Experience', body: 'Give members fresh, customisable protein drinks the moment they finish training — no gym café needed.' },
  { icon: '📺', title: 'Built-In Advertising Revenue', body: 'The machine screen runs rotating ads. Sell slots to your own sponsors or let us manage it — another income stream.' },
  { icon: '🔧', title: 'We Handle It All', body: 'Installation, restocking, cleaning, and maintenance are all on us. You just host the machine.' },
  { icon: '📊', title: 'Full Transparency', body: 'Real-time sales dashboard. Monthly revenue reports. You always know what your machine is earning.' },
  { icon: '✅', title: 'Zero Risk', body: 'No upfront cost, no lock-in contract, no liability. If it\'s not working for you, we remove it.' },
]

export default function ForYourGym() {
  return (
    <section className={styles.section} id="for-your-gym">
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2>Why Gyms Partner With Us</h2>
          <p>More for your members. More for your bottom line. Nothing on your plate.</p>
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
