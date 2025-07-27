import React, { FC } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ListRenderItem,
} from "react-native";
import { CartItem as CartItemType } from "@/store/cartStore";
import { useCartModel } from "./useCartModel";
import { CartItem } from "./Components/CartItem";
import { colors } from "@/styles/colors";
import { CartHeader } from "./Components/CartHeader";
import { EmptyCart } from "./Components/EmptyList";
import { CartListFooter } from "./Components/CartListFooter";

interface CartViewProps extends ReturnType<typeof useCartModel> {}

export const CartView: FC<CartViewProps> = ({
  items,
  isEmpty,
  itemCount,
  formatPrice,
  formatTotal,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onCheckout,
  onGoBack,
}) => {
  if (isEmpty) return <EmptyCart onGoBack={onGoBack} />;

  return (
    <SafeAreaView className="flex-1 bg-background">
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            formatPrice={formatPrice}
            onIncreaseQuantity={onIncreaseQuantity}
            onDecreaseQuantity={onDecreaseQuantity}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={CartHeader}
        contentContainerClassName="px-4"
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View className="h-2" />}
        ListFooterComponent={
          <CartListFooter formatTotal={formatTotal} onCheckout={onCheckout} />
        }
      />
    </SafeAreaView>
  );
};
