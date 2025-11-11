"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Register Page
 * Direkt olarak kurum kayıt sayfasına yönlendirir
 * Veli kaydı şu an için aktif değil
 */
const RegisterPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // Direkt institution kayıt sayfasına yönlendir
    router.push("/auth/register/institution");
  }, [router]);

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100">
      <div className="text-center">
        <div className="spinner-border text-main-600 mb-16" role="status">
          <span className="visually-hidden">Yükleniyor...</span>
        </div>
        <p className="text-neutral-600">Kayıt sayfasına yönlendiriliyorsunuz...</p>
      </div>
    </div>
  );
};

export default RegisterPage;
