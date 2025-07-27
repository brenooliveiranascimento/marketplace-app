import React, { FC } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useProductModel } from './useProductModel';
import { useCommentsModel } from './useCommentsModel';
import { CommentItem } from './components/CommentItem';
import { ProductHeader } from './components/ProductHeader';
import { renderEmpty } from './components/EmptyList';
import { ProductLoadError } from './components/Error';
import { ListFooter } from './components/ListFooter';
import { LoadingProduct } from './components/LoadingProduct';
import { ProductFooter } from './components/ProductFooter';

interface ProductViewProps extends ReturnType<typeof useProductModel>, ReturnType<typeof useCommentsModel> {}

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
  onAddReview,
  formatRating,
  formatName
}) => {

  if (isLoadingProduct) return <LoadingProduct />
  
  if (error || !product) return <ProductLoadError onGoBack={onGoBack}/>

  return (
    <SafeAreaView className="flex-1">
      <View className="px-4 py-3 pb-5">
        <TouchableOpacity 
          className="flex-row items-center"
          onPress={onGoBack}
        >
          <Ionicons 
            name="arrow-back" 
            size={24} 
            color="#8B5CF6" 
          />
          <Text className="text-base text-purple-600 ml-1">
            Voltar
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={comments}
        renderItem={({ item }) => (
          <CommentItem formatName={formatName} comment={item} formatRating={formatRating} />
        )}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={<ProductHeader onAddReview={onAddReview} product={product} />}
        ListFooterComponent={<ListFooter isLoadingMore={isLoadingMore} />}
        ListEmptyComponent={renderEmpty}
        contentContainerClassName="pb-24"
        className='px-6 bg-background'
        showsVerticalScrollIndicator={false}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.1}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        removeClippedSubviews={true}
        maxToRenderPerBatch={5}
        windowSize={10}
        initialNumToRender={5}
        ItemSeparatorComponent={() => <View className="px-4"><View className="h-3" /></View>}
      />

      <ProductFooter onAddToCart={onAddToCart} product={product}/>
    </SafeAreaView>
  );
};