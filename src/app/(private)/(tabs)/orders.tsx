import React from "react";
import { useOrdersModel } from "@/ViewModels/Orders/useOrdersModel";
import { OrdersView } from "@/ViewModels/Orders/OrdersView";

export default function Orders() {
  const model = useOrdersModel();

  return <OrdersView {...model} />;
}
