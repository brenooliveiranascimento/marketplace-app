import React, { useEffect } from "react";
import { router } from "expo-router";
import { useUserStore } from "../store/userStore";
import { useRegisterModel } from "@/ViewModels/Register/useRegisterModel";
import { RegisterView } from "@/ViewModels/Register/RegisterView";

export default function RegisterScreen() {
  const viewProps = useRegisterModel();
  const { isAuthenticated } = useUserStore();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/(tabs)");
    }
  }, [isAuthenticated]);

  return <RegisterView {...viewProps} />;
}
