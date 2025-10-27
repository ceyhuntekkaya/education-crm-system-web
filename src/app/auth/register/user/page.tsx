"use client";

import React from "react";
import { CustomCard, Icon, Button } from "@/components";
import Link from "next/link";
import { useRouter } from "next/navigation";

/**
 * User (Parent/Guardian) Register Page
 * Veli kayıt sayfası - Geçici sayfa
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
              className="text-danger-600 header-icon"
            />
            <h2 className="mb-0">Veli Kaydı</h2>
          </div>
          <p className="text-neutral-600 mb-0">
            Veli kayıt formu yakında eklenecektir
          </p>
        </div>

        {/* Temporary Content */}
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <CustomCard padding="p-40" borderRadius="rounded-16">
              <div className="text-center">
                {/* Icon */}
                <div className="coming-soon-icon-container d-inline-flex align-items-center justify-content-center mb-24">
                  <Icon icon="ph-wrench" className="text-danger-600 icon-xl" />
                </div>

                {/* Title */}
                <h3 className="mb-16">Geliştirme Aşamasında</h3>

                {/* Description */}
                <p className="text-neutral-600 mb-32">
                  Veli kayıt formu şu anda geliştirilme aşamasındadır. Kısa süre
                  içinde kullanıma sunulacaktır.
                </p>

                {/* Features Coming Soon */}
                <div className="text-start mb-32">
                  <h5 className="mb-16">Yakında Eklenecek Özellikler:</h5>
                  <ul className="list-unstyled">
                    <li className="d-flex align-items-center mb-12">
                      <Icon
                        icon="ph-check-circle"
                        className="text-success-600 me-12 flex-shrink-0 feature-icon"
                      />
                      <span className="text-neutral-700">
                        Basit ve hızlı kayıt formu
                      </span>
                    </li>
                    <li className="d-flex align-items-center mb-12">
                      <Icon
                        icon="ph-check-circle"
                        className="text-success-600 me-12 flex-shrink-0 feature-icon"
                      />
                      <span className="text-neutral-700">
                        Çocuk bilgilerini ekleme
                      </span>
                    </li>
                    <li className="d-flex align-items-center mb-12">
                      <Icon
                        icon="ph-check-circle"
                        className="text-success-600 me-12 flex-shrink-0 feature-icon"
                      />
                      <span className="text-neutral-700">
                        Kurumları arama ve bağlantı kurma
                      </span>
                    </li>
                    <li className="d-flex align-items-center">
                      <Icon
                        icon="ph-check-circle"
                        className="text-success-600 me-12 flex-shrink-0 feature-icon"
                      />
                      <span className="text-neutral-700">
                        E-posta doğrulama
                      </span>
                    </li>
                  </ul>
                </div>

                {/* CTA Buttons */}
                <div className="d-flex gap-12 justify-content-center flex-wrap">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push("/auth/register")}
                    leftIcon="ph-arrow-left"
                  >
                    Geri Dön
                  </Button>
                  <Button
                    variant="inline"
                    size="sm"
                    onClick={() => router.push("/auth/register/institution")}
                    rightIcon="ph-arrow-right"
                  >
                    Kurum Kaydı Yap
                  </Button>
                </div>
              </div>
            </CustomCard>
          </div>
        </div>

        {/* Footer Link */}
        <div className="text-center mt-32 pt-24 border-top">
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
