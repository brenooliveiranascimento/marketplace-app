import React from "react";
import { Modal, TouchableWithoutFeedback, View } from "react-native";
import { useModalStore } from "@/store/modalStore";

export const AppModal: React.FC = () => {
  const { isOpen, content, config, close } = useModalStore();

  if (!isOpen || !content) {
    return null;
  }

  return (
    <Modal
      visible={isOpen}
      animationType={config?.animationType}
      transparent={config?.transparent}
      statusBarTranslucent={config?.statusBarTranslucent}
      onRequestClose={close}
    >
      <TouchableWithoutFeedback onPress={close}>
        <View className="flex-1 bg-black/50 justify-center items-center px-6">
          <TouchableWithoutFeedback onPress={() => {}}>
            <View>{content}</View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
