import { Footer, Header } from "@/components";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Giriş",
  description: "Hesabınıza giriş yapın",
};

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="auth-layout d-flex flex-column min-vh-100">
      <Header />
      <main className="main-content flex-fill">{children}</main>
      <Footer />
    </div>
  );
};

export default AuthLayout;
