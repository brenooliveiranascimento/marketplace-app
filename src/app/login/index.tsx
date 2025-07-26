import React, { useEffect } from "react";
import { router, useNavigation } from "expo-router";
import { useUserStore } from "../../store/userStore";
import { useLoginModel } from "@/ViewModels/Login/useLoginModel";
import { LoginView } from "@/ViewModels/Login/LoginView";

export default function LoginScreen() {
  const viewProps = useLoginModel();
  const { isAuthenticated } = useUserStore();
  const navigate = useNavigation();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/(tabs)");
    }
  }, [isAuthenticated]);

  return <LoginView {...viewProps} />;
}
