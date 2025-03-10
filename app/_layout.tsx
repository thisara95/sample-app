import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, View } from "react-native";

const queryClient = new QueryClient({});

export default function Layout() {
  const [initialRoute, setInitialRoute] = useState("legal-name");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserData = async () => {
      try {
        const storedFirstName = await AsyncStorage.getItem("firstName");
        if (storedFirstName) {
          setInitialRoute("dashboard");
        }
      } catch (error) {
        console.error("Error accessing AsyncStorage: ", error);
      } finally {
        setLoading(false);
      }
    };
    checkUserData();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#4A90E2" />
      </View>
    );
  }
  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{ headerShown: false, gestureEnabled: false }}
        initialRouteName={"dashboard"}
      >
        <Stack.Screen name="legal-name" />
        <Stack.Screen name="notifications" />
        <Stack.Screen name="dashboard" />
      </Stack>
    </QueryClientProvider>
  );
}
