import React from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  TouchableOpacityProps,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { buttonVariants, ButtonVariants } from "./AppButton.variant";

interface AppButtonProps extends TouchableOpacityProps, ButtonVariants {
  children: React.ReactNode;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
}

export const AppButton: React.FC<AppButtonProps> = ({
  children,
  leftIcon,
  rightIcon,
  variant,
  size,
  isLoading,
  isDisabled,
  disabled,
  className,
  ...props
}) => {
  const isButtonDisabled = disabled || isDisabled || isLoading;
  const hasIcon = Boolean(leftIcon || rightIcon);

  const styles = buttonVariants({
    variant,
    size,
    hasIcon,
    isLoading,
    isDisabled: isButtonDisabled,
  });

  const getIconSize = () => {
    switch (size) {
      case "small":
        return 16;
      case "large":
        return 24;
      default:
        return 20;
    }
  };

  const getIconColor = () => {
    if (isButtonDisabled) {
      return variant === "filled"
        ? colors.grays["gray-500"]
        : colors.grays["gray-300"];
    }
    return variant === "filled" ? colors.white : colors["purple-base"];
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <ActivityIndicator
          size="small"
          color={variant === "filled" ? colors.white : colors["purple-base"]}
        />
      );
    }

    if (hasIcon) {
      return (
        <>
          {leftIcon ? (
            <Ionicons
              name={leftIcon}
              size={getIconSize()}
              color={getIconColor()}
              className={styles.icon()}
            />
          ) : typeof children === "string" ? (
            <Text className={styles.text()}>{children}</Text>
          ) : (
            children
          )}

          {rightIcon ? (
            <Ionicons
              name={rightIcon}
              size={getIconSize()}
              color={getIconColor()}
              className={styles.icon()}
            />
          ) : leftIcon ? (
            typeof children === "string" ? (
              <Text className={styles.text()}>{children}</Text>
            ) : (
              children
            )
          ) : (
            <View />
          )}
        </>
      );
    }

    return typeof children === "string" ? (
      <Text className={styles.text()}>{children}</Text>
    ) : (
      children
    );
  };

  return (
    <TouchableOpacity
      className={styles.base({ className })}
      disabled={isButtonDisabled}
      activeOpacity={0.8}
      {...props}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};
