import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useRouter } from "expo-router";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { globalStyles } from "../styles/globalStyles";
import { useAppStore } from "@/store/app-store";
import CustomButton from "@/components/button";

export default function LegalNameScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const setUser = useAppStore((state) => state.setUser);
  const router = useRouter();

  const handleContinue = async () => {
    if (firstName && lastName) {
      await setUser(firstName, lastName);
      router.push("/notifications");
    }
  };

  return (
    <SafeAreaView style={globalStyles.containerWhite}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback
          style={styles.subContainer}
          onPress={Keyboard.dismiss}
        >
          <View style={styles.subContainer}>
            <StatusBar barStyle="default" />
            <Text style={globalStyles.title}>Your Legal Name</Text>
            <Text style={globalStyles.description}>
              We need to know a bit about you so that we can create your
              account.
            </Text>
            <TextInput
              placeholder="First Name"
              style={globalStyles.input}
              onChangeText={setFirstName}
              value={firstName}
            />
            <TextInput
              placeholder="Last Name"
              style={globalStyles.input}
              onChangeText={setLastName}
              value={lastName}
            />
            <CustomButton
              icon="chevron-forward-outline"
              onPress={handleContinue}
              disabled={!firstName || !lastName}
              additionalStyles={styles.button}
            />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 25,
  },
  subContainer: {
    flex: 1,
  },
  button: {
    position: "absolute",
    bottom: responsiveHeight(2),
    right: responsiveWidth(2),
    width: responsiveHeight(7),
    height: responsiveHeight(7),
  },
});
