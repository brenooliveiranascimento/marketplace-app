import { Platform } from "react-native";
import Constants from "expo-constants";

const getBaseURL = () => {
  const isProduction = Constants.expoConfig?.extra?.isProduction || false;

  if (isProduction) {
    return process.env.EXPO_PUBLIC_API_URL_PROD;
  } else {
    return Platform.select({
      ios: "http://localhost:3001",
      android: "http://10.0.2.2:3001",
    });
  }
};

export const buildImageUrl = (path: string): string => {
  if (!path) return "";

  // Se já é uma URL completa, retorna como está
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  // Remove barra inicial se existir para evitar duplicação
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;

  // Concatena com a base URL
  const fullUrl = `${getBaseURL()}/${cleanPath}`;

  // Log para debug
  console.log("buildImageUrl:", { path, cleanPath, fullUrl });

  return fullUrl;
};
