"use client";

import React from "react";
import { Button, ToastContainer } from "@/components/ui";
import { useToast } from "@/hooks";

const ToastExamples: React.FC = () => {
  const toast = useToast();

  const showSequentialToasts = () => {
    toast.info("İşlem başlatıldı", "Lütfen bekleyin...");

    setTimeout(() => {
      toast.success("İlk adım tamamlandı", "Bir sonraki adıma geçiliyor...");
    }, 1000);

    setTimeout(() => {
      toast.warning("Dikkat!", "Bu adım kritik, dikkatli olun.");
    }, 2000);

    setTimeout(() => {
      toast.success("Tüm işlemler tamamlandı!", "Başarıyla sonuçlandı.");
    }, 3000);
  };

  const showPersistentToast = () => {
    toast.addToast({
      type: "info",
      title: "Kalıcı Bildirim",
      message: "Bu bildirim otomatik kapanmaz.",
      duration: 0, // Otomatik kapanmaz
    });
  };

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Toast Komponenti
      </h2>
      <div className="space-y-6">
        {/* Basic Toasts */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-3">
            Temel Toast Türleri
          </h3>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="primary"
              onClick={() =>
                toast.success("Başarılı!", "İşlem başarıyla tamamlandı.")
              }
            >
              Başarı Toast
            </Button>

            <Button
              variant="danger"
              onClick={() =>
                toast.error("Hata!", "Beklenmeyen bir hata oluştu.")
              }
            >
              Hata Toast
            </Button>

            <Button
              variant="outline"
              onClick={() => toast.warning("Uyarı!", "Bu işlem geri alınamaz.")}
            >
              Uyarı Toast
            </Button>

            <Button
              variant="secondary"
              onClick={() => toast.info("Bilgi", "Yeni güncelleme mevcut.")}
            >
              Bilgi Toast
            </Button>
          </div>
        </div>

        {/* Toast with Actions */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-3">
            Aksiyonlu Toastlar
          </h3>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              onClick={() =>
                toast.info("Güncelleme Hazır", "Yeni sürüm indirilebilir.", {
                  action: {
                    label: "Şimdi Güncelle",
                    onClick: () => {
                      toast.success("Güncelleme başlatıldı!");
                    },
                  },
                  duration: 10000, // 10 saniye
                })
              }
            >
              Güncelleme Toast
            </Button>

            <Button
              variant="outline"
              onClick={() =>
                toast.warning(
                  "Oturum Süresi",
                  "Oturumunuz yakında sona erecek.",
                  {
                    action: {
                      label: "Uzat",
                      onClick: () => {
                        toast.success("Oturum uzatıldı!");
                      },
                    },
                    duration: 8000,
                  }
                )
              }
            >
              Oturum Uyarısı
            </Button>

            <Button
              variant="outline"
              onClick={() =>
                toast.error("Bağlantı Hatası", "Sunucuya bağlanılamıyor.", {
                  action: {
                    label: "Yeniden Dene",
                    onClick: () => {
                      toast.info("Yeniden deneniyor...");
                      setTimeout(() => {
                        toast.success("Bağlantı kuruldu!");
                      }, 2000);
                    },
                  },
                  duration: 0, // Kalıcı
                })
              }
            >
              Bağlantı Hatası
            </Button>
          </div>
        </div>

        {/* Advanced Examples */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-3">
            Gelişmiş Örnekler
          </h3>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" onClick={showSequentialToasts}>
              Sıralı Toastlar
            </Button>

            <Button variant="outline" onClick={showPersistentToast}>
              Kalıcı Toast
            </Button>

            <Button
              variant="outline"
              onClick={() => {
                // Hızlı toast'lar
                for (let i = 1; i <= 5; i++) {
                  setTimeout(() => {
                    toast.info(`Toast ${i}`, `Bu ${i}. toast mesajıdır.`);
                  }, i * 500);
                }
              }}
            >
              Çoklu Toast
            </Button>

            <Button variant="ghost" onClick={() => toast.clearAllToasts()}>
              Tümünü Temizle
            </Button>
          </div>
        </div>

        {/* Different Durations */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-3">
            Farklı Süreler
          </h3>
          <div className="flex flex-wrap gap-3">
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                toast.success("Hızlı Toast", "Bu toast hızlıca kaybolur.", {
                  duration: 2000,
                })
              }
            >
              2 Saniye
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                toast.info("Orta Toast", "Bu toast orta sürede kalır.", {
                  duration: 5000,
                })
              }
            >
              5 Saniye
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                toast.warning("Uzun Toast", "Bu toast daha uzun süre kalır.", {
                  duration: 10000,
                })
              }
            >
              10 Saniye
            </Button>
          </div>
        </div>

        {/* Real-world Examples */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-3">
            Gerçek Kullanım Senaryoları
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium mb-2">Form Gönderimi</h4>
              <Button
                fullWidth
                onClick={() => {
                  toast.info("Form gönderiliyor...", "Lütfen bekleyin.");
                  setTimeout(() => {
                    toast.success(
                      "Form başarıyla gönderildi!",
                      "E-posta adresinize onay mesajı gönderildi."
                    );
                  }, 2000);
                }}
              >
                Form Gönder
              </Button>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium mb-2">Dosya Yükleme</h4>
              <Button
                fullWidth
                variant="secondary"
                onClick={() => {
                  toast.info("Dosya yükleniyor...", "0% tamamlandı.");

                  let progress = 0;
                  const interval = setInterval(() => {
                    progress += 20;
                    if (progress <= 80) {
                      toast.info(
                        "Dosya yükleniyor...",
                        `${progress}% tamamlandı.`
                      );
                    } else {
                      clearInterval(interval);
                      toast.success(
                        "Dosya yüklendi!",
                        "Dosyanız başarıyla yüklendi."
                      );
                    }
                  }, 1000);
                }}
              >
                Dosya Yükle
              </Button>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium mb-2">Veri Kaydetme</h4>
              <Button
                fullWidth
                variant="outline"
                onClick={() => {
                  toast.info("Veriler kaydediliyor...");
                  setTimeout(() => {
                    if (Math.random() > 0.3) {
                      toast.success(
                        "Veriler kaydedildi!",
                        "Tüm değişiklikler başarıyla kaydedildi."
                      );
                    } else {
                      toast.error(
                        "Kaydetme hatası!",
                        "Veriler kaydedilemedi, lütfen tekrar deneyin.",
                        {
                          action: {
                            label: "Tekrar Dene",
                            onClick: () => toast.info("Tekrar deneniyor..."),
                          },
                        }
                      );
                    }
                  }, 1500);
                }}
              >
                Kaydet
              </Button>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium mb-2">Silme İşlemi</h4>
              <Button
                fullWidth
                variant="danger"
                onClick={() => {
                  toast.warning("Emin misiniz?", "Bu işlem geri alınamaz.", {
                    action: {
                      label: "Evet, Sil",
                      onClick: () => {
                        toast.info("Siliniyor...");
                        setTimeout(() => {
                          toast.success("Silindi!", "Öğe başarıyla silindi.");
                        }, 1000);
                      },
                    },
                    duration: 8000,
                  });
                }}
              >
                Sil
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <h3 className="font-semibold mb-2">Kullanım:</h3>
        <pre className="text-sm text-gray-700 overflow-x-auto">
          {`import { ToastContainer } from '@/components/ui';
import { useToast } from '@/hooks';

const MyComponent = () => {
  const toast = useToast();

  // Basit kullanım
  toast.success('Başlık', 'Mesaj');
  toast.error('Hata', 'Hata mesajı');
  toast.warning('Uyarı', 'Uyarı mesajı');
  toast.info('Bilgi', 'Bilgi mesajı');

  // Gelişmiş kullanım
  toast.addToast({
    type: 'success',
    title: 'Başlık',
    message: 'Mesaj',
    duration: 5000,
    action: {
      label: 'Aksiyon',
      onClick: () => console.log('Tıklandı')
    }
  });

  return (
    <div>
      {/* Sayfanın sonunda */}
      <ToastContainer 
        toasts={toast.toasts} 
        onRemove={toast.removeToast} 
      />
    </div>
  );
};`}
        </pre>
      </div>

      {/* Toast Container - Bu örnekte görünen toast'lar için */}
      <ToastContainer toasts={toast.toasts} onRemove={toast.removeToast} />
    </section>
  );
};

export default ToastExamples;
