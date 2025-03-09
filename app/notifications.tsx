import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useAppStore } from "../store/app-store";
import { globalStyles } from "../styles/globalStyles";
import CustomButton from "@/components/button";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import Svg, { Path } from "react-native-svg";
import { requestNotificationPermission } from "@/utils/notification-utils";

export default function NotificationsScreen() {
  const { setNotifications } = useAppStore();
  const router = useRouter();

  const handleEnableNotifications = async () => {
    await requestNotificationPermission(setNotifications);
    router.push("/dashboard");
  };

  return (
    <SafeAreaView style={globalStyles.containerWhite}>
      <View style={[globalStyles.containerWhite, styles.mainContainer]}>
        <Svg
          width={responsiveWidth(25)}
          height={responsiveHeight(13)}
          fill="none"
        >
          <Path
            fill="#6D59E9"
            d="M82.167 27.563c6.201 0 11.229-5.028 11.229-11.23 0-6.201-5.028-11.229-11.23-11.229-6.201 0-11.228 5.028-11.228 11.23 0 6.201 5.027 11.229 11.229 11.229Z"
          />
          <Path
            fill="#111827"
            d="M82.167 32.667c-9.025 0-16.334-7.31-16.334-16.334 0-2.98.858-5.757 2.287-8.166H29.083c-11.27 0-20.416 9.106-20.416 20.335V57.003c0 11.23 9.146 20.335 20.416 20.335h6.125c1.103 0 2.573.735 3.267 1.634l6.125 8.126c2.695 3.593 7.105 3.593 9.8 0l6.125-8.126a4.14 4.14 0 0 1 3.267-1.634h6.125c11.27 0 20.416-9.105 20.416-20.335V30.38c-2.409 1.43-5.186 2.287-8.166 2.287Z"
            opacity={0.3}
          />
          <Path
            fill="#111827"
            d="M49.5 49a4.07 4.07 0 0 1-4.083-4.083 4.095 4.095 0 0 1 4.083-4.084 4.095 4.095 0 0 1 4.083 4.084A4.07 4.07 0 0 1 49.5 49ZM65.833 49a4.07 4.07 0 0 1-4.083-4.083 4.095 4.095 0 0 1 4.083-4.084 4.095 4.095 0 0 1 4.084 4.084A4.07 4.07 0 0 1 65.833 49ZM33.167 49a4.07 4.07 0 0 1-4.084-4.083 4.095 4.095 0 0 1 4.084-4.084 4.095 4.095 0 0 1 4.083 4.084A4.07 4.07 0 0 1 33.167 49Z"
          />
        </Svg>
        <Text style={[globalStyles.title, styles.title]}>
          Get the most out of Blott ✅
        </Text>
        <Text style={[globalStyles.description, styles.description]}>
          Allow notifications to stay in the loop with your payments, requests
          and groups.
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          label="Continue"
          onPress={handleEnableNotifications}
          additionalStyles={styles.button}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 8,
    marginBottom: responsiveHeight(10),
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  button: {
    width: "80%",
  },
  description: {
    textAlign: "center",
    paddingBottom: responsiveHeight(2),
  },
  title: {
    marginBottom: responsiveHeight(2),
  },
});
