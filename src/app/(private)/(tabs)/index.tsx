import { HomeView } from "@/ViewModels/Home/HomeView";
import { useHomeModel } from "@/ViewModels/Home/useHomeModel";
import React from "react";

export default function HomeScreen() {
  const homeModel = useHomeModel();

  return <HomeView {...homeModel} />;
}
