"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function FormExampleRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Yeni konuma yönlendir
    router.replace("/examples/forms");
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">🔄</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Sayfa Taşındı</h1>
        <p className="text-gray-600 mb-6">
          Form örneği yeni konumuna taşındı. Yönlendiriliyorsunuz...
        </p>
        <a
          href="/examples/forms"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          📝 Form Örneklerine Git
        </a>
      </div>
    </div>
  );
}
