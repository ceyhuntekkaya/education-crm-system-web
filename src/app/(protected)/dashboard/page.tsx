"use client";

import { useAuth } from "@/contexts";
import Link from "next/link";
import { ROUTES } from "@/constants";

export default function DashboardPage() {
  const { user } = useAuth();

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    if (hours < 12) return "Günaydın";
    if (hours < 17) return "İyi günler";
    return "İyi akşamlar";
  };

  const statsCards = [
    {
      title: "Toplam Öğrenci",
      value: "1,234",
      change: "+12%",
      changeType: "increase",
      icon: "👥",
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Aktif Kurslar",
      value: "42",
      change: "+3",
      changeType: "increase",
      icon: "📚",
      color: "from-green-500 to-green-600",
    },
    {
      title: "Bu Ay Gelir",
      value: "₺24,580",
      change: "+8%",
      changeType: "increase",
      icon: "💰",
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Yeni Kayıtlar",
      value: "89",
      change: "+15%",
      changeType: "increase",
      icon: "🎯",
      color: "from-orange-500 to-orange-600",
    },
  ];

  const quickActions: Array<{
    title: string;
    description: string;
    href: string;
    icon: string;
    color: string;
  }> = [
    {
      title: "Profilim",
      description: "Kişisel bilgilerinizi görüntüleyin ve düzenleyin",
      href: ROUTES.DASHBOARD.USER.PROFILE,
      icon: "👤",
      color: "from-indigo-500 to-indigo-600",
    },
    {
      title: "Kullanıcılar",
      description: "Kullanıcı listesini görüntüleyin ve yönetin",
      href: ROUTES.DASHBOARD.ADMIN.USERS,
      icon: "👥",
      color: "from-green-500 to-green-600",
    },
    {
      title: "Ana Sayfa",
      description: "Herkese açık ana sayfaya dönün",
      href: ROUTES.HOME,
      icon: "🏠",
      color: "from-cyan-500 to-cyan-600",
    },
  ];

  if (user?.role === "admin") {
    quickActions.splice(1, 0, {
      title: "Admin Paneli",
      description: "Sistem yönetimi ve kullanıcı işlemleri",
      href: ROUTES.DASHBOARD.ADMIN.HOME,
      icon: "⚙️",
      color: "from-red-500 to-red-600",
    });
  }

  const recentActivities = [
    {
      action: "Sisteme giriş yapıldı",
      time: "Şimdi",
      icon: "🔑",
      color: "text-green-600",
    },
    {
      action: "Profil görüntülendi",
      time: "5 dk önce",
      icon: "👁️",
      color: "text-blue-600",
    },
    {
      action: "Dashboard erişimi",
      time: "10 dk önce",
      icon: "📊",
      color: "text-purple-600",
    },
    {
      action: "Yeni kullanıcı kaydı",
      time: "15 dk önce",
      icon: "👤",
      color: "text-orange-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  {getCurrentTime()}, {user?.name}! 👋
                </h1>
                <p className="text-lg text-gray-600 mt-2 flex items-center gap-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {user?.role === "admin" ? "👑 Admin" : "🎓 Kullanıcı"}
                  </span>
                  Eğitim CRM sisteminize hoş geldiniz
                </p>
              </div>
              <div className="mt-4 lg:mt-0">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Çevrimiçi
                  </div>
                  <div>
                    {new Date().toLocaleDateString("tr-TR", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statsCards.map((stat, index) => (
              <div key={index} className="group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center text-white text-xl shadow-lg`}
                    >
                      {stat.icon}
                    </div>
                    <div
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        stat.changeType === "increase"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {stat.change}
                    </div>
                  </div>
                  <h3 className="text-sm font-medium text-gray-600 mb-1">
                    {stat.title}
                  </h3>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {quickActions.map((action, index) => (
              <Link key={index} href={action.href} className="group">
                <div className="relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-gray-200 hover:-translate-y-1">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-r ${action.color} flex items-center justify-center text-white text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      {action.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                        {action.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-3">
                        {action.description}
                      </p>
                      <div className="flex items-center text-sm font-medium text-blue-600 group-hover:text-blue-700">
                        Devam et
                        <svg
                          className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm">
                  📊
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Son Aktiviteler
                </h2>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gray-100 group-hover:bg-white flex items-center justify-center text-lg shadow-sm group-hover:shadow-md transition-all duration-200">
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <span className="text-gray-900 font-medium">
                        {activity.action}
                      </span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-sm text-gray-500">
                        {activity.time}
                      </span>
                      <div
                        className={`w-2 h-2 rounded-full ${activity.color.replace(
                          "text-",
                          "bg-"
                        )} mt-1`}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100">
                <button className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors cursor-pointer">
                  Tüm aktiviteleri görüntüle
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
