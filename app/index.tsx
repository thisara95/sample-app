import { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { globalStyles } from "@/styles/globalStyles";
import { COLORS } from "@/styles/colors";
import BlotLogo from "../assets/images/logo.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

export default function SplashScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserData = async () => {
      try {
        const storedFirstName = await AsyncStorage.getItem("firstName");
        const apiKey = await SecureStore.getItemAsync("API_KEY");
        if (!apiKey) {
          await SecureStore.setItemAsync(
            "API_KEY",
            "crals9pr01qhk4bqotb0crals9pr01qhk4bqotbg"
          );
        }
        setTimeout(() => {
          storedFirstName
            ? router.replace("/dashboard")
            : router.replace("/legal-name");
        }, 2000);
      } catch (error) {
        console.error("Error accessing AsyncStorage: ", error);
      } finally {
        setLoading(false);
      }
    };
    checkUserData();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={BlotLogo} style={styles.logo} />
      {loading && <ActivityIndicator size="large" color="#4A90E2" />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.black,
  },
  logo: {
    marginBottom: responsiveHeight(5),
    height: responsiveHeight(13),
    width: responsiveWidth(50),
  },
});
