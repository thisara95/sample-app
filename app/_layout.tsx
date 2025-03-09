import { Stack } from "expo-router";
// import DashboardScreen from "../screens/Dashboard";
// import ErrorScreen from "../screens/ErrorScreen";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="legal-name" />
      <Stack.Screen name="notifications" />
      {/* <Stack.Screen
        name="dashboard"
        options={{ title: "Dashboard" }}
        component={DashboardScreen}
      /> */}
    </Stack>
  );
}
