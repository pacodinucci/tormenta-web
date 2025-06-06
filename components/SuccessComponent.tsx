import React from "react";

const SuccessComponent = () => {
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
    </div>
  );
};

export default SuccessComponent;
