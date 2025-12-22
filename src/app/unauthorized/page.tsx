"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";

const Unauthorized: React.FC = () => {
  const router = useRouter();

  return (
    <div className="flex-center min-vh-100 bg-neutral-10">
      <div className="bg-white box-shadow-lg p-40 rounded-16 text-center">
        <div className="animation-rotation mb-24">
          <i
            className="ph ph-lock text-danger-600"
            style={{ fontSize: 48 }}
          ></i>
        </div>
        <h1 className="h2 text-heading mb-16">Yetkisiz Erişim</h1>
        <p className="text-lg text-neutral-600 mb-32">
          Bu sayfaya erişim izniniz yok. Lütfen giriş yapın veya ana sayfaya
          dönün.
        </p>
        <div className="d-flex justify-content-center gap-16">
          <Button
            variant="outline"
            onClick={() => window.history.go(-2)}
            leftIcon="ph-arrow-left"
          >
            Geri Dön
          </Button>
          <Button href="/auth/login" variant="inline">
            Giriş Yap
          </Button>
          <Button href="/" variant="outline">
            Ana Sayfa
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
