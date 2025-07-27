import { CartView } from "@/ViewModels/Cart/CartView";
import { useCartModel } from "@/ViewModels/Cart/useCartModel";

export default function Cart() {
  const cartModel = useCartModel();

  return <CartView {...cartModel} />;
}
