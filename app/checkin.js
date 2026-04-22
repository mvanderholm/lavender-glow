import { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useTheme } from '../context/ThemeContext';
import { saveCheckin } from '../data/user/storage';

const dimensions = [
  { key: 'physical', label: 'Physical', desc: 'Energy, digestion, body' },
  { key: 'mental', label: 'Mental', desc: 'Focus, clarity, sharpness' },
  { key: 'emotional', label: 'Emotional', desc: 'Mood, calm, openness' },
];

const scale = [1, 2, 3, 4, 5];

export default function CheckIn() {
  const { theme: { colors, spacing, radius, type } } = useTheme();
  const [values, setValues] = useState({ physical: 3, mental: 3, emotional: 3 });
  const [note, setNote] = useState('');
  const styles = makeStyles(colors, spacing, radius);

  return (
    <SafeAreaView edges={['bottom']} style={{ flex: 1, backgroundColor: colors.bg }}>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={type.label}>Today, {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}</Text>
      <Text style={[type.h1, { marginTop: spacing.sm }]}>How are you, really?</Text>
      <Text style={[type.muted, { marginTop: spacing.xs }]}>A short check-in to tune today's guidance.</Text>

      {dimensions.map(d => (
        <View key={d.key} style={styles.section}>
          <Text style={type.h2}>{d.label}</Text>
          <Text style={type.muted}>{d.desc}</Text>
          <View style={styles.scaleRow}>
            {scale.map(n => (
              <Pressable
                key={n}
                onPress={() => setValues({ ...values, [d.key]: n })}
                style={[styles.scaleDot, values[d.key] === n && styles.scaleDotActive]}
              >
                <Text style={[styles.scaleNum, values[d.key] === n && styles.scaleNumActive]}>{n}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      ))}

      <View style={styles.section}>
        <Text style={type.h2}>A note (optional)</Text>
        <TextInput
          value={note}
          onChangeText={setNote}
          placeholder="What's present for you today?"
          placeholderTextColor={colors.textMuted}
          multiline
          style={styles.input}
        />
      </View>

      <Pressable
        style={styles.primaryBtn}
        onPress={async () => {
          await saveCheckin(values, note);
          router.push('/recommendations');
        }}
      >
        <Text style={styles.primaryBtnText}>Save & See Guidance</Text>
      </Pressable>
    </ScrollView>
    </SafeAreaView>
  );
}

function makeStyles(colors, spacing, radius) {
return StyleSheet.create({
  container: { padding: spacing.lg },
  section: { marginTop: spacing.xl },
  scaleRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.md },
  scaleDot: {
    width: 52, height: 52, borderRadius: radius.pill,
    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border,
    alignItems: 'center', justifyContent: 'center',
  },
  scaleDotActive: { backgroundColor: colors.saffron, borderColor: colors.saffron },
  scaleNum: { color: colors.textMuted, fontSize: 16, fontWeight: '600' },
  scaleNumActive: { color: colors.bg },
  input: {
    marginTop: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    color: colors.text,
    minHeight: 90,
    borderWidth: 1,
    borderColor: colors.border,
    textAlignVertical: 'top',
  },
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
