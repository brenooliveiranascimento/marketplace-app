import { useEffect } from "react";
import { router } from "expo-router";
import { useUserStore } from "@/store/userStore";

export const useSplashModel = () => {
  const { user } = useUserStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (user) {
        router.replace("/(tabs)");
      } else {
        router.replace("/login");
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [user]);

  return {};
};
