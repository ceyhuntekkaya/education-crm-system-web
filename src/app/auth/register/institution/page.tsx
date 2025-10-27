"use client";

import React from "react";
import { Icon, Button } from "@/components";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RegisterForm } from "../_shared/register-form";

/**
 * Institution Register Page
 * Kurum kayıt sayfası - 6 adımlı kayıt süreci
 */
const InstitutionRegisterPage: React.FC = () => {
  const router = useRouter();

  return (
    <div className="register-page">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-40">
          <div className="d-flex align-items-center justify-content-center gap-12 mb-16">
            <Icon
              icon="ph-buildings"
              className="text-main-600"
              style={{ fontSize: "32px" }}
            />
            <h2 className="mb-0">Kurum Kaydı</h2>
          </div>
          <p className="text-neutral-600 mb-0">
            Tüm özelliklere erişmek için 6 adımlı kayıt sürecini tamamlayın
          </p>
        </div>

        {/* Register Form */}
        <RegisterForm />

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

export default InstitutionRegisterPage;
