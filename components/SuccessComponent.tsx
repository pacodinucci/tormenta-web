"use client";

import React from "react";
import { useSearchParams } from "next/navigation";

const SuccessComponent = () => {
  const params = useSearchParams();

  const orderNumber = params.get("orderNumber");

  return (
    <div className="flex flex-col gap-4 py-8">
      <h1 style={{ fontFamily: "var(--font-impact)" }} className="text-5xl">
        Gracias por tu compra!
      </h1>
      <div>
        <h3 style={{ fontFamily: "var(--font-franklin)" }} className="text-3xl">
          Tu número de órden es:
        </h3>
        <h3
          style={{ fontFamily: "var(--font-franklin)" }}
          className="text-3xl text-neutral-700"
        >
          {orderNumber}
        </h3>
      </div>
      <h3 style={{ fontFamily: "var(--font-franklin)" }} className="text-3xl">
        Recibirás un mail con todos los detalles del envío.
      </h3>
      <h3 style={{ fontFamily: "var(--font-franklin)" }} className="text-3xl">
        Ante cualquier duda o consulta, escribe a hola@tormenta.mx
      </h3>
    </div>
  );
};

export default SuccessComponent;
