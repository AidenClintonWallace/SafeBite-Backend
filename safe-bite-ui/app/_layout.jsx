/*Olwethu Mtwazi
Student Number: 230036937
 layout for screens*/

import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* If you want authentication first, you can point initialRouteName to 'login' */}
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="notifications" options={{ headerShown: true, title: 'Notifications' }} />
      <Stack.Screen name="report" options={{ headerShown: true, title: 'Report a product' }} />
    </Stack>
  );
}