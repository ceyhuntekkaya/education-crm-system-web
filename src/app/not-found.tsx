import { Button } from "@/components";

export default function NotFoundPage() {
  return (
    <div className="flex-center min-vh-100 bg-neutral-10">
      <div className="bg-white box-shadow-lg p-40 rounded-16 text-center">
        <div className="animation-upDown mb-24">
          <i
            className="ph ph-warning-circle text-warning-600"
            style={{ fontSize: 48 }}
          ></i>
        </div>
        <h1 className="display1 text-heading mb-16">404</h1>
        <h2 className="h3 text-heading mb-16">Sayfa Bulunamadı</h2>
        <p className="text-lg text-neutral-600 mb-32">
          Aradığınız sayfa bulunamadı veya kaldırılmış olabilir.
        </p>
        <Button href="/">Ana Sayfaya Dön</Button>
      </div>
    </div>
  );
}
