import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { themes } from '../theme';

const THEME_KEY = '@lavender-glow/theme';
const BRAND_KEY = '@lavender-glow/brand';

const ThemeContext = createContext({
  theme: themes.midnight,
  themeName: 'midnight',
  setThemeName: () => {},
  brandStyle: 'wordmark',
  setBrandStyle: () => {},
});

export function ThemeProvider({ children }) {
  const [themeName, setThemeNameState] = useState('midnight');
  const [brandStyle, setBrandStyleState] = useState('wordmark');

  useEffect(() => {
    AsyncStorage.multiGet([THEME_KEY, BRAND_KEY]).then(pairs => {
      const savedTheme = pairs[0][1];
      const savedBrand = pairs[1][1];
      if (savedTheme && themes[savedTheme]) setThemeNameState(savedTheme);
      if (savedBrand === 'wordmark' || savedBrand === 'lettermark') setBrandStyleState(savedBrand);
    });
  }, []);

  function setThemeName(name) {
    if (!themes[name]) return;
    setThemeNameState(name);
    AsyncStorage.setItem(THEME_KEY, name);
  }

  function setBrandStyle(name) {
    if (name !== 'wordmark' && name !== 'lettermark') return;
    setBrandStyleState(name);
    AsyncStorage.setItem(BRAND_KEY, name);
  }

  return (
    <ThemeContext.Provider value={{ theme: themes[themeName], themeName, setThemeName, brandStyle, setBrandStyle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
