import React, { useRef, useEffect, useCallback, useState } from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useBottomSheetStore } from "@/store/bottomsheetStore";
import { colors } from "@/styles/colors";

export const AppBottomSheet: React.FC = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { isOpen, content, config, close } = useBottomSheetStore();
  const [isInitialized, setIsInitialized] = useState(false);

  const snapPoints = config?.snapPoints;

  const forceClose = useCallback(() => {
    bottomSheetRef.current?.close();
    setIsInitialized(false);
  }, []);

  const openBottomSheet = useCallback(() => {
    if (!isInitialized) {
      setIsInitialized(true);
    }

    bottomSheetRef.current?.close();

    setTimeout(() => {
      requestAnimationFrame(() => {
        bottomSheetRef.current?.snapToIndex(0);
      });
    }, 100);
  }, [isInitialized]);

  useEffect(() => {
    if (isOpen && content) {
      openBottomSheet();
    } else {
      forceClose();
    }
  }, [isOpen, content, openBottomSheet, forceClose]);

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        setIsInitialized(false);
        close();
      }
    },
    [close]
  );

  if (!content && !isOpen) {
    return null;
  }

  return (
    <>
      {isOpen && (
        <TouchableWithoutFeedback onPress={close}>
          <View className="absolute top-0 left-0 right-0 bottom-0 bg-black/70 z-1" />
        </TouchableWithoutFeedback>
      )}
      <BottomSheet
        ref={bottomSheetRef}
        enablePanDownToClose={config?.enablePanDownToClose !== false}
        onChange={handleSheetChanges}
        backgroundStyle={{
          backgroundColor: colors.background,
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          elevation: 9,
        }}
        style={{ zIndex: 2 }}
        snapPoints={snapPoints}
        index={-1}
        animateOnMount={true}
      >
        <BottomSheetScrollView className="flex-1 bg-background min-h-[400]">
          {content}
        </BottomSheetScrollView>
      </BottomSheet>
    </>
  );
};
