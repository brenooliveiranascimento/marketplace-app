import { FC } from "react";
import { Text, View } from "react-native";
import { useAppPriceText } from "./useAppPriceText";

type Props = ReturnType<typeof useAppPriceText> & {
  classNameCurrency?: string;
  classNameValue?: string;
};

export const AppPriceTextView: FC<Props> = ({
  currencySymbol,
  value,
  classNameCurrency,
  classNameValue,
}) => {
  return (
    <View className="flex-row items-baseline">
      <Text className={classNameCurrency}>{currencySymbol}</Text>
      <Text className={classNameValue}> {value}</Text>
    </View>
  );
};
