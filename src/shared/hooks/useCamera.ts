import { useState, useCallback } from "react";
import * as ImagePicker from "expo-image-picker";
import { Toast } from "toastify-react-native";

interface UseCameraOptions {
  aspect?: [number, number];
  quality?: number;
  allowsEditing?: boolean;
  exif?: boolean;
}

interface UseCameraReturn {
  isLoading: boolean;
  openCamera: () => Promise<string | null>;
  requestCameraPermission: () => Promise<boolean>;
}

export const useCamera = (options: UseCameraOptions = {}): UseCameraReturn => {
  const {
    aspect = [1, 1],
    quality = 0.8,
    allowsEditing = true,
    exif = false,
  } = options;

  const [isLoading, setIsLoading] = useState(false);

  const requestCameraPermission = useCallback(async (): Promise<boolean> => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();

      if (status !== "granted") {
        Toast.error("Precisamos de permissão para acessar sua câmera", "top");
        return false;
      }
      return true;
    } catch (error) {
      Toast.error("Erro ao solicitar permissões da câmera", "top");
      return false;
    }
  }, []);

  const openCamera = useCallback(async (): Promise<string | null> => {
    try {
      setIsLoading(true);

      const hasPermission = await requestCameraPermission();
      if (!hasPermission) {
        return null;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing,
        aspect,
        quality,
        exif,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        Toast.success("Foto capturada com sucesso!", "top");
        return result.assets[0].uri;
      }

      return null;
    } catch (error) {
      Toast.error("Erro ao abrir câmera", "top");
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [aspect, quality, allowsEditing, exif, requestCameraPermission]);

  return {
    isLoading,
    openCamera,
    requestCameraPermission,
  };
};
