import { useEffect } from 'react';
import { Platform, View, Text, Pressable } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';
import { ThemeProvider, useTheme } from '../context/ThemeContext';
import { ViewModeProvider, useViewMode } from '../context/ViewModeContext';
import LogoMark from '../components/LogoMark';
import WebLayout from '../components/WebLayout';

function HeaderLogo() {
  return <LogoMark size={36} compact />;
}

function WebViewToggle() {
  const { setViewMode } = useViewMode();
  const { theme: { colors: c, radius } } = useTheme();
  return (
    <Pressable
      onPress={() => setViewMode('web')}
      style={{
        marginRight: 12,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: radius.pill,
        borderWidth: 1,
        borderColor: c.border,
      }}
    >
      <Text style={{ color: c.textMuted, fontSize: 12, fontWeight: '600' }}>Web View</Text>
    </Pressable>
  );
}

function AppNavigator() {
  const { theme, theme: { colors: c } } = useTheme();
  const { isWebMode } = useViewMode();
  const isWeb = Platform.OS === 'web';

  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setBackgroundColorAsync(c.bg);
      NavigationBar.setButtonStyleAsync(theme.statusBar === 'light' ? 'light' : 'dark');
    }
  }, [theme]);

  const stack = (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: c.bg },
        headerTintColor: c.text,
        headerTitleStyle: { fontWeight: '600' },
        contentStyle: { backgroundColor: c.bg },
        headerShadowVisible: false,
        headerTitle: HeaderLogo,
        headerTitleAlign: 'center',
        headerShown: !isWebMode,
        headerRight: isWeb && !isWebMode ? () => <WebViewToggle /> : undefined,
      }}
    >
      {/* index: show header on web app-view so the toggle is accessible */}
      <Stack.Screen name="index" options={{ headerShown: isWeb && !isWebMode }} />
      <Stack.Screen name="quiz" />
      <Stack.Screen name="result" />
      <Stack.Screen name="checkin" />
      <Stack.Screen name="recommendations" />
      <Stack.Screen name="about" />
      <Stack.Screen name="learn" options={{ title: 'Learn' }} />
    </Stack>
  );

  return (
    <>
      <StatusBar style={theme.statusBar} />
      {isWebMode ? (
        <WebLayout>{stack}</WebLayout>
      ) : (
        <View style={isWeb
          ? { flex: 1, alignItems: 'center', backgroundColor: c.bg }
          : { flex: 1 }
        }>
          <View style={isWeb
            ? { flex: 1, width: '100%', maxWidth: 480 }
            : { flex: 1 }
          }>
            {stack}
          </View>
        </View>
      )}
    </>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <ViewModeProvider>
        <AppNavigator />
      </ViewModeProvider>
    </ThemeProvider>
  );
}
