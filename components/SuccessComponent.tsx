"use client";

import React from "react";
import OutlineShadowButton from "./OutlineShadowButton";
import { ShoppingBasket } from "lucide-react";
import { useCart } from "@/store/cart";

const SuccessComponent = () => {
  const items = useCart((state) => state.items);
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <div className="flex flex-col gap-4">
      <h1 style={{ fontFamily: "var(--font-impact)" }} className="text-5xl">
        Gracias por tu compra!
      </h1>
      <h3 style={{ fontFamily: "var(--font-franklin)" }} className="text-3xl">
        Te enviamos un mail con todos los detalles del envío.
      </h3>
      <h3 style={{ fontFamily: "var(--font-franklin)" }} className="text-3xl">
        Ante cualquier duda o consulta, escribe a hola@tormenta.mx
      </h3>
      <OutlineShadowButton
        // onClick={() => router.push("/cart")}
        className="bg-emerald-700"
      >
        <div className="flex items-center gap-2">
          <ShoppingBasket />
          <span>{totalQuantity}</span>
        </div>
      </OutlineShadowButton>
    </div>
  );
};

export default SuccessComponent;
