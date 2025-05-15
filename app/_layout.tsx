import '../global.css';
import { Stack,SplashScreen } from 'expo-router';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [fontsLoaded] = useFonts({
    'PressStart2P': require('../assets/fonts/PressStart2P-Regular.ttf'),
    'VT323': require('../assets/fonts/VT323-Regular.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      // Hide splash screen once fonts are loaded
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Still loading fonts
  }

  return <Stack />;
}
