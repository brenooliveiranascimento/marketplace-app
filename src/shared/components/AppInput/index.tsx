import React, { useState, useRef } from "react";
import {
  View,
  TextInput,
  Text,
  TextInputProps,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { AppInputVariants, appInputVariants } from "./input.variants";

export interface AppInputProps extends TextInputProps, AppInputVariants {
  label?: string;
  error?: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onLeftIconPress?: () => void;
  onRightIconPress?: () => void;
  containerClassName?: string;
  mask?: (value: string) => void | string;
}

export const AppInput: React.FC<AppInputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  onLeftIconPress,
  onRightIconPress,
  isError,
  isDisabled,
  containerClassName,
  className,
  editable = true,
  onFocus,
  onBlur,
  mask,
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const hasError = isError || !!error;
  const isInputDisabled = isDisabled || !editable;

  const styles = appInputVariants({
    isFocused,
    isError: hasError,
    isDisabled: isInputDisabled,
  });

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const getIconColor = () => {
    if (isInputDisabled) return colors.gray[300];
    if (hasError) return colors.danger;
    if (isFocused) return colors["purple-base"];
    return colors.gray["400"];
  };

  const handleWrapperPress = () => {
    inputRef.current?.focus();
  };

  return (
    <View className={styles.container({ className: containerClassName })}>
      {label && <Text className={styles.label()}>{label}</Text>}

      <Pressable onPress={handleWrapperPress} className={styles.wrapper()}>
        {leftIcon && (
          <TouchableOpacity
            onPress={onLeftIconPress}
            disabled={!onLeftIconPress || isInputDisabled}
            activeOpacity={0.7}
            className="mr-3"
          >
            <Ionicons
              name={leftIcon}
              size={22}
              color={getIconColor()}
              className={styles.icon()}
            />
          </TouchableOpacity>
        )}

        <TextInput
          ref={inputRef}
          className={styles.input({ className })}
          placeholderTextColor={colors.gray["200"]}
          editable={!isInputDisabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={(text) => {
            if (mask) {
              textInputProps.onChangeText?.(mask(text) || "");
            } else {
              textInputProps.onChangeText?.(text);
            }
          }}
          {...textInputProps}
        />

        {rightIcon && (
          <TouchableOpacity
            onPress={onRightIconPress}
            disabled={!onRightIconPress || isInputDisabled}
            activeOpacity={0.7}
            className="ml-3"
          >
            <Ionicons
              name={rightIcon}
              size={22}
              color={getIconColor()}
              className={styles.icon()}
            />
          </TouchableOpacity>
        )}
      </Pressable>
      {error && (
        <Text className={styles.error()}>
          <Ionicons name="alert-circle-outline" className={styles.error()} />
          {error}
        </Text>
      )}
    </View>
  );
};
