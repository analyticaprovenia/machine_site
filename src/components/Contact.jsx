import { useState } from 'react'
import styles from './Contact.module.css'

const FORM_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID' // replace after creating free Formspree form
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

export default function Contact({ machines }) {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', machine: '', message: '' })

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
        body: JSON.stringify(form),
      })
      if (res.ok) {
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
          <h2>Get in Touch</h2>
          <p>Ready to add a machine to your location? We'll get back to you within 24 hours.</p>
        </div>

        <div className={styles.layout}>
          <div className={styles.contactInfo}>
            <h3>Contact Us Directly</h3>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Name</span>
              <span>Aadil Khatau</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Phone</span>
              <a href="tel:02040291492">02040291492</a>
            </div>
            <p className={styles.infoNote}>Or fill in the form and we'll reach out to you.</p>
          </div>

          <div className={styles.formWrap}>
            {sent ? (
              <div className={styles.success}>
                <span>✅</span>
                <h3>Message sent!</h3>
                <p>Thanks for reaching out. We'll be in touch within 24 hours.</p>
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
                    <input id="email" name="email" type="email" placeholder="jane@business.com" required value={form.email} onChange={handleChange} />
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.group}>
                    <label htmlFor="phone">Phone Number</label>
                    <input id="phone" name="phone" type="tel" placeholder="+44 7000 000000" value={form.phone} onChange={handleChange} />
                  </div>
                  <div className={styles.group}>
                    <label htmlFor="machine">Machine Interest</label>
                    <select id="machine" name="machine" value={form.machine} onChange={handleChange}>
                      <option value="">Select a machine type...</option>
                      {machines.map(m => (
                        <option key={m.id} value={m.id}>{m.label}</option>
                      ))}
                      <option value="multiple">Multiple / Not Sure</option>
                    </select>
                  </div>
                </div>
                <div className={styles.group}>
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Tell us about your location, venue type, or any questions you have..."
                    value={form.message}
                    onChange={handleChange}
                  />
                </div>
                {error && <p className={styles.error}>{error}</p>}
                <button type="submit" className={styles.submit} disabled={loading}>
                  {loading ? 'Sending…' : 'Send Enquiry'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
