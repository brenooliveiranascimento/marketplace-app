import React from "react";
import { View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Comment } from "@/shared/interfaces/comments";
import { colors } from "@/styles/colors";

interface CommentItemProps {
  comment: Comment;
  formatRating: (rating: string) => string;
  formatName: (name: string) => string;
}

export function CommentItem({
  comment,
  formatRating,
  formatName,
}: CommentItemProps) {
  return (
    <View className="bg-white p-4 mb-3 rounded-lg">
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center flex-1">
          <View className="border-2 border-shape rounded-[6px] p-1 bg-shape">
            {comment.user.avatarUrl ? (
              <Image
                source={{ uri: comment.user.avatarUrl }}
                className="w-6 h-6"
                resizeMode="cover"
              />
            ) : (
              <Ionicons name="person" color={colors.white} size={24} />
            )}
          </View>
          <Text className="text-base font-medium text-gray-800 ml-3 flex-1">
            {formatName(comment.user.name)}
          </Text>
        </View>

        <View className="flex-row items-end">
          <Ionicons
            name="star"
            size={16}
            className="mr-1"
            color={colors["blue-base"]}
          />
          <Text className="text-sm font-bold">
            {comment.user.rating.value} / <Text className="text-[10px]">5</Text>
          </Text>
        </View>
      </View>

      <Text className="text-gray-700 text-base leading-5 mb-2">
        {comment.content}
      </Text>
    </View>
  );
}
