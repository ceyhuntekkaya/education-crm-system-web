"use client";

import React from "react";
import { useSnackbar } from "@/contexts";
import Button from "@/components/ui/button";

/**
 * Snackbar Kullanım Örneği
 * 
 * Bu component snackbar sisteminin nasıl kullanılacağını gösterir.
 * API istekleri otomatik olarak snackbar gösterir,
 * ancak manuel kullanım için aşağıdaki örneklere bakabilirsiniz.
 */
export default function SnackbarExamples() {
  const { showSnackbar } = useSnackbar();

  const handleSuccess = () => {
    showSnackbar("İşlem başarıyla tamamlandı!", "success");
  };

  const handleError = () => {
    showSnackbar(
      "Bir hata oluştu. Lütfen tekrar deneyin.",
      "error"
    );
  };

  const handleWarning = () => {
    showSnackbar("Dikkat! Bu işlem geri alınamaz.", "warning");
  };

  const handleInfo = () => {
    showSnackbar("Bilgilendirme mesajı burada görünür.", "info");
  };

  const handleLongMessage = () => {
    showSnackbar(
      "Bu çok uzun bir mesaj örneğidir. Snackbar component'i uzun mesajları otomatik olarak wrap eder ve düzgün bir şekilde gösterir. Çok uzun mesajlar bile sorun olmaz.",
      "info",
      6000
    );
  };

  const handleMultiple = () => {
    showSnackbar("İlk bildirim", "info");
    setTimeout(() => showSnackbar("İkinci bildirim", "success"), 500);
    setTimeout(() => showSnackbar("Üçüncü bildirim", "warning"), 1000);
  };

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12">
          <h1 className="mb-4">Snackbar Örnekleri</h1>
          <p className="mb-4">
            Snackbar bildirimleri, kullanıcı eylemlerine anında geri bildirim
            sağlamak için kullanılır. Tüm API istekleri otomatik olarak uygun
            snackbar gösterir.
          </p>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-md-6 col-lg-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Başarı (Success)</h5>
              <p className="card-text">
                Başarılı işlemler için yeşil renk ve tik ikonu kullanılır.
              </p>
              <Button onClick={handleSuccess} className="btn btn-success w-100">
                Başarı Bildirimi Göster
              </Button>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Hata (Error)</h5>
              <p className="card-text">
                Hata durumları için kırmızı renk ve uyarı ikonu kullanılır.
              </p>
              <Button onClick={handleError} className="btn btn-danger w-100">
                Hata Bildirimi Göster
              </Button>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Uyarı (Warning)</h5>
              <p className="card-text">
                Dikkat edilmesi gereken durumlar için turuncu renk kullanılır.
              </p>
              <Button onClick={handleWarning} className="btn btn-warning w-100">
                Uyarı Bildirimi Göster
              </Button>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Bilgi (Info)</h5>
              <p className="card-text">
                Bilgilendirme mesajları için mavi renk kullanılır.
              </p>
              <Button onClick={handleInfo} className="btn btn-info w-100">
                Bilgi Bildirimi Göster
              </Button>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Uzun Mesaj</h5>
              <p className="card-text">
                Uzun mesajlar otomatik olarak wrap edilir ve daha uzun süre
                gösterilir.
              </p>
              <Button onClick={handleLongMessage} className="btn btn-primary w-100">
                Uzun Mesaj Göster
              </Button>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Çoklu Bildirimler</h5>
              <p className="card-text">
                Birden fazla bildirim aynı anda görüntülenebilir.
              </p>
              <Button onClick={handleMultiple} className="btn btn-secondary w-100">
                Çoklu Bildirim Göster
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Otomatik API Bildirimleri</h5>
              <p className="card-text">
                API istekleri otomatik olarak snackbar gösterir:
              </p>
              <ul>
                <li>
                  <strong>POST:</strong> &quot;İşlem başarıyla oluşturuldu&quot;
                </li>
                <li>
                  <strong>PUT/PATCH:</strong> &quot;İşlem başarıyla güncellendi&quot;
                </li>
                <li>
                  <strong>DELETE:</strong> &quot;İşlem başarıyla silindi&quot;
                </li>
                <li>
                  <strong>Hata:</strong> Backend&apos;den dönen hata mesajı
                  gösterilir
                </li>
              </ul>
              <div className="alert alert-info mb-0">
                <strong>Not:</strong> GET istekleri bildirim göstermez.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <div className="card bg-dark text-white">
            <div className="card-body">
              <h5 className="card-title">Kod Örnekleri</h5>
              <pre className="mb-0">
                <code>{`// Manuel kullanım
import { useSnackbar } from "@/contexts";

const { showSnackbar } = useSnackbar();

// Başarı bildirimi
showSnackbar("İşlem başarılı!", "success");

// Hata bildirimi
showSnackbar("Bir hata oluştu", "error");

// Uyarı bildirimi
showSnackbar("Dikkat!", "warning");

// Bilgi bildirimi
showSnackbar("Bilgilendirme", "info");

// Özel süre (ms)
showSnackbar("5 saniye göster", "info", 5000);`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
