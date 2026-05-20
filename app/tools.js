import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext';
import { BotanicalDivider } from '../components/BotanicalAccent';
import { useWindowDimensions, Platform } from 'react-native';

const TOOLS = [
  {
    href: '/learn',
    label: 'The Tradition',
    title: 'Learn',
    description: 'Classical ayurvedic concepts taught in Thea\'s voice. Essentials through advanced — go as deep as you want.',
    accent: 'accentAlt',
  },
  {
    href: '/about',
    label: 'The Practice',
    title: 'About Thea',
    description: 'Thea\'s story, credentials, and the worldview underneath everything in this app.',
    accent: 'sage',
  },
];

export default function Tools() {
  const { theme: { colors: c, spacing, radius, type } } = useTheme();
  const { width: windowWidth } = useWindowDimensions();
  const innerWidth = (Platform.OS === 'web' ? Math.min(windowWidth, 480) : windowWidth) - spacing.lg * 2;
  const router = useRouter();
  const styles = makeStyles(c, spacing, radius);

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: c.bg }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={type.label}>Explore</Text>
        <Text style={[type.h1, { marginTop: spacing.sm }]}>Tools</Text>
        <Text style={[type.muted, { marginTop: spacing.xs }]}>
          The tradition, the practice, and what Thea has built.
        </Text>

        <BotanicalDivider color={c.sage} borderColor={c.border} width={innerWidth} />

        {TOOLS.map(tool => (
          <Pressable
            key={tool.href}
            style={({ pressed }) => [styles.card, { borderLeftColor: c[tool.accent] }, pressed && { opacity: 0.75 }]}
            onPress={() => router.push(tool.href)}
          >
            <Text style={type.label}>{tool.label}</Text>
            <Text style={[type.h2, { marginTop: spacing.xs }]}>{tool.title}</Text>
            <Text style={[type.muted, { marginTop: spacing.sm, lineHeight: 22 }]}>{tool.description}</Text>
            <Text style={[styles.arrow, { color: c[tool.accent] }]}>→</Text>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

function makeStyles(c, spacing, radius) {
  return StyleSheet.create({
    container: {
      padding: spacing.lg,
      paddingBottom: spacing.xl,
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
    arrow: {
      marginTop: spacing.md,
      fontSize: 18,
    },
  });
}
