import { Header } from "@/components/Header";
import { Product } from "@/shared/interfaces/product";
import { colors } from "@/styles/colors";
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
import { RenderFooter } from "./components/Footer";
import { EmptyList } from "./components/EmptyList";
import { Loading } from "./components/Loading";
import { ProductListItem } from "@/shared/interfaces/https/get-products";

export const HomeView: React.FC<ReturnType<typeof useHomeModel>> = ({
  products,
  isLoading,
  isLoadingMore,
  searchText,
  isRefreshing,
  onSearchTextChange,
  onSearch,
  onClearSearch,
  onProductPress,
  onProfilePress,
  handleEndReached,
  onRefresh,
}) => {
  if (isLoading && products.length === 0)
    <Loading onProfilePress={onProfilePress} />;

  return (
    <SafeAreaView className="flex-1 bg-background">
      <FlatList
        ListHeaderComponent={
          <>
            <Header onProfilePress={onProfilePress} />
            <SearchInput
              value={searchText}
              onChangeText={onSearchTextChange}
              onSearch={onSearch}
              onClear={onClearSearch}
              placeholder="Pesquisar"
              disabled={isLoading}
            />
          </>
        }
        data={products}
        renderItem={({ item }: { item: ProductListItem }) => (
          <ProductCard product={item} onPress={onProductPress} />
        )}
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
        ListFooterComponent={isLoadingMore ? <RenderFooter /> : null}
        ListEmptyComponent={
          <EmptyList isLoading={isLoading} searchText={searchText} />
        }
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            colors={[colors["blue-base"]]}
            tintColor={colors["blue-base"]}
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
