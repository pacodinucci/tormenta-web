import React from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface OutlineShadowButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export default function OutlineShadowButton({
  children,
  className,
  ...props
}: OutlineShadowButtonProps) {
  return (
    <div className="relative inline-block">
      <div className="absolute inset-0 translate-x-2 -translate-y-2 border border-gray-300 z-0" />
      <button
        {...props}
        className={clsx(
          "relative z-10 px-6 py-3 uppercase font-semibold text-white bg-black border-none tracking-wide",
          className
        )}
      >
        {children}
      </button>
    </div>
  );
}
