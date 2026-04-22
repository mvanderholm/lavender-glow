// CONTENT NOTE: Bio copy and credentials below are structural placeholders.
// All text marked [DRAFT] needs Thea's review and approval before shipping.
// Photo placeholder is intentionally blank — swap in assets/thea.jpg when ready.

import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import { themes } from '../theme';
import InstagramFeed from '../components/InstagramFeed';

const SWATCHES = [
  { name: 'cream',    dot: '#8B7287' },
  { name: 'lavender', dot: '#F5EDD0' },
  { name: 'midnight', dot: '#E8A030' },
];

export default function About() {
  const { theme, themeName, setThemeName, brandStyle, setBrandStyle } = useTheme();
  const { colors: c, spacing, radius, type } = theme;
  const styles = makeStyles(c, spacing, radius);

  return (
    <SafeAreaView edges={['bottom']} style={{ flex: 1, backgroundColor: c.bg }}>
      <ScrollView contentContainerStyle={styles.container}>

        {/* Photo */}
        <View style={styles.photoPlaceholder}>
          <Text style={styles.photoLabel}>Photo</Text>
        </View>

        {/* Name + credentials */}
        <Text style={[type.h1, { marginTop: spacing.lg, textAlign: 'center' }]}>
          Thea
        </Text>
        <Text style={[type.label, { textAlign: 'center', marginTop: spacing.xs }]}>
          Certified Wellness Coach · Ayurvedic Medicine · RYT
        </Text>

        {/* Bio */}
        {/* [DRAFT — awaiting Thea's copy] */}
        <View style={styles.bioBlock}>
          <Text style={[type.body, styles.bioPara]}>
            [DRAFT] Thea has been practicing and teaching ayurveda for over a decade. Her work draws on the classical tradition — doshas, seasonal rhythms, the relationship between digestion and mind — applied to how people actually live.
          </Text>
          <Text style={[type.body, styles.bioPara]}>
            [DRAFT] She is a Certified Wellness Coach with a specialization in Ayurvedic Medicine from the Shakti School (2025), and a Registered Yoga Teacher (RYT) trained at Lotus House of Yoga (2019).
          </Text>
          <Text style={[type.body, styles.bioPara]}>
            [DRAFT] Lavender Glow is her practice in app form — a way to bring the core tools of ayurveda into daily life between (or in lieu of) sessions.
          </Text>
        </View>

        <View style={styles.divider} />

        {/* Book a session */}
        <Text style={[type.label, { textAlign: 'center' }]}>Work with Thea</Text>
        <Text style={[type.muted, { textAlign: 'center', marginTop: spacing.xs }]}>
          One-on-one sessions coming soon.
        </Text>
        <Pressable style={styles.bookBtn} disabled>
          <Text style={[styles.bookBtnText, { color: c.text }]}>Book a Session</Text>
        </Pressable>

        {/* Theme switcher — commented out, defaulting to lavender. Uncomment to re-enable.
        <View style={styles.divider} />
        <Text style={[type.label, { textAlign: 'center' }]}>App Theme</Text>
        <View style={styles.swatchRow}>
          {SWATCHES.map(s => {
            const selected = themeName === s.name;
            const bg = themes[s.name].colors.bg;
            return (
              <Pressable
                key={s.name}
                onPress={() => setThemeName(s.name)}
                style={[
                  styles.swatch,
                  { backgroundColor: bg, borderColor: selected ? s.dot : c.border, borderWidth: selected ? 2 : 1 },
                ]}
              >
                {selected && (
                  <View style={[styles.swatchDot, { backgroundColor: s.dot }]} />
                )}
              </Pressable>
            );
          })}
        </View>
        <View style={styles.swatchLabels}>
          {SWATCHES.map(s => (
            <Text key={s.name} style={[styles.swatchLabel, { color: c.textMuted }]}>
              {themes[s.name].label.toUpperCase()}
            </Text>
          ))}
        </View>
        */}

        {/* Brand style toggle — commented out, defaulting to wordmark. Uncomment to re-enable.
        <View style={styles.divider} />
        <Text style={[type.label, { textAlign: 'center' }]}>Branding</Text>
        <View style={styles.brandToggle}>
          {['wordmark', 'lettermark'].map(opt => {
            const active = brandStyle === opt;
            return (
              <Pressable
                key={opt}
                onPress={() => setBrandStyle(opt)}
                style={[styles.brandBtn, active && { backgroundColor: c.accent, borderColor: c.accent }]}
              >
                <Text style={[styles.brandBtnText, { color: active ? c.bg : c.textMuted }]}>
                  {opt === 'wordmark' ? 'Wordmark' : 'Lettermark'}
                </Text>
              </Pressable>
            );
          })}
        </View>
        <Text style={[type.muted, { fontSize: 12, textAlign: 'center', marginTop: spacing.sm }]}>
          Changes the logo on the home screen.
        </Text>
        */}

        <View style={styles.divider} />

        <InstagramFeed />

      </ScrollView>
    </SafeAreaView>
  );
}

function makeStyles(c, spacing, radius) {
  return StyleSheet.create({
    container: {
      padding: spacing.lg,
      paddingTop: spacing.xl,
      alignItems: 'center',
    },
    photoPlaceholder: {
      width: 140,
      height: 180,
      borderRadius: radius.lg,
      backgroundColor: c.surface,
      borderWidth: 1,
      borderColor: c.border,
      justifyContent: 'center',
      alignItems: 'center',
    },
    photoLabel: {
      color: c.border,
      fontSize: 12,
      letterSpacing: 1,
      textTransform: 'uppercase',
    },
    bioBlock: {
      marginTop: spacing.xl,
      alignSelf: 'stretch',
    },
    bioPara: {
      marginTop: spacing.md,
      lineHeight: 26,
      color: c.textMuted,
    },
    divider: {
      alignSelf: 'stretch',
      height: 1,
      backgroundColor: c.border,
      marginTop: spacing.xl,
      marginBottom: spacing.xl,
    },
    bookBtn: {
      marginTop: spacing.lg,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.xl,
      borderRadius: radius.pill,
      borderWidth: 1,
      borderColor: c.border,
      opacity: 0.4,
    },
    bookBtnText: {
      fontWeight: '600',
      fontSize: 16,
    },
    swatchRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 20,
      marginTop: spacing.lg,
    },
    swatch: {
      width: 52,
      height: 52,
      borderRadius: 26,
      justifyContent: 'center',
      alignItems: 'center',
    },
    swatchDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
    },
    swatchLabels: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 20,
      marginTop: spacing.sm,
    },
    swatchLabel: {
      width: 52,
      textAlign: 'center',
      fontSize: 9,
      letterSpacing: 0.8,
    },
    brandToggle: {
      flexDirection: 'row',
      marginTop: spacing.lg,
      borderRadius: radius.pill,
      borderWidth: 1,
      borderColor: c.border,
      overflow: 'hidden',
    },
    brandBtn: {
      flex: 1,
      paddingVertical: spacing.md,
      alignItems: 'center',
      borderWidth: 0,
    },
    brandBtnText: {
      fontSize: 13,
      fontWeight: '600',
      letterSpacing: 0.5,
    },
  });
}
