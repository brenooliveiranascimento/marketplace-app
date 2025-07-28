import { AppModal } from "@/shared/components";
import { AppBottomSheet } from "@/shared/components/AppBottomSheet";
import { useUserStore } from "@/store/userStore";
import { Redirect, Stack } from "expo-router";

export default function PrivateLayout() {
  const { isAuthenticated } = useUserStore();

  if (!isAuthenticated) {
    return <Redirect href={"/login"} />;
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }} initialRouteName="(tabs)">
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="product/[id]" options={{ headerShown: false }} />
      </Stack>
      <AppBottomSheet />
      <AppModal />
    </>
  );
}
