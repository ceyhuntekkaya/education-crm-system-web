import React from "react";
import { useFormHook } from "@/hooks";

export default function FormDebugValues() {
  const { values } = useFormHook();

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-blue-200 rounded-lg p-6 shadow-md h-[600px]">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
          <span className="text-white text-base">📊</span>
        </div>
        <h3 className="text-base font-bold text-blue-800">Form Verileri</h3>
      </div>
      <div className="bg-white/70 backdrop-blur-sm rounded p-4 border border-blue-200 h-[520px] overflow-y-auto">
        {Object.keys(values).length > 0 ? (
          <div className="space-y-4">
            {Object.entries(values).map(([key, value]) => (
              <div key={key} className="text-base">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-block w-3 h-3 bg-blue-500 rounded-full"></span>
                  <span className="font-semibold text-blue-700 uppercase tracking-wide">
                    {key}
                  </span>
                </div>
                <div className="ml-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                  <span className="text-base text-gray-700 font-mono break-all leading-relaxed">
                    {typeof value === "boolean"
                      ? value
                        ? "✅ true"
                        : "❌ false"
                      : value || "🔸 -"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">📋</div>
            <p className="text-blue-600 text-lg font-medium mb-3">
              Henüz veri girilmedi
            </p>
            <p className="text-blue-500 text-base mb-6">
              Form alanlarını doldurmaya başlayın
            </p>
            <div className="bg-blue-100 rounded-lg p-4 text-blue-700 text-sm max-w-xs mx-auto">
              <p className="mb-2">💡 İpucu:</p>
              <p>
                Formu doldurdukça burada değerler gerçek zamanlı olarak
                görünecek
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="mt-3 text-sm text-blue-600 text-center font-medium">
        Gerçek zamanlı güncellenir • Toplam: {Object.keys(values).length} alan
      </div>
    </div>
  );
}
