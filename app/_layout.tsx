import { Stack } from "expo-router";
// import LegalNameScreen from "../screens/LegalName";
// import NotificationsScreen from "../screens/Notifications";
// import DashboardScreen from "../screens/Dashboard";
// import ErrorScreen from "../screens/ErrorScreen";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen
        name="legal-name"
        options={{ title: "Enter Name" }}
        component={LegalNameScreen}
      />
      <Stack.Screen
        name="notifications"
        options={{ title: "Notifications" }}
        component={NotificationsScreen}
      />
      <Stack.Screen
        name="dashboard"
        options={{ title: "Dashboard" }}
        component={DashboardScreen}
      /> */}
    </Stack>
  );
}
