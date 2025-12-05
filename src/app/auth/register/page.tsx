"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button, CustomCard } from "@/components/ui";
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
            <div className="text-center mb-40">
              <div className="d-flex justify-content-center mb-24">
                <Image
                  src={HEADER_CONFIG.LOGO_PATH}
                  alt="Eğitim İste Logo"
                  width={180}
                  height={60}
                  priority
                />
              </div>
              <h1 className="h2 mb-16 text-neutral-900">
                Eğitim Yönetim Sistemi&apos;ne Hoş Geldiniz
              </h1>
              <p className="text-neutral-600">
                Hesap türünüzü seçerek hızlıca kayıt olun ve sistemin tüm
                özelliklerinden yararlanmaya başlayın
              </p>
            </div>

            {/* Seçim Kartları */}
            <div className="row row-gap-24 mb-40">
              {/* Kurum Kaydı */}
              <div className="col-12 col-md-6">
                <CustomCard className="h-100">
                  <div className="d-flex flex-column h-100 p-24">
                    <div className="text-center mb-24">
                      <div
                        className="d-inline-flex align-items-center justify-content-center bg-main-600 text-white rounded-circle mb-20"
                        style={{ width: "80px", height: "80px" }}
                      >
                        <i
                          className="ph-fill ph-buildings"
                          style={{ fontSize: "40px" }}
                        ></i>
                      </div>
                      <h3 className="h5 text-neutral-900 mb-12">
                        Eğitim Kurumu Kaydı
                      </h3>
                      <p className="text-sm text-neutral-600">
                        Kurumunuzu sisteme kaydedin ve profesyonel araçlara
                        erişim sağlayın
                      </p>
                    </div>

                    {/* Özellikler */}
                    <div className="flex-grow-1 mb-24">
                      <div className="d-flex flex-column gap-12 align-items-center">
                        <div className="d-flex align-items-center gap-8">
                          <i
                            className="ph-fill ph-check-circle text-success-600"
                            style={{ fontSize: "18px" }}
                          ></i>
                          <span className="text-sm text-neutral-700">
                            Kampüs yönetimi
                          </span>
                        </div>
                        <div className="d-flex align-items-center gap-8">
                          <i
                            className="ph-fill ph-check-circle text-success-600"
                            style={{ fontSize: "18px" }}
                          ></i>
                          <span className="text-sm text-neutral-700">
                            Öğrenci takibi
                          </span>
                        </div>
                        <div className="d-flex align-items-center gap-8">
                          <i
                            className="ph-fill ph-check-circle text-success-600"
                            style={{ fontSize: "18px" }}
                          ></i>
                          <span className="text-sm text-neutral-700">
                            Paket seçenekleri
                          </span>
                        </div>
                        <div className="d-flex align-items-center gap-8">
                          <i
                            className="ph-fill ph-check-circle text-success-600"
                            style={{ fontSize: "18px" }}
                          ></i>
                          <span className="text-sm text-neutral-700">
                            Raporlama & Analiz
                          </span>
                        </div>
                      </div>
                    </div>

                    <Button
                      type="button"
                      variant="inline"
                      fullWidth
                      rightIcon="ph-arrow-right"
                      onClick={handleInstitutionRegister}
                    >
                      Kurum Kaydına Başla
                    </Button>
                  </div>
                </CustomCard>
              </div>

              {/* Veli Kaydı - Yakında Açılacak */}
              <div className="col-12 col-md-6">
                <CustomCard className="h-100 position-relative overflow-hidden">
                  <div className="d-flex flex-column h-100 p-24">
                    {/* Yakında Açılacak Badge */}
                    <div
                      className="position-absolute bg-warning-600 text-white px-16 py-6 text-xs fw-semibold"
                      style={{
                        top: "20px",
                        right: "-35px",
                        transform: "rotate(45deg)",
                        width: "150px",
                        textAlign: "center",
                      }}
                    >
                      Yakında
                    </div>

                    <div className="text-center mb-24">
                      <div
                        className="d-inline-flex align-items-center justify-content-center bg-neutral-300 text-neutral-500 rounded-circle mb-20"
                        style={{ width: "80px", height: "80px" }}
                      >
                        <i
                          className="ph-fill ph-user-circle"
                          style={{ fontSize: "40px" }}
                        ></i>
                      </div>
                      <h3 className="h5 text-neutral-500 mb-12">Veli Kaydı</h3>
                      <p className="text-sm text-neutral-400">
                        Çocuğunuzun eğitim sürecini takip edin ve öğretmenlerle
                        iletişime geçin
                      </p>
                    </div>

                    {/* Özellikler */}
                    <div className="flex-grow-1 mb-24">
                      <div className="d-flex flex-column gap-12 align-items-center">
                        <div className="d-flex align-items-center gap-8">
                          <i
                            className="ph-fill ph-check-circle text-neutral-400"
                            style={{ fontSize: "18px" }}
                          ></i>
                          <span className="text-sm text-neutral-400">
                            Hızlı kayıt
                          </span>
                        </div>
                        <div className="d-flex align-items-center gap-8">
                          <i
                            className="ph-fill ph-check-circle text-neutral-400"
                            style={{ fontSize: "18px" }}
                          ></i>
                          <span className="text-sm text-neutral-400">
                            Öğrenci takibi
                          </span>
                        </div>
                        <div className="d-flex align-items-center gap-8">
                          <i
                            className="ph-fill ph-check-circle text-neutral-400"
                            style={{ fontSize: "18px" }}
                          ></i>
                          <span className="text-sm text-neutral-400">
                            Kolay iletişim
                          </span>
                        </div>
                        <div className="d-flex align-items-center gap-8">
                          <i
                            className="ph-fill ph-check-circle text-neutral-400"
                            style={{ fontSize: "18px" }}
                          ></i>
                          <span className="text-sm text-neutral-400">
                            Anında bildirimler
                          </span>
                        </div>
                      </div>
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      fullWidth
                      rightIcon="ph-clock"
                      disabled
                    >
                      Yakında Açılacak
                    </Button>
                  </div>
                </CustomCard>
              </div>

              {/* TODO: Veli Kaydı aktif versiyonu - ileride açılacak */}
              {/* <div className="col-12 col-md-6">
                <CustomCard className="h-100">
                  <div className="d-flex flex-column h-100 p-24">
                    <div className="text-center mb-24">
                      <div
                        className="d-inline-flex align-items-center justify-content-center bg-success-600 text-white rounded-circle mb-20"
                        style={{ width: "80px", height: "80px" }}
                      >
                        <i
                          className="ph-fill ph-user-circle"
                          style={{ fontSize: "40px" }}
                        ></i>
                      </div>
                      <h3 className="h5 text-neutral-900 mb-12">Veli Kaydı</h3>
                      <p className="text-sm text-neutral-600">
                        Çocuğunuzun eğitim sürecini takip edin ve öğretmenlerle
                        iletişime geçin
                      </p>
                    </div>

                    <div className="flex-grow-1 mb-24">
                      <div className="d-flex flex-column gap-12 align-items-center">
                        <div className="d-flex align-items-center gap-8">
                          <i
                            className="ph-fill ph-check-circle text-success-600"
                            style={{ fontSize: "18px" }}
                          ></i>
                          <span className="text-sm text-neutral-700">
                            Hızlı kayıt
                          </span>
                        </div>
                        <div className="d-flex align-items-center gap-8">
                          <i
                            className="ph-fill ph-check-circle text-success-600"
                            style={{ fontSize: "18px" }}
                          ></i>
                          <span className="text-sm text-neutral-700">
                            Öğrenci takibi
                          </span>
                        </div>
                        <div className="d-flex align-items-center gap-8">
                          <i
                            className="ph-fill ph-check-circle text-success-600"
                            style={{ fontSize: "18px" }}
                          ></i>
                          <span className="text-sm text-neutral-700">
                            Kolay iletişim
                          </span>
                        </div>
                        <div className="d-flex align-items-center gap-8">
                          <i
                            className="ph-fill ph-check-circle text-success-600"
                            style={{ fontSize: "18px" }}
                          ></i>
                          <span className="text-sm text-neutral-700">
                            Anında bildirimler
                          </span>
                        </div>
                      </div>
                    </div>

                    <Button
                      type="button"
                      variant="success"
                      fullWidth
                      rightIcon="ph-arrow-right"
                      onClick={handleUserRegister}
                    >
                      Veli Kaydına Başla
                    </Button>
                  </div>
                </CustomCard>
              </div> */}
            </div>

            {/* Alt Bilgi */}
            <div className="text-center">
              <p className="text-neutral-500 mb-0">
                Zaten hesabınız var mı?{" "}
                <Link
                  href="/auth/login"
                  className="text-main-600 fw-semibold hover-text-decoration-underline"
                >
                  Giriş Yapın
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
