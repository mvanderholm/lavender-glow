function makeType(text, accent, muted) {
  return {
    display: { color: text, fontSize: 40, fontWeight: '700', lineHeight: 46 },
    h1:      { color: text, fontSize: 28, fontWeight: '700', lineHeight: 34 },
    h2:      { color: text, fontSize: 20, fontWeight: '600', lineHeight: 26 },
    body:    { color: text, fontSize: 16, lineHeight: 24 },
    label:   { color: accent, fontSize: 12, fontWeight: '700', letterSpacing: 1.2, textTransform: 'uppercase' },
    muted:   { color: muted, fontSize: 15, lineHeight: 22 },
  };
}

const shared = {
  spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 40 },
  radius:  { sm: 6, md: 12, lg: 16, pill: 999 },
};

export const themes = {
  cream: {
    name: 'cream',
    label: 'Cream',
    statusBar: 'dark',
    colors: {
      bg:         '#F5EDD0',
      surface:    '#EDE4C4',
      surfaceAlt: '#E3DAB8',
      border:     '#C8BAA0',
      text:       '#4A3558',
      textMuted:  '#8B7287',
      accent:     '#8B7287',
      accentAlt:  '#C8A060',
      saffron:    '#C8A060',
      terracotta: '#B86040',
      sage:       '#7A8C6A',
      vata:       '#8B7BA8',
      kapha:      '#4A8FA8',
    },
    type: makeType('#4A3558', '#8B7287', '#8B7287'),
    ...shared,
  },

  lavender: {
    name: 'lavender',
    label: 'Lavender',
    statusBar: 'dark',
    colors: {
      bg:         '#C2AACB',
      surface:    '#B59EC0',
      surfaceAlt: '#A892B5',
      border:     '#2A3A6A',
      text:       '#1B2A4A',
      textMuted:  '#3D4E72',
      accent:     '#1B2A4A',
      accentAlt:  '#D4B88A',
      saffron:    '#1B2A4A',
      terracotta: '#A03020',
      sage:       '#3A6A3A',
      vata:       '#2A3A7A',
      kapha:      '#1A4A6A',
    },
    type: makeType('#1B2A4A', '#1B2A4A', '#3D4E72'),
    ...shared,
  },

  midnight: {
    name: 'midnight',
    label: 'Midnight',
    statusBar: 'light',
    colors: {
      bg:         '#0E0B08',
      surface:    '#1A1410',
      surfaceAlt: '#231C16',
      border:     '#3A2E24',
      text:       '#F5ECD7',
      textMuted:  '#8A7560',
      accent:     '#E8A030',
      accentAlt:  '#C4603A',
      saffron:    '#E8A030',
      terracotta: '#C4603A',
      sage:       '#7A9E7E',
      vata:       '#8B7BA8',
      kapha:      '#4A8FA8',
    },
    type: makeType('#F5ECD7', '#E8A030', '#8A7560'),
    ...shared,
  },
};
