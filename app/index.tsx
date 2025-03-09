import { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { globalStyles } from "@/styles/globalStyles";
import { COLORS } from "@/styles/colors";
import BlotLogo from "../assets/images/logo.png";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const splash = setTimeout(() => {
      router.push("/legal-name");
    }, 2);

    return () => {
      clearTimeout(splash);
    };
  }, []);

  return (
    <View style={globalStyles.container}>
      <Image source={BlotLogo} style={styles.logo} />
      <ActivityIndicator size="large" color="#4A90E2" />
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
