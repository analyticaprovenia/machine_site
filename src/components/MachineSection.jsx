import { useState } from 'react'
import styles from './MachineSection.module.css'

function ImageGallery({ images }) {
  const [active, setActive] = useState(0)

  return (
    <div className={styles.gallery}>
      <div className={styles.mainImg}>
        <img
          src={images[active].src}
          alt={images[active].caption}
          onError={e => e.currentTarget.parentElement.classList.add(styles.noImg)}
        />
        <div className={styles.imgFallback}>📷 Add image to <code>public{images[active].src}</code></div>
        <div className={styles.caption}>{images[active].caption}</div>
      </div>
      <div className={styles.thumbs}>
        {images.map((img, i) => (
          <button
            key={i}
            className={`${styles.thumb} ${i === active ? styles.activeThumb : ''}`}
            onClick={() => setActive(i)}
          >
            <img src={img.src} alt={img.caption} onError={e => e.currentTarget.style.opacity = '0'} />
            <span>{img.caption}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function VideoPlayer({ src, poster, videos, portrait }) {
  const list = videos || (src ? [{ src, label: 'Video' }] : [])
  const [active, setActive] = useState(0)
  const current = list[active]

  if (!current) return null

  return (
    <div className={`${styles.videoWrap} ${portrait ? styles.videoPortrait : ''}`}>
      <video controls poster={current.poster || poster} key={current.src}>
        <source src={current.src} type="video/mp4" />
      </video>
      {list.length > 1 && (
        <div className={styles.videoTabs}>
          {list.map((v, i) => (
            <button
              key={i}
              className={i === active ? styles.activeVideoTab : ''}
              onClick={() => setActive(i)}
            >
              {v.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function MachineSection({ machine, reverse }) {
  const hasVideo = machine.videos?.length > 0 || machine.video
  const [tab, setTab] = useState('photos')

  return (
    <div id={machine.id} className={`${styles.block} ${reverse ? styles.reverse : ''}`}>
      <div className={styles.media}>
        <div className={styles.tabs}>
          <button
            className={tab === 'photos' ? styles.activeTab : ''}
            onClick={() => setTab('photos')}
          >
            Photos
          </button>
          {hasVideo && (
            <button
              className={tab === 'video' ? styles.activeTab : ''}
              onClick={() => setTab('video')}
            >
              Video
            </button>
          )}
        </div>
        {tab === 'photos'
          ? <ImageGallery images={machine.images} />
          : <VideoPlayer src={machine.video} poster={machine.videoPoster} videos={machine.videos} portrait={machine.videoPortrait} />
        }
      </div>

      <div className={styles.info}>
        <div className={styles.badge} style={{ background: machine.badgeColor + '22', color: machine.badgeColor, border: `1px solid ${machine.badgeColor}55` }}>
          {machine.label}
        </div>
        {machine.videoComingSoon && (
          <div className={styles.videoComingSoon}>🎥 New demo video coming soon</div>
        )}
        <h2>{machine.headline}</h2>
        <p className={styles.tagline}>{machine.tagline}</p>
        <p className={styles.desc}>{machine.description}</p>
        <ul className={styles.specs}>
          {machine.specs.map(s => (
            <li key={s.label}>
              <span>{s.label}</span>
              {s.value}
            </li>
          ))}
        </ul>
        <a href="#contact" className={styles.enquire}>Enquire Now →</a>
      </div>
    </div>
  )
}
