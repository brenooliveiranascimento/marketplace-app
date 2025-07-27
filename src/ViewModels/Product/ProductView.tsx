import React, { FC } from "react";
import { View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useProductModel } from "./useProductModel";
import { useCommentsModel } from "./useCommentsModel";
import { CommentItem } from "./components/CommentItem";
import { ProductHeader } from "./components/ProductHeader";
import { renderEmpty } from "./components/EmptyList";
import { ProductLoadError } from "./components/Error";
import { ListFooter } from "./components/ListFooter";
import { LoadingProduct } from "./components/LoadingProduct";
import { ProductFooter } from "./components/ProductFooter";

interface ProductViewProps
  extends ReturnType<typeof useProductModel>,
    ReturnType<typeof useCommentsModel> {}

export const ProductView: FC<ProductViewProps> = ({
  product,
  isLoading: isLoadingProduct,
  error,
  onAddToCart,
  onGoBack,
  comments,
  isLoadingMore,
  isRefreshing,
  onLoadMore,
  onRefresh,
  formatRating,
  formatName,
  handleOpenReviewModal,
}) => {
  if (isLoadingProduct) return <LoadingProduct />;

  if (error || !product) return <ProductLoadError onGoBack={onGoBack} />;

  return (
    <View className="flex-1 bg-background">
      <SafeAreaView edges={["top"]} className="flex-1 ">
        <FlatList
          data={comments}
          renderItem={({ item }) => (
            <CommentItem
              formatName={formatName}
              comment={item}
              formatRating={formatRating}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={
            <ProductHeader
              product={product}
              onGoBack={onGoBack}
              onOpenReviewModal={handleOpenReviewModal}
            />
          }
          ListFooterComponent={<ListFooter isLoadingMore={isLoadingMore} />}
          ListEmptyComponent={renderEmpty}
          contentContainerClassName="pb-24"
          className="px-6 bg-background"
          showsVerticalScrollIndicator={false}
          onEndReached={onLoadMore}
          onEndReachedThreshold={0.1}
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          removeClippedSubviews={true}
          maxToRenderPerBatch={5}
          windowSize={10}
          initialNumToRender={5}
          ItemSeparatorComponent={() => (
            <View className="px-4">
              <View className="h-3" />
            </View>
          )}
        />
      </SafeAreaView>

      <SafeAreaView edges={["bottom"]} className="bg-white">
        <ProductFooter onAddToCart={onAddToCart} product={product} />
      </SafeAreaView>
    </View>
  );
};
