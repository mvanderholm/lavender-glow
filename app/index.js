import { View, Text, StyleSheet, Pressable, ScrollView, Share, Platform, Linking, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { useWindowDimensions } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext';
import { currentSeason } from '../data/content/recommendations';
import { doshaInfo } from '../data/content/quiz';
import { loadDoshaResult, buildSessionSummary, loadTodayIntention, saveIntention } from '../data/user/storage';
import { intentionSuggestions } from '../data/content/intentions';
import { currentMythbuster } from '../data/content/mythbusters';
import LogoFull from '../components/LogoFull';
import LogoAlt from '../components/LogoAlt';

export default function Home() {
  const { theme: { colors, spacing, radius, type }, brandStyle } = useTheme();
  const { width: windowWidth } = useWindowDimensions();
  const contentWidth = Platform.OS === 'web' ? Math.min(windowWidth, 480) : windowWidth;
  const logoWidth = contentWidth - spacing.lg * 2;
  const season = currentSeason();
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

        <MythbusterCard />

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

      <IntentionCard dosha={dosha} />

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

function MythbusterCard() {
  const { theme: { colors, spacing, radius, type } } = useTheme();
  const styles = makeStyles(colors, spacing, radius);
  const myth = currentMythbuster();
  if (!myth) return null;

  return (
    <View style={styles.mythbusterCard}>
      <Text style={type.label}>This Week</Text>
      <Text style={[type.h2, { marginTop: spacing.xs }]}>Mythbusters</Text>
      <Text style={[type.body, { marginTop: spacing.sm, fontStyle: 'italic' }]}>
        "{myth.myth}"
      </Text>
      {myth.take && (
        <Text style={[type.body, { marginTop: spacing.md, lineHeight: 24 }]}>{myth.take}</Text>
      )}
      {myth.reframe && (
        <Text style={[type.muted, { marginTop: spacing.sm, lineHeight: 22 }]}>{myth.reframe}</Text>
      )}
    </View>
  );
}

function IntentionCard({ dosha }) {
  const { theme: { colors, spacing, radius, type } } = useTheme();
  const styles = makeStyles(colors, spacing, radius);
  const suggestions = intentionSuggestions(dosha);
  const [intention, setIntention] = useState(null);
  const [draft, setDraft] = useState('');

  useEffect(() => {
    loadTodayIntention().then(val => setIntention(val ?? ''));
  }, []);

  async function choose(text) {
    const trimmed = text.trim();
    if (!trimmed) return;
    await saveIntention(trimmed);
    setIntention(trimmed);
    setDraft('');
  }

  if (intention === null) return null;

  return (
    <View style={styles.intentionCard}>
      {intention ? (
        <>
          <Text style={type.label}>Just for today</Text>
          <Text style={[type.body, { marginTop: spacing.sm }]}>I will {intention}</Text>
          <Pressable onPress={() => setIntention('')} style={{ marginTop: spacing.sm, alignSelf: 'flex-start' }}>
            <Text style={{ color: colors.textMuted, fontSize: 12 }}>change</Text>
          </Pressable>
        </>
      ) : (
        <>
          <Text style={type.label}>Just for today, I will…</Text>
          <View style={styles.intentionChipRow}>
            {suggestions.map(s => (
              <Pressable
                key={s.id}
                style={({ pressed }) => [styles.intentionChip, pressed && { opacity: 0.6 }]}
                onPress={() => choose(s.text)}
              >
                <Text style={styles.intentionChipText}>{s.text}</Text>
              </Pressable>
            ))}
          </View>
          <TextInput
            style={styles.intentionInput}
            placeholder="write your own…"
            placeholderTextColor={colors.textMuted}
            value={draft}
            onChangeText={setDraft}
            onSubmitEditing={() => choose(draft)}
            returnKeyType="done"
          />
        </>
      )}
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
    borderLeftColor: colors.accentAlt,
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
  mythbusterCard: {
    marginTop: spacing.lg,
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderLeftWidth: 3,
    borderLeftColor: colors.saffron,
  },
  intentionCard: {
    marginTop: spacing.lg,
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderLeftWidth: 3,
    borderLeftColor: colors.accent,
  },
  intentionChipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  intentionChip: {
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.accent + '66',
  },
  intentionChipText: {
    color: colors.accent,
    fontSize: 14,
  },
  intentionInput: {
    marginTop: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.text,
    fontSize: 14,
  },
});
}
