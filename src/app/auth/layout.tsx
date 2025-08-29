import { Footer, Header } from "@/components";
import React from "react";

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default AuthLayout;
