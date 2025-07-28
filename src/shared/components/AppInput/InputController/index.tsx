import React from "react";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  FieldErrors,
} from "react-hook-form";
import { AppInput, AppInputProps } from "..";

interface AppInputControllerProps<T extends FieldValues>
  extends Omit<AppInputProps, "value" | "onChangeText" | "error"> {
  control: Control<T>;
  name: Path<T>;
  errors?: FieldErrors<T>;
}

export const AppInputController = <T extends FieldValues>({
  control,
  name,
  errors,
  mask,
  ...rest
}: AppInputControllerProps<T>) => {
  const getErrorMessage = (
    errors: FieldErrors<T>,
    name: Path<T>
  ): string | undefined => {
    const keys = name.split(".");
    let current: any = errors;

    for (const key of keys) {
      if (current?.[key]) {
        current = current[key];
      } else {
        return undefined;
      }
    }

    return current?.message;
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
        formState: { isSubmitting },
      }) => (
        <AppInput
          value={value ?? ""}
          onChangeText={(text) => {
            if (mask) {
              onChange(mask(text) || "");
            } else {
              onChange(text);
            }
          }}
          onBlur={onBlur}
          error={error?.message || (errors && getErrorMessage(errors, name))}
          isError={!!error || (errors && !!getErrorMessage(errors, name))}
          isDisabled={isSubmitting || rest.isDisabled}
          editable={!isSubmitting && rest.editable !== false}
          mask={mask}
          {...rest}
        />
      )}
    />
  );
};
