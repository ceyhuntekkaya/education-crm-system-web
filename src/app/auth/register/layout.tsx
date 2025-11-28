import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kayıt Ol",
  description: "Yeni hesap oluşturun",
};

/**
 * Register Main Layout
 * Ana kayıt layout'u - tüm register sayfaları için ortak wrapper
 * Alt sayfalar: /institution, /user
 */
const RegisterLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="auth-wrapper">
      <div className="auth-container">{children}</div>
    </div>
  );
};

export default RegisterLayout;
