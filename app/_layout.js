import { useEffect } from 'react';
import { Platform, View } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';
import { ThemeProvider, useTheme } from '../context/ThemeContext';
import LogoMark from '../components/LogoMark';

function HeaderLogo() {
  return <LogoMark size={36} compact />;
}

function AppNavigator() {
  const { theme } = useTheme();
  const c = theme.colors;

  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setBackgroundColorAsync(c.bg);
      NavigationBar.setButtonStyleAsync(theme.statusBar === 'light' ? 'light' : 'dark');
    }
  }, [theme]);

  const isWeb = Platform.OS === 'web';

  return (
    <>
      <StatusBar style={theme.statusBar} />
      <View style={isWeb
        ? { flex: 1, alignItems: 'center', backgroundColor: c.bg }
        : { flex: 1 }
      }>
        <View style={isWeb
          ? { flex: 1, width: '100%', maxWidth: 480 }
          : { flex: 1 }
        }>
          <Stack
            screenOptions={{
              headerStyle: { backgroundColor: c.bg },
              headerTintColor: c.text,
              headerTitleStyle: { fontWeight: '600' },
              contentStyle: { backgroundColor: c.bg },
              headerShadowVisible: false,
              headerTitle: HeaderLogo,
              headerTitleAlign: 'center',
            }}
          >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="quiz" />
            <Stack.Screen name="result" />
            <Stack.Screen name="checkin" />
            <Stack.Screen name="recommendations" />
            <Stack.Screen name="about" />
            <Stack.Screen name="learn" options={{ title: 'Learn' }} />
          </Stack>
        </View>
      </View>
    </>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  );
}
