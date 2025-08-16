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

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const cleanPath = path.startsWith("/") ? path.slice(1) : path;

  const fullUrl = `${getBaseURL()}/${cleanPath}`;

  return fullUrl;
};
