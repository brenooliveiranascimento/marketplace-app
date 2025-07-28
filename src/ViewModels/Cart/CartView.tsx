import React, { FC } from "react";
import { View, FlatList, SafeAreaView } from "react-native";
import { useCartModel } from "./useCartModel";
import { CartItem } from "./Components/CartItem";
import { CartHeader } from "./Components/CartHeader";
import { EmptyCart } from "./Components/EmptyList";
import { CartListFooter } from "./Components/CartListFooter";

interface CartViewProps extends ReturnType<typeof useCartModel> {}

export const CartView: FC<CartViewProps> = ({
  products,
  isEmpty,
  formatPrice,
  formatTotal,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onCheckout,
  onGoBack,
  creditCards,
  isLoadingCards,
  selectedCreditCard,
  isCreatingOrder,
  onSelectCreditCard,
  onEditCreditCard,
}) => {
  if (isEmpty) return <EmptyCart onGoBack={onGoBack} />;

  return (
    <SafeAreaView className="flex-1 bg-background">
      <FlatList
        data={products}
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
          <CartListFooter
            formatTotal={formatTotal}
            onCheckout={onCheckout}
            creditCards={creditCards}
            isLoadingCards={isLoadingCards}
            selectedCreditCard={selectedCreditCard}
            isCreatingOrder={isCreatingOrder}
            onSelectCreditCard={onSelectCreditCard}
            onEditCreditCard={onEditCreditCard}
          />
        }
      />
    </SafeAreaView>
  );
};
