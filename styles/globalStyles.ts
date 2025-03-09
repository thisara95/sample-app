import { StyleSheet } from "react-native";
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { COLORS } from "./colors";
import { TYPOGRAPHY } from "./typography";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: responsiveWidth(5),
    backgroundColor: COLORS.black,
    alignItems: "center",
    justifyContent: "center",
  },
  containerWhite: {
    flex: 1,
    padding: responsiveWidth(5),
    backgroundColor: COLORS.white,
  },
  title: {
    fontSize: TYPOGRAPHY.large,
    fontWeight: "700",
    lineHeight: responsiveHeight(5),
    color: COLORS.title,
    textAlign: "left",
    marginBottom: responsiveHeight(2),
    fontFamily: "Roboto",
  },
  description: {
    fontSize: TYPOGRAPHY.small,
    fontWeight: "400",
    lineHeight: responsiveHeight(2.5),
    color: COLORS.description,
    textAlign: "left",
    marginBottom: responsiveHeight(3),
    fontFamily: "Roboto",
  },
  input: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    padding: responsiveHeight(1),
    fontSize: responsiveFontSize(2),
    marginBottom: responsiveHeight(4),
  },
  button: {
    paddingVertical: responsiveHeight(2),
    backgroundColor: COLORS.primary,
    borderRadius: 999,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  buttonText: {
    fontSize: responsiveFontSize(2),
    fontWeight: "bold",
    color: COLORS.white,
    textAlign: "center",
  },
});
