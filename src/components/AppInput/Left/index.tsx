import { TouchableOpacity } from "react-native";
import { inputVariants } from "../input.variants";
import { SideButtonParams } from "..";
import { FC } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";

interface Props {
  classes: ReturnType<typeof inputVariants>;
  isInputDisabled: boolean;
  button: SideButtonParams | undefined;
}

export const RenderSideElement: FC<Props> = ({
  classes,
  button,
  isInputDisabled,
}) => {
  if (button) {
    return (
      <TouchableOpacity
        onPress={button.onPress}
        className={classes.button()}
        style={{ borderBottomColor: colors.grays["gray-300"] }}
        disabled={isInputDisabled}
        activeOpacity={button.onPress ? 0.7 : 1}
      >
        {button.icon && (
          <MaterialIcons
            name={button.icon}
            size={24}
            color={colors.grays["gray-300"]}
          />
        )}
      </TouchableOpacity>
    );
  }

  return null;
};
