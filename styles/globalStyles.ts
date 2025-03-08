import { StyleSheet } from "react-native";
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { COLORS } from "./colors";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: responsiveWidth(5),
    backgroundColor: COLORS.black,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: responsiveFontSize(3),
    fontWeight: "bold",
    color: COLORS.primary,
    textAlign: "center",
    marginBottom: responsiveHeight(2),
  },
  input: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    padding: responsiveHeight(1),
    fontSize: responsiveFontSize(2),
    marginBottom: responsiveHeight(2),
  },
  button: {
    width: "80%",
    paddingVertical: responsiveHeight(2),
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    alignSelf: "center",
  },
  buttonText: {
    fontSize: responsiveFontSize(2),
    fontWeight: "bold",
    color: COLORS.white,
    textAlign: "center",
  },
});
