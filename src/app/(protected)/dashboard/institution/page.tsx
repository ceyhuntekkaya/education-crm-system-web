"use client";

import { useAuth } from "@/contexts";

export default function InstitutionPage() {
  const { user } = useAuth();

  const mockStats = {
    totalStudents: 156,
    activeCourses: 8,
    completedCourses: 24,
    totalInstructors: 12,
  };

  const mockCourses = [
    {
      id: 1,
      title: "React Temelleri",
      instructor: "Ahmet Yılmaz",
      students: 25,
      status: "Aktif",
      startDate: "2024-01-15",
      progress: 65,
    },
    {
      id: 2,
      title: "JavaScript ES6+",
      instructor: "Elif Demir",
      students: 18,
      status: "Aktif",
      startDate: "2024-02-01",
      progress: 45,
    },
    {
      id: 3,
      title: "Node.js Backend",
      instructor: "Mehmet Kaya",
      students: 12,
      status: "Tamamlandı",
      startDate: "2023-12-01",
      progress: 100,
    },
    {
      id: 4,
      title: "Database Design",
      instructor: "Ayşe Öztürk",
      students: 20,
      status: "Beklemede",
      startDate: "2024-03-15",
      progress: 0,
    },
  ];

  const mockInstructors = [
    {
      id: 1,
      name: "Ahmet Yılmaz",
      email: "ahmet@institution.com",
      specialization: "Frontend Development",
      activeCourses: 2,
      rating: 4.8,
    },
    {
      id: 2,
      name: "Elif Demir",
      email: "elif@institution.com",
      specialization: "JavaScript",
      activeCourses: 1,
      rating: 4.9,
    },
    {
      id: 3,
      name: "Mehmet Kaya",
      email: "mehmet@institution.com",
      specialization: "Backend Development",
      activeCourses: 1,
      rating: 4.7,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Aktif":
        return "bg-green-100 text-green-800";
      case "Tamamlandı":
        return "bg-blue-100 text-blue-800";
      case "Beklemede":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Kurum Yönetim Paneli
            </h1>
            <p className="text-gray-600 mt-2">
              Hoş geldiniz, {user?.name} - Eğitim kurumu yönetimi
            </p>
          </div>
        </div>

        {/* İstatistikler */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Toplam Öğrenci
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {mockStats.totalStudents}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Aktif Kurs</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {mockStats.activeCourses}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Tamamlanan Kurs
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {mockStats.completedCourses}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Eğitmen</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {mockStats.totalInstructors}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Ana İçerik */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Kurs Yönetimi */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  Kurs Yönetimi
                </h3>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                  Yeni Kurs Ekle
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Kurs
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Durum
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Öğrenci
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      İlerleme
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockCourses.map((course) => (
                    <tr key={course.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {course.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            Eğitmen: {course.instructor}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                            course.status
                          )}`}
                        >
                          {course.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {course.students}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-900">
                            {course.progress}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Eğitmen Listesi */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Eğitmenler
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {mockInstructors.map((instructor) => (
                  <div
                    key={instructor.id}
                    className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {instructor.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">
                        {instructor.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {instructor.specialization}
                      </div>
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-gray-500">
                          {instructor.activeCourses} aktif kurs
                        </span>
                        <span className="mx-1 text-gray-300">•</span>
                        <span className="text-xs text-yellow-600">
                          ⭐ {instructor.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition duration-300">
                Yeni Eğitmen Ekle
              </button>
            </div>
          </div>
        </div>

        {/* Hızlı İşlemler */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Öğrenci Yönetimi
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Öğrenci kayıtları ve ilerleme takibi
            </p>
            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
              Öğrencileri Görüntüle
            </button>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Rapor ve Analiz
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Detaylı performans raporları
            </p>
            <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300">
              Rapor Oluştur
            </button>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Sistem Ayarları
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Kurum ayarları ve konfigürasyon
            </p>
            <button className="w-full bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-300">
              Ayarları Aç
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
