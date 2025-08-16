import React from "react";
import { View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ProductComment } from "@/shared/interfaces/comments";
import { colors } from "@/styles/colors";
import { User } from "@/store/userStore";
import { buildImageUrl } from "@/shared/helpers/url.helper";

interface CommentItemProps {
  comment: ProductComment;
  formatRating: (rating: string) => string;
  formatName: (name: string) => string;
  user: User;
}

export function CommentItem({ comment, formatName, user }: CommentItemProps) {
  const isCurrentUser = user?.id === comment.user.id;

  return (
    <View className="bg-white p-4 mb-3 rounded-lg shadow-sm">
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center flex-1">
          <View className="w-8 h-8 rounded-[6px] overflow-hidden bg-gray-200 mr-3">
            {comment.user.avatar?.url && comment.user.avatar.url !== "" ? (
              <Image
                source={{ uri: buildImageUrl(comment.user.avatar.url) }}
                className="w-full h-full"
                resizeMode="cover"
              />
            ) : (
              <View className="w-full h-full items-center justify-center">
                <Ionicons name="person" color={colors.gray[400]} size={20} />
              </View>
            )}
          </View>
          <View className="flex-row items-center flex-1">
            <Text className="text-base font-medium text-gray-800">
              {formatName(comment.user.name)}
            </Text>
            {isCurrentUser && (
              <View className="bg-purple-base px-2 py-1 rounded-full ml-2">
                <Text className="text-white text-xs font-bold">Você</Text>
              </View>
            )}
          </View>
        </View>

        <View className="flex-row items-end">
          <Ionicons
            name="star"
            size={16}
            className="mr-1"
            color={colors["blue-base"]}
          />
          <Text className="text-sm font-bold text-gray-600">
            {comment?.user?.rating?.value} /{" "}
            <Text className="text-[10px] text-gray-600">5</Text>
          </Text>
        </View>
      </View>

      <Text className="text-gray-700 text-base leading-5">
        {comment.content}
      </Text>
    </View>
  );
}
