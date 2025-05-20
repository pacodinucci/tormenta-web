import Image from "next/image";
import React from "react";

const StartComponent = () => {
  return (
    <div className="flex items-center justify-center pt-40">
      <Image src={"/logo.png"} alt="Logo Tormenta" width={300} height={0} />
    </div>
  );
};

export default StartComponent;
