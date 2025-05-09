import '../global.css';

import { Stack } from 'expo-router';
import { AuthProvider } from '~/context/auth';

export default function Layout() {
  return (
  <AuthProvider>
    <Stack screenOptions={{headerShown:false}}/>
  </AuthProvider>
);
}
