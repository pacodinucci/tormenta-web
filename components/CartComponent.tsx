"use client";

import React, { useEffect } from "react";
import { useCart } from "@/store/cart";
import OutlineShadowButton from "./OutlineShadowButton";
import { formatNumber } from "@/lib/formatNumber";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CartComponent = () => {
  const router = useRouter();
  const cart = useCart((state) => state.items);
  const updateCartItem = useCart((state) => state.updateCartItem);
  const removeFromCart = useCart((state) => state.removeItem);

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="w-[90%] md:w-[60%] bg-white min-h-screen md:px-12">
      <h1
        className="text-5xl mb-4 ml-2"
        style={{ fontFamily: "var(--font-gobold)" }}
      >
        Revisa tu compra
      </h1>

      {cart.length === 0 ? (
        <div className="flex flex-col gap-y-4 items-center justify-center mt-24">
          <p style={{ fontFamily: "var(--font-mighty)" }}>
            Tu carrito está vacío.
          </p>
          <OutlineShadowButton onClick={() => router.push("/colors")}>
            Volver a la tienda
          </OutlineShadowButton>
        </div>
      ) : (
        <>
          {cart.map((item) => {
            const price = Number(item.price);
            const quantity = item.quantity;

            return (
              <div
                key={item.id}
                className="flex flex-row gap-2 items-start border-b border-slate-200 pb-4"
                style={{ fontFamily: "var(--font-baron" }}
              >
                <div className="flex items-center gap-x-4 w-auto">
                  <Image
                    src={item.image || ""}
                    alt={item.name}
                    width={100}
                    height={100}
                  />
                </div>

                <div className="flex flex-col justify-between gap-4 mt-4 md:mt-0 flex-1">
                  <div className="flex items-center justify-between pr-4">
                    <p className="text-2xl font-medium">{item.name}</p>
                  </div>
                  <div className="flex gap-4 items-center justify-between mr-4">
                    <p className="text-lg font-medium">Talla {item.size}</p>
                    <Trash2
                      className="cursor-pointer text-red-600 mt-1"
                      size={24}
                      onClick={() => removeFromCart(item.id)}
                    />
                  </div>
                  <div className="flex items-center justify-between pr-4">
                    <div className="flex items-center border border-gray-300 px-2 py-1">
                      <button
                        onClick={() => {
                          if (quantity > 1)
                            updateCartItem(item.id, quantity - 1);
                        }}
                        disabled={quantity <= 1}
                        className={
                          quantity <= 1 ? "opacity-50 cursor-not-allowed" : ""
                        }
                      >
                        <Minus size={16} />
                      </button>
                      <input
                        type="number"
                        value={quantity}
                        min={0}
                        onChange={(e) =>
                          updateCartItem(item.id, Number(e.target.value))
                        }
                        className="w-10 text-center bg-transparent focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]"
                      />
                      <button
                        onClick={() => updateCartItem(item.id, quantity + 1)}
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="text-2xl font-semibold">
                        {formatNumber(price * quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="flex justify-between items-center p-2 mt-6 mr-2 px-2 text-white bg-zinc-800">
            <p
              className="text-2xl font-semibold"
              style={{ fontFamily: "var(--font-baron)" }}
            >
              Total
            </p>
            <p
              className="text-2xl font-bold"
              style={{ fontFamily: "var(--font-baron)" }}
            >
              {formatNumber(total)}
            </p>
          </div>

          <div className="flex gap-x-2 mt-6">
            <input
              className="max-w-60 rounded-none outline-1"
              placeholder="Código del cupón"
            />
            <OutlineShadowButton className="rounded-none bg-darkCustom hover:bg-darkCustom/90">
              Aplicar cupón
            </OutlineShadowButton>
          </div>
          <div className="mt-8 justify-self-center">
            <OutlineShadowButton
              className="min-w-[90vw] md:min-w-[30vw]"
              onClick={() => router.push("/form")}
            >
              Continuar
            </OutlineShadowButton>
          </div>
        </>
      )}
    </div>
  );
};

export default CartComponent;
