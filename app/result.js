import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import { useLocalSearchParams, Link } from 'expo-router';
import { doshaInfo } from '../data/content/quiz';
import { useTheme } from '../context/ThemeContext';
import { saveDoshaResult } from '../data/user/storage';

export default function Result() {
  const { theme: { colors, spacing, radius, type } } = useTheme();
  const styles = makeStyles(colors, spacing, radius);
  const params = useLocalSearchParams();
  const scores = {
    vata: Number(params.vata || 0),
    pitta: Number(params.pitta || 0),
    kapha: Number(params.kapha || 0),
  };
  const total = scores.vata + scores.pitta + scores.kapha || 1;
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const primary = sorted[0][0];
  const info = doshaInfo[primary];

  useEffect(() => {
    saveDoshaResult(primary, scores).catch(err =>
      console.error('Failed to save dosha result:', err)
    );
  }, []);

  return (
    <SafeAreaView edges={['bottom']} style={{ flex: 1, backgroundColor: colors.bg }}>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={type.label}>Your Primary Dosha</Text>
      <Text style={[type.display, { color: info.color, marginTop: spacing.sm }]}>{info.name}</Text>
      <Text style={[type.muted, { marginTop: spacing.xs }]}>{info.elements} · {info.qualities}</Text>

      <View style={styles.card}>
        <Text style={type.body}>{info.summary}</Text>
      </View>

      <Text style={[type.label, { marginTop: spacing.xl }]}>Your Breakdown</Text>
      {sorted.map(([dosha, score]) => {
        const pct = Math.round((score / total) * 100);
        return (
          <View key={dosha} style={{ marginTop: spacing.md }}>
            <View style={styles.barRow}>
              <Text style={[type.body, { textTransform: 'capitalize' }]}>{dosha}</Text>
              <Text style={type.muted}>{pct}%</Text>
            </View>
            <View style={styles.barTrack}>
              <View style={[styles.barFill, { width: `${pct}%`, backgroundColor: doshaInfo[dosha].color }]} />
            </View>
          </View>
        );
      })}

      <Link href={{ pathname: '/recommendations', params: { dosha: primary } }} asChild>
        <Pressable style={styles.primaryBtn}>
          <Text style={styles.primaryBtnText}>See Today's Guidance</Text>
        </Pressable>
      </Link>
    </ScrollView>
    </SafeAreaView>
  );
}

function makeStyles(colors, spacing, radius) {
return StyleSheet.create({
  container: { padding: spacing.lg },
  card: {
    marginTop: spacing.lg,
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
  },
  barRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.xs },
  barTrack: { height: 8, backgroundColor: colors.surfaceAlt, borderRadius: radius.pill, overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: radius.pill },
  primaryBtn: {
    marginTop: spacing.xl,
    backgroundColor: colors.saffron,
    paddingVertical: spacing.md,
    borderRadius: radius.pill,
    alignItems: 'center',
  },
  primaryBtnText: { color: colors.bg, fontWeight: '700', fontSize: 16 },
});
}
