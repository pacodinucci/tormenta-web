"use client";

import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { LandingComponent } from "@/components/LandingComponent";
import { MobileLandingComponent } from "@/components/MobileLandingComponent";

export default function Home() {
  const isMobile = useIsMobile();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className=" flex flex-col items-center justify-center min-h-screen gap-4 max-w-[100dvw]">
      {isMobile ? <MobileLandingComponent /> : <LandingComponent />}
    </div>
  );
}
