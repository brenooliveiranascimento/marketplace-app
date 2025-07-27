import { useState, useCallback } from "react";
import { Alert, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Toast } from "toastify-react-native";

interface UseGalleryOptions {
  aspect?: [number, number];
  quality?: number;
  allowsEditing?: boolean;
  exif?: boolean;
}

interface UseGalleryReturn {
  isLoading: boolean;
  openGallery: () => Promise<string | null>;
  requestGalleryPermission: () => Promise<boolean>;
}

export const useGallery = (
  options: UseGalleryOptions = {}
): UseGalleryReturn => {
  const {
    aspect = [1, 1],
    quality = 0.8,
    allowsEditing = true,
    exif = false,
  } = options;

  const [isLoading, setIsLoading] = useState(false);

  const requestGalleryPermission = useCallback(async (): Promise<boolean> => {
    try {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== "granted") {
          Alert.alert(
            "Permissão Negada",
            "Precisamos de permissão para acessar sua galeria de fotos.",
            [
              { text: "Cancelar", style: "cancel" },
              {
                text: "Configurações",
                onPress: () => {
                  if (Platform.OS === "ios") {
                    Alert.alert(
                      "Como permitir acesso",
                      "Vá em Configurações > Privacidade e Segurança > Fotos e permita o acesso para este app."
                    );
                  }
                },
              },
            ]
          );
          return false;
        }
      }
      return true;
    } catch (error) {
      Toast.error("Erro ao solicitar permissões da galeria", "top");
      return false;
    }
  }, []);

  const openGallery = useCallback(async (): Promise<string | null> => {
    try {
      setIsLoading(true);

      const hasPermission = await requestGalleryPermission();
      if (!hasPermission) {
        return null;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing,
        aspect,
        quality,
        exif,
      });

      if (!result.canceled && result.assets[0]) {
        Toast.info("Imagem selecionada com sucesso!", "top");
        return result.assets[0].uri;
      }

      return null;
    } catch (error) {
      Toast.error("Erro ao abrir galeria de fotos", "top");
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [aspect, quality, allowsEditing, exif, requestGalleryPermission]);

  return {
    isLoading,
    openGallery,
    requestGalleryPermission,
  };
};
