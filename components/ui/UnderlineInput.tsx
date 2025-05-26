import React from "react";

interface UnderlineInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const UnderlineInput = ({
  label,
  className,
  ...props
}: UnderlineInputProps) => {
  return (
    <div className="w-full">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <input
        {...props}
        className={`w-full border-b border-gray-400 focus:outline-none focus:border-black bg-transparent py-2 transition-all ${className}`}
      />
    </div>
  );
};

export default UnderlineInput;
