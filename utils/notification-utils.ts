import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, Linking, Platform } from "react-native";

export const requestNotificationPermission = async (
  setNotifications: (enabled: boolean) => void
) => {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== "granted") {
    Alert.alert(
      "Permission Denied",
      "You need to enable notifications in settings.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Go to Settings", onPress: openAppSettings },
      ]
    );
    setNotifications(false);
  } else {
    setNotifications(true);
    await AsyncStorage.setItem("notificationsEnabled", JSON.stringify(true));
  }
};

export const openAppSettings = () => {
  const settingsURL = Platform.OS === "ios" ? "app-settings:" : "settings";
  Linking.openURL(settingsURL).catch(() =>
    Alert.alert("Error", "Unable to open settings.")
  );
};
