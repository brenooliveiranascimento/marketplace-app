import { Header } from "@/ViewModels/Home/components/Header";
import { colors } from "@/styles/colors";
import React from "react";
import { FlatList, RefreshControl } from "react-native";
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
  currentSearchText,
  setCurrentSearchText,
  handleEndReached,
  handleSearchTextChange,
  handleSearch,
  handleClearSearch,
  handleProductPress,
  handleProfilePress,
  handleRefresh,
  isRefreshing,
}) => {
  if (isLoading && products.length === 0) {
    return <Loading onProfilePress={handleProfilePress} />;
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <FlatList
        ListHeaderComponent={
          <>
            <Header onProfilePress={handleProfilePress} />
            <SearchInput
              value={currentSearchText}
              onChangeText={handleSearchTextChange}
              onSearch={handleSearch}
              onClear={handleClearSearch}
              placeholder="Pesquisar"
              disabled={isLoading}
            />
          </>
        }
        data={products}
        renderItem={({ item }: { item: ProductListItem }) => (
          <ProductCard product={item} onPress={handleProductPress} />
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
        ListFooterComponent={isLoading ? <RenderFooter /> : null}
        ListEmptyComponent={
          <EmptyList isLoading={isLoading} searchText={currentSearchText} />
        }
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
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
