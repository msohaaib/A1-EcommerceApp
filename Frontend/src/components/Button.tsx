import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline" | "danger";
  size?: "small" | "medium" | "large";
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  loading = false,
  disabled = false,
  style,
  textStyle,
  icon,
}) => {
  const getButtonStyle = () => {
    const base = [
      styles.button,
      styles[`button_${variant}`],
      styles[`button_${size}`],
    ];
    if (disabled || loading) base.push(styles.buttonDisabled);
    if (style) base.push(style);
    return base;
  };

  const getTextStyle = () => {
    const base = [
      styles.text,
      styles[`text_${variant}`],
      styles[`text_${size}`],
    ];
    if (textStyle) base.push(textStyle);
    return base;
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <>
          {icon && icon}
          <Text style={getTextStyle()}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    elevation: 2,
  },

  // Variants
  button_primary: {
    backgroundColor: "#007bff",
  },
  button_secondary: {
    backgroundColor: "#6c757d",
  },
  button_outline: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#007bff",
    elevation: 0,
  },
  button_danger: {
    backgroundColor: "#dc3545",
  },

  // Sizes
  button_small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  button_medium: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  button_large: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },

  // Disabled state
  buttonDisabled: {
    opacity: 0.5,
  },

  // Text styles
  text: {
    fontWeight: "600",
    textAlign: "center",
  },
  text_primary: {
    color: "#fff",
  },
  text_secondary: {
    color: "#fff",
  },
  text_outline: {
    color: "#007bff",
  },
  text_danger: {
    color: "#fff",
  },
  text_small: {
    fontSize: 14,
  },
  text_medium: {
    fontSize: 16,
  },
  text_large: {
    fontSize: 18,
  },
});
