"use client";

import React from "react";
import { Icon, Button } from "@/components";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RegisterForm } from "./_shared";
import { UserType } from "@/enums/UserType";

/**
 * User (Veli) Register Page
 */
const UserRegisterPage: React.FC = () => {
  const router = useRouter();

  return (
    <div className="register-page py-40">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-40 mt-24">
          <div className="d-flex align-items-center justify-content-center gap-12 mb-16">
            <Icon
              icon="ph-user-circle"
              className="text-success-600"
              style={{ fontSize: "32px" }}
            />
            <h2 className="mb-0">Veli Kaydı</h2>
          </div>
          <p className="text-neutral-600 mb-0">
            Hızlı kayıt ile doğrulama sonrası işlemlerinize başlayın
          </p>
        </div>

        {/* Register Form */}
        <RegisterForm registrationType={UserType.PARENT} />

        {/* Footer Links */}
        <div className="text-center mt-32 pt-24 border-top">
          <div className="mb-12">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/auth/register")}
              leftIcon="ph-arrow-left"
            >
              Kayıt Türü Seçimine Dön
            </Button>
          </div>
          <p className="text-neutral-600 mb-0">
            Zaten hesabınız var mı?{" "}
            <Link href="/auth/login" className="text-main-600 fw-semibold">
              Giriş Yapın
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserRegisterPage;
