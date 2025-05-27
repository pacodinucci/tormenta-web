import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <nav className="relative h-[72px] mb-8 mt-12 mx-4 flex justify-center items-center">
      {/* <h1
        className="absolute top-0 left-0 text-6xl uppercase clip-top"
        style={{
          fontFamily: "var(--font-franklin)",
          overflow: "hidden",
          transform: "scaleY(1.2)",
        }}
      >
        tormenta
      </h1>

      <h1
        className="absolute top-0 left-[3px] text-6xl uppercase clip-bottom"
        style={{
          fontFamily: "var(--font-franklin)",
          overflow: "hidden",
          transform: "scaleY(1.2)",
        }}
      >
        tormenta
      </h1> */}
      {/* <h1
        className="text-[4.7rem] md:text-9xl uppercase text-center"
        style={{ fontFamily: "var(--font-franklin)" }}
      >
        tormenta
      </h1> */}
      <Image
        src={"/isologo.png"}
        alt="Isologo Tormenta Rainwear"
        width={500}
        height={0}
      />
    </nav>
  );
};

export default Navbar;
