import { FC } from "react";
import { Text, View } from "react-native";
import { useAppPriceText } from "./useAppPriceText";

type Props = ReturnType<typeof useAppPriceText> & {
  classNameCurrency?: string;
  classNameValue?: string;
};

export const AppPriceTextView: FC<Props> = ({
  currencySymbol,
  valueText,
  classNameCurrency,
  classNameValue,
}) => {
  return (
    <View className="flex-row items-baseline">
      <Text className={classNameCurrency ?? "text-sm text-gray-900"}>
        {currencySymbol}
      </Text>
      <Text className={classNameValue ?? "text-2xl font-bold text-gray-900"}>
        {" "}
        {valueText}
      </Text>
    </View>
  );
};
