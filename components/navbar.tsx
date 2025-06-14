import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="relative h-[72px] mb-8 mt-12 mx-4 flex justify-center items-center">
      <Image
        src={"/isologo.png"}
        alt="Isologo Tormenta Rainwear"
        width={500}
        height={0}
        onClick={() => router.push("/")}
        className="cursor-pointer"
      />
    </nav>
  );
};

export default Navbar;
