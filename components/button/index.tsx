import React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS } from "@/styles/colors";
import { globalStyles } from "@/styles/globalStyles";

interface CustomButtonProps {
  label?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  disabled?: boolean;
  additionalStyles?: ViewStyle;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  icon,
  onPress,
  disabled = false,
  additionalStyles,
}) => {
  return (
    <TouchableOpacity
      style={[
        globalStyles.button,
        additionalStyles,
        { opacity: disabled ? 0.4 : 1 },
      ]}
      onPress={onPress}
      disabled={disabled}
      testID="button"
    >
      {label && <Text style={styles.text}>{label}</Text>}
      {icon && (
        <Ionicons
          testID="button-icon"
          name={icon}
          size={24}
          color={COLORS.white}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
});

export default CustomButton;
