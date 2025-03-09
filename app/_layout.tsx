import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="legal-name" />
      <Stack.Screen name="notifications" />
      <Stack.Screen name="dashboard" />
    </Stack>
  );
}
