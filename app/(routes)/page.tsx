"use client";

import LandingComponent from "@/components/LandingComponent";
import { useEffect, useState } from "react";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className=" flex flex-col items-center justify-center min-h-screen gap-4 max-w-[100dvw]">
      <LandingComponent />
    </div>
  );
}
