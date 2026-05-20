import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext';
import { doshaInfo } from '../data/content/quiz';
import { loadDoshaResult } from '../data/user/storage';
import { BotanicalDivider } from '../components/BotanicalAccent';
import { useWindowDimensions, Platform } from 'react-native';

export default function You() {
  const { theme: { colors: c, spacing, radius, type } } = useTheme();
  const { width: windowWidth } = useWindowDimensions();
  const innerWidth = (Platform.OS === 'web' ? Math.min(windowWidth, 480) : windowWidth) - spacing.lg * 2;
  const router = useRouter();
  const styles = makeStyles(c, spacing, radius);
  const [savedDosha, setSavedDosha] = useState(null);

  useEffect(() => {
    loadDoshaResult().then(result => {
      setSavedDosha(result ? result.dosha : false);
    });
  }, []);

  const info = savedDosha ? doshaInfo[savedDosha] : null;

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: c.bg }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={type.label}>Your Practice</Text>

        {savedDosha === null ? (
          <View style={{ height: 60 }} />
        ) : savedDosha ? (
          <>
            <Text style={[type.h1, { marginTop: spacing.sm }]}>Welcome back.</Text>
            <View style={[styles.doshaChip, { borderColor: info.color }]}>
              <Text style={[type.label, { color: info.color }]}>{info.name}</Text>
            </View>
            <Text style={[type.muted, { marginTop: spacing.sm }]}>
              {info.tagline}
            </Text>
          </>
        ) : (
          <>
            <Text style={[type.h1, { marginTop: spacing.sm }]}>Start here.</Text>
            <Text style={[type.muted, { marginTop: spacing.xs }]}>
              Take the dosha quiz to get recommendations tuned to you.
            </Text>
          </>
        )}

        <BotanicalDivider color={c.sage} borderColor={c.border} width={innerWidth} />

        <NavCard
          label="Know yourself"
          title="Dosha Quiz"
          description="Find your home-base constitution. Takes about five minutes."
          accent={c.accentAlt}
          onPress={() => router.push('/quiz')}
          styles={styles}
          type={type}
          spacing={spacing}
        />
        <NavCard
          label="Daily practice"
          title="Check-in"
          description="Five questions. Where you actually are today — not yesterday, not in general."
          accent={c.saffron}
          onPress={() => router.push('/checkin')}
          styles={styles}
          type={type}
          spacing={spacing}
        />
        <NavCard
          label="Today"
          title="Guidance"
          description="Food, herbs, and movement tuned to your dosha and the current season."
          accent={c.sage}
          onPress={() => router.push(savedDosha ? { pathname: '/recommendations', params: { dosha: savedDosha } } : '/recommendations')}
          styles={styles}
          type={type}
          spacing={spacing}
        />

        {savedDosha && (
          <Pressable style={styles.ghostBtn} onPress={() => router.push('/quiz')}>
            <Text style={[type.muted, { fontSize: 13 }]}>Retake the quiz</Text>
          </Pressable>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function NavCard({ label, title, description, accent, onPress, styles, type, spacing }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, { borderLeftColor: accent }, pressed && { opacity: 0.75 }]}
      onPress={onPress}
    >
      <Text style={[type.label, { color: accent }]}>{label}</Text>
      <Text style={[type.h2, { marginTop: spacing.xs }]}>{title}</Text>
      <Text style={[type.muted, { marginTop: spacing.sm, lineHeight: 22 }]}>{description}</Text>
      <Text style={[{ marginTop: spacing.md, fontSize: 18, color: accent }]}>→</Text>
    </Pressable>
  );
}

function makeStyles(c, spacing, radius) {
  return StyleSheet.create({
    container: {
      padding: spacing.lg,
      paddingBottom: spacing.xl,
    },
    doshaChip: {
      alignSelf: 'flex-start',
      marginTop: spacing.md,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xs,
      borderRadius: radius.pill,
      borderWidth: 1.5,
    },
    card: {
      marginTop: spacing.lg,
      padding: spacing.lg,
      backgroundColor: c.surface,
      borderRadius: radius.lg,
      borderWidth: 1,
      borderColor: c.border,
      borderLeftWidth: 3,
    },
    ghostBtn: {
      marginTop: spacing.lg,
      alignItems: 'center',
      paddingVertical: spacing.md,
    },
  });
}
