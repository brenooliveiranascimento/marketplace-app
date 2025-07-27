import React, { useEffect } from "react";
import { Redirect, router, useNavigation } from "expo-router";
import { useUserStore } from "../store/userStore";
import { useLoginModel } from "@/ViewModels/Login/useLoginModel";
import { LoginView } from "@/ViewModels/Login/LoginView";

export default function LoginScreen() {
  const viewProps = useLoginModel();
  const { isAuthenticated } = useUserStore();

  if (isAuthenticated) {
    return <Redirect href={"(private)"} />;
  }

  return <LoginView {...viewProps} />;
}
