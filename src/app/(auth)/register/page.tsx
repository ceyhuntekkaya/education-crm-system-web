"use client";

import { useState } from "react";
import Link from "next/link";
import AuthRedirect from "@/components/auth-redirect";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    if (!name || !email || !password) {
      setMessage("Lütfen tüm alanları doldurun");
      setIsLoading(false);
      return;
    }

    // Simulate registration
    setTimeout(() => {
      setMessage(
        "Kayıt işlemi tamamlandı! Giriş yapmak için yönlendiriliyorsunuz..."
      );
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    }, 1000);
  };

  return (
    <AuthRedirect>
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Yeni hesap oluşturun
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Bu bir demo uygulamadır
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Ad Soyad
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Adınızı ve soyadınızı girin"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  E-posta adresi
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="E-posta adresinizi girin"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Şifre
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Şifrenizi girin"
                />
              </div>
            </div>

            {message && (
              <div
                className={`text-sm text-center p-2 rounded ${
                  message.includes("tamamlandı")
                    ? "text-green-600 bg-green-50"
                    : "text-red-600 bg-red-50"
                }`}
              >
                {message}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Kayıt oluşturuluyor..." : "Hesap Oluştur"}
              </button>
            </div>

            <div className="text-center">
              <Link href="/login" className="text-blue-600 hover:text-blue-500">
                Zaten hesabınız var mı? Giriş yapın
              </Link>
            </div>
          </form>
        </div>
      </div>
    </AuthRedirect>
  );
}
