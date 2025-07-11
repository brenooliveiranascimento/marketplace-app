import React, { useEffect } from "react";
import { router } from "expo-router";
import { useUserStore } from "../../store/userStore";
import { useLoginModel } from "@/ViewModels/Login/useLoginModel";
import { LoginView } from "@/ViewModels/Login/LoginView";

export default function LoginScreen() {
  const viewProps = useLoginModel();
  const { isAuthenticated } = useUserStore();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/(tabs)");
    }
  }, [isAuthenticated]);

  return <LoginView {...viewProps} />;
}
