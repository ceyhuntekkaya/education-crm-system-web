"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import CustomCard from "@/components/ui/custom-card";
import { HEADER_CONFIG } from "@/components/layouts/header/config";

/**
 * Register Page
 * Kurum veya veli kayıt seçimi yapılır
 */
const RegisterPage: React.FC = () => {
  const router = useRouter();

  const handleInstitutionRegister = () => {
    router.push("/auth/register/institution");
  };

  const handleUserRegister = () => {
    router.push("/auth/register/user");
  };

  return (
    <div className="account py-40 position-relative">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-xl-10">
            {/* Başlık Bölümü */}
            <div className="text-center mb-48">
              <div className="d-flex justify-content-center mb-24">
                <Image
                  src={HEADER_CONFIG.LOGO_PATH}
                  alt="Eğitim İşte Logo"
                  width={160}
                  height={53}
                  priority
                />
              </div>
              <h1 className="h2 text-neutral-900 mb-12">Kayıt Ol</h1>
              <p className="text-lg text-neutral-600">
                Hesap türünüzü seçerek kayıt işlemine başlayın
              </p>
            </div>

            {/* Seçim Kartları */}
            <div className="row g-24 mb-40">
              {/* Kurum Kaydı */}
              <div className="col-12 col-md-6">
                <CustomCard>
                  <div className="p-32">
                    <div className="text-center">
                      <div className="mb-32">
                        <div
                          className="d-inline-flex align-items-center justify-content-center bg-main-600 text-white rounded-circle"
                          style={{ width: "80px", height: "80px" }}
                        >
                          <i
                            className="ph-fill ph-buildings"
                            style={{ fontSize: "40px" }}
                          ></i>
                        </div>
                      </div>
                      <h3 className="h4 text-neutral-900 mb-16">Kurum Kaydı</h3>
                      <p className="text-neutral-600 mb-32">
                        Eğitim kurumu olarak sisteme kayıt olun. Kampüs
                        bilgilerinizi ekleyin ve paket seçimi yapın.
                      </p>
                      <div className="d-flex flex-column gap-12 mb-32">
                        <div className="d-flex align-items-center gap-8 text-start">
                          <i
                            className="ph-check-circle text-success-600"
                            style={{ fontSize: "20px" }}
                          ></i>
                          <span className="text-sm text-neutral-700">
                            Kampüs yönetimi
                          </span>
                        </div>
                        <div className="d-flex align-items-center gap-8 text-start">
                          <i
                            className="ph-check-circle text-success-600"
                            style={{ fontSize: "20px" }}
                          ></i>
                          <span className="text-sm text-neutral-700">
                            Paket seçenekleri
                          </span>
                        </div>
                        <div className="d-flex align-items-center gap-8 text-start">
                          <i
                            className="ph-check-circle text-success-600"
                            style={{ fontSize: "20px" }}
                          ></i>
                          <span className="text-sm text-neutral-700">
                            Ödeme entegrasyonu
                          </span>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="inline"
                        fullWidth
                        rightIcon="ph-arrow-right"
                        onClick={handleInstitutionRegister}
                      >
                        Kurum Kaydı Yap
                      </Button>
                    </div>
                  </div>
                </CustomCard>
              </div>

              {/* Veli Kaydı */}
              <div className="col-12 col-md-6">
                <CustomCard>
                  <div className="p-32">
                    <div className="text-center">
                      <div className="mb-32">
                        <div
                          className="d-inline-flex align-items-center justify-content-center bg-success-600 text-white rounded-circle"
                          style={{ width: "80px", height: "80px" }}
                        >
                          <i
                            className="ph-fill ph-user-circle"
                            style={{ fontSize: "40px" }}
                          ></i>
                        </div>
                      </div>
                      <h3 className="h4 text-neutral-900 mb-16">Veli Kaydı</h3>
                      <p className="text-neutral-600 mb-32">
                        Veli olarak sisteme kayıt olun. Hızlı kayıt ile
                        doğrulama sonrası işlemlerinize başlayın.
                      </p>
                      <div className="d-flex flex-column gap-12 mb-32">
                        <div className="d-flex align-items-center gap-8 text-start">
                          <i
                            className="ph-check-circle text-success-600"
                            style={{ fontSize: "20px" }}
                          ></i>
                          <span className="text-sm text-neutral-700">
                            Hızlı kayıt
                          </span>
                        </div>
                        <div className="d-flex align-items-center gap-8 text-start">
                          <i
                            className="ph-check-circle text-success-600"
                            style={{ fontSize: "20px" }}
                          ></i>
                          <span className="text-sm text-neutral-700">
                            E-posta doğrulama
                          </span>
                        </div>
                        <div className="d-flex align-items-center gap-8 text-start">
                          <i
                            className="ph-check-circle text-success-600"
                            style={{ fontSize: "20px" }}
                          ></i>
                          <span className="text-sm text-neutral-700">
                            Anında başlayın
                          </span>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="success"
                        fullWidth
                        rightIcon="ph-arrow-right"
                        onClick={handleUserRegister}
                      >
                        Veli Kaydı Yap
                      </Button>
                    </div>
                  </div>
                </CustomCard>
              </div>
            </div>

            {/* Alt Bilgi */}
            <div className="text-center mt-24">
              <p className="text-neutral-500">
                Zaten hesabınız var mı?{" "}
                <a
                  href="/auth/login"
                  className="text-main-600 fw-semibold hover-text-decoration-underline"
                >
                  Giriş Yapın
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
