import { Redirect, Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import "../styles/global.css";
import {
  useFonts,
  Lato_400Regular,
  Lato_700Bold,
} from "@expo-google-fonts/lato";
import ToastManager, { Toast } from "toastify-react-native";
import { useUserStore } from "@/store/userStore";

const queryClient = new QueryClient();

export default function RootLayout() {
  useFonts({
    Lato_400Regular,
    Lato_700Bold,
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }} initialRouteName="login">
        <Stack.Screen name="(private)" />
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="loading" />
      </Stack>
      <ToastManager />
      <StatusBar style="auto" />
    </QueryClientProvider>
  );
}
