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
    <div>
      <h1
        className="text-5xl mb-4 ml-2"
        style={{ fontFamily: "var(--font-gobold)" }}
      >
        Revisa tu compra
      </h1>

      {cart.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          {cart.map((item) => {
            const price = Number(item.price);
            const quantity = item.quantity;

            // const discountedPrice =
            //   discount > 0 ? price * (1 - discount / 100) : price;

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
                        onClick={() => updateCartItem(item.id, quantity - 1)}
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
                        className="w-10 text-center bg-transparent focus:outline-none"
                      />
                      <button
                        onClick={() => updateCartItem(item.id, quantity + 1)}
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <div className="text-right">
                      {/* {discount > 0 && (
                      <p className="line-through text-sm text-gray-500">
                        {formatNumber(price * boxSize * quantity)}
                      </p>
                    )} */}
                      <p className="text-2xl font-semibold">
                        {formatNumber(price * quantity)}
                      </p>
                      {/* {discount > 0 && (
                      <p className="text-green-600 text-sm">
                        Ahorraste{" "}
                        {formatNumber((price - discountedPrice) * quantity)}
                      </p>
                    )} */}
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
          <div className="mt-8">
            <OutlineShadowButton
              className="min-w-[90vw]"
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
