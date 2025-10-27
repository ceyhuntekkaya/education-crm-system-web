import React from "react";

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
