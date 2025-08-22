import React from "react";
import { useFormHook } from "@/hooks";

export default function FormDebugErrors() {
  const { errors } = useFormHook();
  const errorCount = Object.keys(errors).filter((key) => errors[key]).length;

  return (
    <div className="bg-gradient-to-br from-red-50 to-pink-100 border-2 border-red-200 rounded-lg p-6 shadow-md h-[600px]">
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            errorCount > 0 ? "bg-red-500" : "bg-green-500"
          }`}
        >
          <span className="text-white text-base">
            {errorCount > 0 ? "⚠️" : "✅"}
          </span>
        </div>
        <div className="flex-1">
          <h3 className="text-base font-bold text-red-800">
            Validasyon Durumu
          </h3>
          <div className="flex items-center gap-2">
            <span
              className={`inline-block w-3 h-3 rounded-full ${
                errorCount > 0 ? "bg-red-500 animate-pulse" : "bg-green-500"
              }`}
            ></span>
            <span
              className={`text-sm font-medium ${
                errorCount > 0 ? "text-red-600" : "text-green-600"
              }`}
            >
              {errorCount > 0
                ? `${errorCount} Hata Bulundu`
                : "Tüm alanlar geçerli"}
            </span>
          </div>
        </div>
      </div>
      <div className="bg-white/70 backdrop-blur-sm rounded p-4 border border-red-200 h-[520px] overflow-y-auto">
        {errorCount > 0 ? (
          <div className="space-y-4">
            {Object.entries(errors).map(
              ([field, error]) =>
                error && (
                  <div
                    key={field}
                    className="flex items-start gap-4 p-4 bg-red-50 rounded-lg border border-red-200"
                  >
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">!</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-base font-semibold text-red-700 uppercase mb-2 tracking-wide">
                        {field}
                      </div>
                      <div className="text-base text-red-600 leading-relaxed">
                        {error}
                      </div>
                    </div>
                  </div>
                )
            )}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">🎉</div>
            <p className="text-green-600 text-xl font-medium mb-3">Mükemmel!</p>
            <p className="text-green-500 text-base mb-6">
              Tüm form alanları doğru şekilde dolduruldu
            </p>
            <div className="bg-green-100 rounded-lg p-4 text-green-700 text-sm max-w-sm mx-auto space-y-2">
              <p className="font-semibold">✓ Başarılı validasyonlar:</p>
              <p>✓ Tüm zorunlu alanlar tamamlandı</p>
              <p>✓ E-posta formatı doğru</p>
              <p>✓ Yaş aralığı uygun</p>
              <p>✓ Karakter sınırları sağlandı</p>
              <p>✓ Kategori seçimi yapıldı</p>
              <p>✓ Kullanım şartları kabul edildi</p>
              <p className="mt-3 font-semibold text-green-800">
                🚀 Form gönderime hazır!
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="mt-3 text-sm text-center font-medium">
        <span className={errorCount > 0 ? "text-red-600" : "text-green-600"}>
          {errorCount > 0
            ? "Hataları düzeltin ve tekrar deneyin"
            : "Form başarıyla doğrulandı 🚀"}
        </span>
      </div>
    </div>
  );
}
