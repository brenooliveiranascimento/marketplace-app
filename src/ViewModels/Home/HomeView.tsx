import { Header } from "@/components/Header";
import { Product } from "@/shared/interfaces/product";
import { styles } from "@/styles/colors";
import React from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchInput } from "./components/SearchInput";
import { useHomeModel } from "./useHomeModel";
import { ProductCard } from "./components/ProductCard";

export const HomeView: React.FC<ReturnType<typeof useHomeModel>> = ({
  products,
  isLoading,
  isLoadingMore,
  hasNextPage,
  searchText,
  isRefreshing,
  onSearchTextChange,
  onSearch,
  onClearSearch,
  onProductPress,
  onAddToCart,
  onCartPress,
  onProfilePress,
  onLoadMore,
  onRefresh,
}) => {
  const renderProduct = ({ item }: { item: Product }) => (
    <ProductCard
      product={item}
      onPress={onProductPress}
      onAddToCart={onAddToCart}
    />
  );

  const renderFooter = () => {
    if (!isLoadingMore) return null;

    return (
      <View className="py-4">
        <ActivityIndicator size="small" color={styles["blue-base"]} />
      </View>
    );
  };

  const renderEmpty = () => {
    if (isLoading) return null;

    return (
      <View className="flex-1 items-center justify-center py-20">
        <Text
          style={{ color: styles.grays["gray-300"] }}
          className="text-lg text-center"
        >
          {searchText
            ? "Nenhum produto encontrado"
            : "Nenhum produto disponível"}
        </Text>
        {searchText && (
          <Text
            style={{ color: styles.grays["gray-200"] }}
            className="text-sm text-center mt-2"
          >
            Tente buscar por outro termo
          </Text>
        )}
      </View>
    );
  };

  const handleEndReached = () => {
    if (hasNextPage && !isLoadingMore && !isLoading) {
      onLoadMore();
    }
  };

  if (isLoading && products.length === 0) {
    return (
      <SafeAreaView
        style={{ backgroundColor: styles.background }}
        className="flex-1"
      >
        <Header onCartPress={onCartPress} onProfilePress={onProfilePress} />

        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color={styles["blue-base"]} />
          <Text
            style={{ color: styles.grays["gray-300"] }}
            className="text-base mt-4"
          >
            Carregando produtos...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{ backgroundColor: styles.background }}
      className="flex-1"
    >
      <Header onCartPress={onCartPress} onProfilePress={onProfilePress} />

      <SearchInput
        value={searchText}
        onChangeText={onSearchTextChange}
        onSearch={onSearch}
        onClear={onClearSearch}
        placeholder="Buscar produtos..."
        disabled={isLoading}
      />

      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={{
          paddingHorizontal: 8,
          paddingBottom: 20,
        }}
        columnWrapperStyle={{
          justifyContent: "space-between",
        }}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.3}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            colors={[styles["blue-base"]]}
            tintColor={styles["blue-base"]}
          />
        }
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={10}
        initialNumToRender={8}
      />
    </SafeAreaView>
  );
};
