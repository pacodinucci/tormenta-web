import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex justify-center pt-24">{children}</div>;
};

export default AuthLayout;
