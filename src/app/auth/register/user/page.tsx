"use client";

import React from "react";
import { Icon, Button } from "@/components";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RegisterForm } from "../_shared/register-form";

/**
 * User (Parent/Guardian) Register Page
 * Veli kayıt sayfası - 4 adımlı kayıt süreci
 * Kurum kaydından farklı olarak kampüs bilgileri, paket seçimi ve ödeme bilgileri adımları yok
 */
const UserRegisterPage: React.FC = () => {
  const router = useRouter();

  return (
    <div className="register-page user-register-page">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-40">
          <div className="d-flex align-items-center justify-content-center gap-12 mb-16">
            <Icon
              icon="ph-users-three"
              className="text-danger-600"
              style={{ fontSize: "32px" }}
            />
            <h2 className="mb-0">Veli Kaydı</h2>
          </div>
          <p className="text-neutral-600 mb-0">
            Hızlı kayıt için 4 adımlı süreci tamamlayın
          </p>
        </div>

        {/* Register Form - user type */}
        <RegisterForm registrationType="user" />

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
