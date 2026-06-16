import { useState } from 'react'
import styles from './Contact.module.css'

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || ''
const FORM_ENDPOINT = 'https://api.web3forms.com/submit'
const RATE_LIMIT = 4
const STORAGE_KEY = 'enquiry_counts'

function getCount(email) {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    return data[email.toLowerCase()] || 0
  } catch { return 0 }
}

function incrementCount(email) {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    data[email.toLowerCase()] = (data[email.toLowerCase()] || 0) + 1
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {}
}

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', gym: '', message: '' })

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    setError('')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (getCount(form.email) >= RATE_LIMIT) {
      setError(`This email has already submitted ${RATE_LIMIT} enquiries. Please call us directly.`)
      return
    }

    setLoading(true)
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: WEB3FORMS_KEY, ...form }),
      })
      const data = await res.json()
      if (data.success) {
        incrementCount(form.email)
        setSent(true)
      } else {
        setError('Something went wrong. Please try calling us directly.')
      }
    } catch {
      setError('Could not send message. Please try calling us directly.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className={styles.section} id="contact">
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2>Interested in Partnering?</h2>
          <p>Tell us about your gym and we'll be in touch within 24 hours with a tailored proposal.</p>
        </div>

        <div className={styles.layout}>
          <div className={styles.contactInfo}>
            <h3>Talk to Us Directly</h3>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Name</span>
              <span>Andrew Chester</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Phone</span>
              <a href="tel:0221237008">022 123 7008</a>
            </div>
            <p className={styles.infoNote}>Or fill in the form and we'll reach out to you.</p>
          </div>

          <div className={styles.formWrap}>
            {sent ? (
              <div className={styles.success}>
                <span>✅</span>
                <h3>Message sent!</h3>
                <p>Thanks for reaching out. We'll be in touch within 24 hours with a proposal for your gym.</p>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.row}>
                  <div className={styles.group}>
                    <label htmlFor="name">Your Name</label>
                    <input id="name" name="name" type="text" placeholder="Jane Smith" required value={form.name} onChange={handleChange} />
                  </div>
                  <div className={styles.group}>
                    <label htmlFor="email">Email Address</label>
                    <input id="email" name="email" type="email" placeholder="jane@yourgym.co.nz" required value={form.email} onChange={handleChange} />
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.group}>
                    <label htmlFor="phone">Phone Number</label>
                    <input id="phone" name="phone" type="tel" placeholder="021 000 0000" value={form.phone} onChange={handleChange} />
                  </div>
                  <div className={styles.group}>
                    <label htmlFor="gym">Gym / Club Name</label>
                    <input id="gym" name="gym" type="text" placeholder="e.g. Les Mills Auckland" value={form.gym} onChange={handleChange} />
                  </div>
                </div>
                <div className={styles.group}>
                  <label htmlFor="message">About Your Venue</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Tell us about your venue — location, approximate member count, and any questions you have about the partnership."
                    value={form.message}
                    onChange={handleChange}
                  />
                </div>
                {error && <p className={styles.error}>{error}</p>}
                <button type="submit" className={styles.submit} disabled={loading}>
                  {loading ? 'Sending…' : 'Send Partnership Enquiry'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
