export const machines = [
  {
    id: 'protein',
    label: 'Protein Shakes',
    badgeColor: '#00b894',
    headline: 'Smart Protein Shake Vending Machine',
    tagline: 'Fresh, blended protein — on demand, 24/7.',
    description:
      'Give your members convenient access to fresh protein shakes the moment they finish training. Our machine blends from real ingredients on demand — no pre-bottled shakes, no fridge management, no staff involvement. We stock only high quality protein from trusted suppliers, with the flexibility to substitute for a partner\'s branded product if an advertising or co-branding opportunity arises. The built-in digital screen also runs rotating ads, giving you an additional revenue stream from your existing foot traffic.',
    specs: [
      { label: 'Sizes Available', value: 'Compact (700 × 700mm) · Full-size (900 × 850mm)' },
      { label: 'Space Required', value: 'As little as 0.5m² — fits most gym floors' },
      { label: 'Blend Time', value: '45–90 seconds — fast post-workout' },
      { label: 'Products', value: '4–6 options including pre-workout' },
      { label: 'Payment', value: 'Card, NFC & QR — fast, frictionless checkout' },
      { label: 'Suppliers', value: 'Premium protein — open to brand partnerships' },
      { label: 'Monitoring', value: 'Real-time remote stock & sales dashboard' },
    ],
    images: [
      { src: '/assets/images/protein-shake-vending-equipment.webp', caption: 'Gym Setting' },
      { src: '/assets/images/GS801-1.webp', caption: 'Machine' },
      { src: '/assets/images/protein-shake-vending-machine.webp', caption: 'In Venue' },
    ],
    videos: [
      { src: 'https://videos.vendtechnz.co.nz/protein-advertising.mp4', label: 'Advertising', poster: '/assets/images/protein-thumb-1.png' },
      { src: 'https://videos.vendtechnz.co.nz/protein-purchasing.mp4', label: 'Purchasing', poster: '/assets/images/protein-thumb-2.png' },
      { src: 'https://videos.vendtechnz.co.nz/protein-internal.mp4', label: 'Internal', poster: '/assets/images/protein-thumb-3.png' },
    ],
    video: 'https://videos.vendtechnz.co.nz/protein-advertising.mp4',
    videoPoster: '/assets/images/protein-hero.png',
    videoPortrait: true,
  },
]
