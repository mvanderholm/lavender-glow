import { View, Text, StyleSheet, Pressable, ScrollView, Dimensions, Share, Platform, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { Link, useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext';
import { currentSeason } from '../data/content/recommendations';
import { doshaInfo } from '../data/content/quiz';
import { loadDoshaResult, buildSessionSummary } from '../data/user/storage';
import LogoFull from '../components/LogoFull';
import LogoAlt from '../components/LogoAlt';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function Home() {
  const { theme: { colors, spacing, radius, type }, brandStyle } = useTheme();
  const season = currentSeason();
  const logoWidth = SCREEN_WIDTH - spacing.lg * 2;
  const router = useRouter();
  const styles = makeStyles(colors, spacing, radius);

  // null = loading, false = no result, string = saved dosha
  const [savedDosha, setSavedDosha] = useState(null);

  useEffect(() => {
    loadDoshaResult().then(result => {
      setSavedDosha(result ? result.dosha : false);
    });
  }, []);

  return (
    <SafeAreaView edges={['bottom']} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {brandStyle === 'lettermark' ? (
          <LogoAlt width={logoWidth} />
        ) : (
          <LogoFull width={logoWidth} />
        )}

        <View style={styles.aboutRow}>
          <Link href="/learn" asChild>
            <Pressable>
              <Text style={styles.aboutLink}>Learn</Text>
            </Pressable>
          </Link>
          <Text style={styles.aboutLinkDivider}>·</Text>
          <Link href="/about" asChild>
            <Pressable>
              <Text style={styles.aboutLink}>About Thea</Text>
            </Pressable>
          </Link>
        </View>

        <Text style={[type.h1, { marginTop: spacing.lg }]}>
          Live with{'\n'}your constitution.
        </Text>
        <Text style={[type.muted, { marginTop: spacing.md }]}>
          A daily ayurvedic companion. Discover your dosha, check in with body and mind, and receive food, herb, and meditation guidance tuned to who you are and the season around you.
        </Text>

        <View style={styles.seasonCard}>
          <Text style={type.label}>Current Season</Text>
          <Text style={[type.h2, { marginTop: spacing.xs }]}>{season.name}</Text>
          <Text style={[type.muted, { marginTop: spacing.xs }]}>{season.focus}</Text>
        </View>

        {savedDosha === null ? (
          // Loading — render nothing where the CTAs will be to avoid flicker
          <View style={{ height: 160 }} />
        ) : savedDosha ? (
          // Returning user
          <ReturningUser dosha={savedDosha} />
        ) : (
          // New user
          <NewUser />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const APP_STORE_URL = 'https://apps.apple.com/app/lavender-glow/id0000000000';
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.lavenderglow.app';

function DownloadCTAs() {
  const { theme: { colors, spacing, radius, type } } = useTheme();
  const styles = makeStyles(colors, spacing, radius);
  if (Platform.OS !== 'web') return null;
  return (
    <View style={styles.downloadBlock}>
      <Text style={[type.label, { textAlign: 'center', marginBottom: spacing.md }]}>
        Get the full experience
      </Text>
      <Pressable style={styles.downloadBtn} onPress={() => Linking.openURL(APP_STORE_URL)}>
        <Text style={styles.downloadBtnText}>Download on the App Store</Text>
      </Pressable>
      <Pressable style={[styles.downloadBtn, { marginTop: spacing.sm }]} onPress={() => Linking.openURL(PLAY_STORE_URL)}>
        <Text style={styles.downloadBtnText}>Get it on Google Play</Text>
      </Pressable>
    </View>
  );
}

function ReturningUser({ dosha }) {
  const { theme: { colors, spacing, radius, type } } = useTheme();
  const styles = makeStyles(colors, spacing, radius);
  const info = doshaInfo[dosha];

  async function shareWithThea() {
    const summary = await buildSessionSummary();
    await Share.share({ message: summary });
  }

  return (
    <View style={styles.returningBlock}>
      <Text style={type.label}>Welcome back</Text>
      <Text style={[type.h2, { color: info.color, marginTop: spacing.xs }]}>
        {info.name}
      </Text>

      <Link href={{ pathname: '/recommendations', params: { dosha } }} asChild>
        <Pressable style={styles.primaryBtn}>
          <Text style={styles.primaryBtnText}>Today's Guidance</Text>
        </Pressable>
      </Link>

      <Link href="/checkin" asChild>
        <Pressable style={styles.secondaryBtn}>
          <Text style={styles.secondaryBtnText}>Daily Check-in</Text>
        </Pressable>
      </Link>

      {Platform.OS !== 'web' && (
        <Pressable style={styles.secondaryBtn} onPress={shareWithThea}>
          <Text style={styles.secondaryBtnText}>Share summary with Thea</Text>
        </Pressable>
      )}

      <Link href="/quiz" asChild>
        <Pressable style={styles.ghostBtn}>
          <Text style={styles.ghostBtnText}>Retake the quiz</Text>
        </Pressable>
      </Link>

      <DownloadCTAs />
    </View>
  );
}

function NewUser() {
  const { theme: { colors, spacing, radius, type } } = useTheme();
  const styles = makeStyles(colors, spacing, radius);
  return (
    <View style={{ marginTop: spacing.xl }}>
      <Link href="/quiz" asChild>
        <Pressable style={styles.primaryBtn}>
          <Text style={styles.primaryBtnText}>Take the Dosha Quiz</Text>
        </Pressable>
      </Link>

      <Link href="/checkin" asChild>
        <Pressable style={styles.secondaryBtn}>
          <Text style={styles.secondaryBtnText}>Daily Check-in</Text>
        </Pressable>
      </Link>

      <Link href="/recommendations" asChild>
        <Pressable style={styles.secondaryBtn}>
          <Text style={styles.secondaryBtnText}>Today's Guidance</Text>
        </Pressable>
      </Link>

      <DownloadCTAs />
    </View>
  );
}

function makeStyles(colors, spacing, radius) {
return StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.bg },
  container: { padding: spacing.lg },
  seasonCard: {
    marginTop: spacing.xl,
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderLeftWidth: 3,
    borderLeftColor: colors.saffron,
  },
  returningBlock: {
    marginTop: spacing.xl,
  },
  primaryBtn: {
    marginTop: spacing.lg,
    backgroundColor: colors.saffron,
    paddingVertical: spacing.md,
    borderRadius: radius.pill,
    alignItems: 'center',
  },
  primaryBtnText: { color: colors.bg, fontWeight: '700', fontSize: 16 },
  secondaryBtn: {
    marginTop: spacing.md,
    backgroundColor: colors.surface,
    paddingVertical: spacing.md,
    borderRadius: radius.pill,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  secondaryBtnText: { color: colors.text, fontWeight: '600', fontSize: 16 },
  ghostBtn: {
    marginTop: spacing.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  ghostBtnText: { color: colors.textMuted, fontSize: 14 },
  aboutRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: spacing.sm,
    gap: spacing.sm,
  },
  aboutLink: {
    color: colors.textMuted,
    fontSize: 13,
  },
  aboutLinkDivider: {
    color: colors.border,
    fontSize: 13,
  },
  downloadBlock: {
    marginTop: spacing.xl,
    paddingTop: spacing.xl,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  downloadBtn: {
    backgroundColor: colors.surface,
    paddingVertical: spacing.md,
    borderRadius: radius.pill,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  downloadBtnText: { color: colors.text, fontWeight: '600', fontSize: 15 },
});
}
