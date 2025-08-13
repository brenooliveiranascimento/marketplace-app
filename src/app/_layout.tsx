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
import { GestureHandlerRootView } from "react-native-gesture-handler";

const queryClient = new QueryClient();

export default function RootLayout() {
  useFonts({
    Lato_400Regular,
    Lato_700Bold,
  });

  return (
    <GestureHandlerRootView className="flex-1">
      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{ headerShown: false }} initialRouteName="login">
          <Stack.Screen name="(private)" />
          <Stack.Screen name="login" />
          <Stack.Screen name="register" />
          <Stack.Screen name="loading" />
        </Stack>
        <ToastManager
          duration={3000}
          animationInTiming={300}
          animationOutTiming={300}
          swipeEnabled={true}
          swipeDirection="up"
          offsetTop={50}
          offsetBottom={50}
          hasBackdrop={false}
          backdropOpacity={0}
          backdropColor="transparent"
        />
        <StatusBar style="auto" />
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
