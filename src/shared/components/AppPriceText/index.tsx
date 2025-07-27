import { FC } from "react";
import { useAppPriceText } from "./useAppPriceText";
import { AppPriceTextView } from "./AppPriceTextView";

interface Props {
  classNameCurrency?: string;
  classNameValue?: string;
  value: number;
}

export const AppPriceText: FC<Props> = ({
  value,
  classNameCurrency,
  classNameValue,
}) => {
  const props = useAppPriceText(value);
  return (
    <AppPriceTextView
      {...props}
      classNameCurrency={classNameCurrency}
      classNameValue={classNameValue}
    />
  );
};
