"use client";

import { useAuth } from "@/contexts/auth-context";
import Link from "next/link";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Hoş geldiniz, {user?.name}! (
            {user?.role === "admin" ? "Admin" : "Kullanıcı"})
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Profilim
            </h3>
            <p className="text-gray-600 mb-4">
              Kişisel bilgilerinizi görüntüleyin ve düzenleyin
            </p>
            <Link
              href="/dashboard/user"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Profili Görüntüle →
            </Link>
          </div>

          {user?.role === "admin" && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Admin Paneli
              </h3>
              <p className="text-gray-600 mb-4">
                Sistem yönetimi ve kullanıcı işlemleri
              </p>
              <Link
                href="/dashboard/admin"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Admin Paneline Git →
              </Link>
            </div>
          )}

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Ana Sayfa
            </h3>
            <p className="text-gray-600 mb-4">Herkese açık ana sayfaya dönün</p>
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Ana Sayfaya Git →
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Son Aktiviteler
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-gray-700">Sisteme giriş yapıldı</span>
              <span className="text-sm text-gray-500">Şimdi</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-gray-700">Profil görüntülendi</span>
              <span className="text-sm text-gray-500">5 dk önce</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-700">Dashboard erişimi</span>
              <span className="text-sm text-gray-500">10 dk önce</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
