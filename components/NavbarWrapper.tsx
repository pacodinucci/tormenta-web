"use client";

import { usePathname } from "next/navigation";
import Navbar from "./navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();

  // No renderizar el navbar si estamos en la raíz
  if (pathname === "/" || pathname.startsWith("/admin")) return null;

  return <Navbar />;
}
