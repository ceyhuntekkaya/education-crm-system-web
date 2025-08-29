import Link from "next/link";

const Unauthorized: React.FC = () => {
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
          <Link href="/auth/login" className="btn btn-main px-32 py-16">
            Giriş Yap
          </Link>
          <Link href="/" className="btn btn-outline-main px-32 py-16">
            Ana Sayfa
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
