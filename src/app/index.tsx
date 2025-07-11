import React, { useEffect } from "react";
import { router } from "expo-router";
import { useUserStore } from "../store/userStore";
import { useSplashModel } from "@/ViewModels/Splash/useSlashModel";
import { SplashView } from "@/ViewModels/Splash/SplashView";

export default function Index() {
  const { isAuthenticated } = useUserStore();
  useSplashModel();

  useEffect(() => {
    if (isAuthenticated) {
      const timer = setTimeout(() => {
        router.replace("/(tabs)");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated]);

  return <SplashView />;
}
