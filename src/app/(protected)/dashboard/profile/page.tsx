"use client";

import { useAuth } from "@/contexts/auth-context";
import ProtectedRoute from "@/components/protected-route";
import { useState } from "react";

export default function ProfilePage() {
  return (
    <ProtectedRoute requiredRole="user" allowAdminAccess={true}>
      <ProfilePageContent />
    </ProtectedRoute>
  );
}

function ProfilePageContent() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "+90 555 123 45 67",
    department: "Bilgisayar Mühendisliği",
    joinDate: "15 Ocak 2024",
    bio: "Eğitim teknolojileri alanında uzmanlaşmış bir öğretmen ve geliştiriciyim.",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    // Burada API call yapılabilir
    console.log("Profil güncellendi:", formData);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Profil Bilgileri
            </h1>
            <p className="text-gray-600 mt-2">
              Kişisel bilgilerinizi görüntüleyin ve düzenleyin
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sol Panel - Profil Kartı */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center">
                <div className="relative inline-block mb-4">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                </div>

                <h2 className="text-xl font-bold text-gray-900 mb-1">
                  {user?.name}
                </h2>
                <p className="text-gray-600 mb-2">{user?.email}</p>
                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mb-4">
                  {user?.role === "admin" ? "👑 Admin" : "🎓 Kullanıcı"}
                </div>

                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center justify-center gap-2">
                    <span>📅</span>
                    <span>Katılım: {formData.joinDate}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <span>🏢</span>
                    <span>{formData.department}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <span>📱</span>
                    <span>{formData.phone}</span>
                  </div>
                </div>
              </div>

              {/* İstatistik Kartları */}
              <div className="mt-6 space-y-4">
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center text-white">
                      📚
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        Tamamlanan Kurslar
                      </p>
                      <p className="text-2xl font-bold text-green-600">8</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center text-white">
                      ⏱️
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        Aktif Kurslar
                      </p>
                      <p className="text-2xl font-bold text-orange-600">3</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sağ Panel - Profil Formu */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Kişisel Bilgiler
                  </h3>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      isEditing
                        ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    {isEditing ? "İptal" : "Düzenle"}
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ad Soyad
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          isEditing
                            ? "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            : "border-gray-200 bg-gray-50"
                        } transition-colors`}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        E-posta
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          isEditing
                            ? "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            : "border-gray-200 bg-gray-50"
                        } transition-colors`}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Telefon
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          isEditing
                            ? "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            : "border-gray-200 bg-gray-50"
                        } transition-colors`}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Departman
                      </label>
                      <input
                        type="text"
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          isEditing
                            ? "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            : "border-gray-200 bg-gray-50"
                        } transition-colors`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hakkımda
                    </label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      rows={4}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        isEditing
                          ? "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                          : "border-gray-200 bg-gray-50"
                      } transition-colors resize-none`}
                    />
                  </div>

                  {isEditing && (
                    <div className="flex gap-4 pt-4">
                      <button
                        type="submit"
                        className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                      >
                        Değişiklikleri Kaydet
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                      >
                        İptal
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
