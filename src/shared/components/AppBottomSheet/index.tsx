import React, { useRef, useEffect, useCallback, useState } from "react";
import { View, TouchableWithoutFeedback, Text } from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useBottomSheetStore } from "@/store/bottomsheetStore";
import { colors } from "@/styles/colors";

export const AppBottomSheet: React.FC = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { isOpen, content, config, close } = useBottomSheetStore();
  const [currentIndex, setCurrentIndex] = useState(-1);

  const snapPoints = config.snapPoints || ["70%", "90%"];

  useEffect(() => {
    if (isOpen && content) {
      setCurrentIndex(0);
      requestAnimationFrame(() => {
        bottomSheetRef.current?.snapToIndex(0);
      });
    } else {
      bottomSheetRef.current?.close();
      setCurrentIndex(-1);
    }
  }, [isOpen, content]);

  const handleSheetChanges = useCallback(
    (index: number) => {
      setCurrentIndex(index);
      if (index === -1) {
        close();
      }
    },
    [close]
  );

  return (
    <>
      {isOpen && (
        <TouchableWithoutFeedback onPress={close}>
          <View className="absolute top-0 left-0 right-0 bottom-0 bg-black/70 z-1" />
        </TouchableWithoutFeedback>
      )}
      <BottomSheet
        ref={bottomSheetRef}
        enablePanDownToClose={config.enablePanDownToClose}
        onChange={handleSheetChanges}
        backgroundStyle={{
          backgroundColor: colors["background"],
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          elevation: 9,
        }}
        style={{ zIndex: 2 }}
        snapPoints={snapPoints}
        index={currentIndex}
      >
        <BottomSheetScrollView className="flex-1 bg-background-secondary min-h-[400]">
          {content}
        </BottomSheetScrollView>
      </BottomSheet>
    </>
  );
};
