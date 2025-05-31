"use client";

import LandingComponent from "@/components/LandingComponent";
// import Navbar from "@/components/navbar";
import StartComponent from "@/components/StartComponent";
import { useEffect, useState } from "react";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Espera a que el componente esté montado en el cliente
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className=" flex flex-col items-center justify-center min-h-screen gap-4 max-w-[100dvw]">
      {/* <Navbar /> */}
      <LandingComponent />
      <StartComponent />
    </div>
  );
}
