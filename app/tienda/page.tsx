import Products from "@/components/Products";
import React from "react";

const TiendaPage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="w-full">
        <Products />
      </div>
    </div>
  );
};

export default TiendaPage;
