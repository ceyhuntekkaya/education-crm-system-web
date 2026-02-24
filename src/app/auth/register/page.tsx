"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button, CustomCard } from "@/components/ui";
import { HEADER_CONFIG } from "@/components/layouts/header/config";

interface RegisterCardProps {
  title: string;
  description: string;
  icon: string;
  bgColor: string;
  features: string[];
  buttonText: string;
  buttonClass?: string;
  isComingSoon?: boolean;
  onClick?: () => void;
}

const RegisterCard: React.FC<RegisterCardProps> = ({
  title,
  description,
  icon,
  bgColor,
  features,
  buttonText,
  buttonClass,
  isComingSoon = false,
  onClick,
}) => {
  return (
    <CustomCard className="register-option-card h-100 w-100 position-relative overflow-hidden">
      <div className="register-card-wrapper">
        {isComingSoon && (
          <div
            className="position-absolute bg-warning-600 text-white px-12 py-4 fw-semibold"
            style={{
              top: "16px",
              right: "-32px",
              transform: "rotate(45deg)",
              width: "130px",
              textAlign: "center",
              zIndex: 10,
              fontSize: "11px",
            }}
          >
            Yakında
          </div>
        )}

        {/* Header Section */}
        <div className="register-card-header text-center px-20 pt-20 pb-12">
          <div
            className={`d-inline-flex align-items-center justify-content-center ${bgColor} text-white rounded-circle mb-12`}
            style={{ width: "56px", height: "56px" }}
          >
            <i className={`ph-fill ${icon}`} style={{ fontSize: "28px" }}></i>
          </div>
          <h3
            className={`h6 mb-8 ${isComingSoon ? "text-neutral-500" : "text-neutral-900"}`}
          >
            {title}
          </h3>
          <div className="register-card-description">
            <p
              className={`text-xs mb-0 ${isComingSoon ? "text-neutral-400" : "text-neutral-600"}`}
            >
              {description}
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="register-card-features px-20 py-12">
          <div className="d-flex flex-column gap-8 align-items-center">
            {features.map((feature, index) => (
              <div
                key={index}
                className="d-flex align-items-center gap-8 w-100 justify-content-center"
              >
                <i
                  className={`ph-fill ph-check-circle ${isComingSoon ? "text-neutral-400" : "text-success-600"}`}
                  style={{ fontSize: "14px", flexShrink: 0 }}
                ></i>
                <span
                  className={`text-xs ${isComingSoon ? "text-neutral-400" : "text-neutral-700"}`}
                >
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Button Section */}
        <div className="register-card-button-wrapper px-20 pb-20 pt-12">
          <Button
            type="button"
            variant={isComingSoon ? "outline" : "inline"}
            fullWidth
            rightIcon={isComingSoon ? "ph-clock" : "ph-arrow-right"}
            onClick={onClick}
            disabled={isComingSoon}
            className={buttonClass}
            size="xxs"
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </CustomCard>
  );
};

/**
 * Register Page
 * Kurum veya veli kayıt seçimi yapılır
 */
const RegisterPage: React.FC = () => {
  const router = useRouter();

  const registerOptions = [
    {
      title: "Eğitim Kurumu Kaydı",
      description:
        "Kurumunuzu sisteme kaydedin ve profesyonel araçlara erişim sağlayın",
      icon: "ph-buildings",
      bgColor: "bg-main-600",
      features: [
        "Kampüs yönetimi",
        "Öğrenci takibi",
        "Paket seçenekleri",
        "Raporlama & Analiz",
      ],
      buttonText: "Kurum Kaydına Başla",
      onClick: () => router.push("/auth/register/institution"),
    },
    {
      title: "Veli Kaydı",
      description:
        "Çocuğunuzun eğitim sürecini takip edin ve öğretmenlerle iletişime geçin",
      icon: "ph-user-circle",
      bgColor: "bg-neutral-300",
      features: [
        "Hızlı kayıt",
        "Öğrenci takibi",
        "Kolay iletişim",
        "Anında bildirimler",
      ],
      buttonText: "Yakında Açılacak",
      isComingSoon: true,
    },
    {
      title: "Öğretmen Kaydı",
      description:
        "Öğrencilerinizi yönetin, velilerle iletişime geçin ve eğitim sürecini takip edin",
      icon: "ph-chalkboard-teacher",
      bgColor: "bg-info-600",
      features: [
        "Sınıf yönetimi",
        "Öğrenci takibi",
        "Veli iletişimi",
        "Performans raporları",
      ],
      buttonText: "Öğretmen Kaydına Başla",
      buttonClass: "btn-info",
      onClick: () => router.push("/auth/register/teacher"),
    },
    {
      title: "Eğitmen Kaydı",
      description:
        "Kurslarınızı yönetin, katılımcılarla iletişime geçin ve eğitim materyallerini paylaşın",
      icon: "ph-presentation",
      bgColor: "bg-purple-600",
      features: [
        "Kurs yönetimi",
        "Katılımcı takibi",
        "İçerik paylaşımı",
        "Etkileşim analizi",
      ],
      buttonText: "Eğitmen Kaydına Başla",
      buttonClass: "btn-purple",
      onClick: () => router.push("/auth/register/instructor"),
    },
  ];

  return (
    <div className="account py-32 position-relative">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12">
            {/* Başlık Bölümü */}
            <div className="text-center mb-32">
              <div className="d-flex justify-content-center mb-16">
                <Image
                  src={HEADER_CONFIG.LOGO_PATH}
                  alt="Eğitim İste Logo"
                  width={160}
                  height={53}
                  priority
                />
              </div>
              <h1 className="h3 mb-12 text-neutral-900">
                Eğitim Yönetim Sistemi&apos;ne Hoş Geldiniz
              </h1>
              <p className="text-sm text-neutral-600">
                Hesap türünüzü seçerek hızlıca kayıt olun ve sistemin tüm
                özelliklerinden yararlanmaya başlayın
              </p>
            </div>

            {/* Seçim Kartları */}
            <div className="row register-cards-row g-3">
              {registerOptions.map((option, index) => (
                <div key={index} className="col-3 d-flex">
                  <RegisterCard {...option} />
                </div>
              ))}
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
