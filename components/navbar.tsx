import React from "react";

const Navbar = () => {
  return (
    <nav className="relative inline-block leading-none h-[72px] mb-16">
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
      <h1
        className="text-[4.7rem] md:text-9xl uppercase"
        style={{ fontFamily: "var(--font-franklin)" }}
      >
        tormenta
      </h1>
    </nav>
  );
};

export default Navbar;
