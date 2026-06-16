export const machines = [
  {
    id: 'protein',
    label: 'Protein Shakes',
    badgeColor: '#00b894',
    headline: 'Smart Protein Shake Vending Machine',
    tagline: 'Fresh, blended protein — on demand, 24/7.',
    description:
      'Give your members convenient access to fresh protein shakes the moment they finish training. Our machine blends from real ingredients on demand — no pre-bottled shakes, no fridge management, no staff involvement. The built-in digital screen also runs rotating ads, giving you an additional revenue stream from your existing foot traffic.',
    specs: [
      { label: 'Space Required', value: '900 × 850mm footprint' },
      { label: 'Blend Time', value: '45–90 seconds — fast post-workout' },
      { label: 'Flavours', value: 'Up to 8 options' },
      { label: 'Payment', value: 'Card, NFC, QR, Cash — no lost sales' },
      { label: 'Monitoring', value: 'Real-time remote stock & sales dashboard' },
    ],
    images: [
      { src: '/assets/images/protein-shake-vending-equipment.webp', caption: 'Gym Setting' },
      { src: '/assets/images/GS801-1.webp', caption: 'Machine' },
      { src: '/assets/images/protein-shake-vending-machine.webp', caption: 'In Venue' },
    ],
    videos: [
      { src: '/assets/videos/protein-1.mp4', label: 'Advertising', poster: '/assets/images/protein-thumb-1.png' },
      { src: '/assets/videos/protein-2.mp4', label: 'Purchasing', poster: '/assets/images/protein-thumb-2.png' },
      { src: '/assets/videos/protein-3.mp4', label: 'Machine Working', poster: '/assets/images/protein-thumb-3.png' },
    ],
    video: '/assets/videos/protein-1.mp4',
    videoPoster: '/assets/images/protein-hero.png',
    videoPortrait: true,
  },
]
