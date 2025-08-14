"use client";

import Link from "next/link";
import { useAuth } from "@/contexts";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/config";

export default function PublicHeader() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push(ROUTES.HOME);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-6">
            <Link
              href={ROUTES.HOME}
              className="text-2xl font-semibold text-gray-800 hover:text-blue-600 transition-colors"
            >
              EduCRM
            </Link>

            {user && (
              <div className="flex items-center space-x-3 pl-6 border-l border-gray-200">
                <span className="text-sm text-gray-600">
                  Merhaba,{" "}
                  <span className="font-medium text-gray-800">{user.name}</span>
                </span>
                <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-md font-medium">
                  {user.role === "admin" ? "Yönetici" : "Kullanıcı"}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-6">
            {user ? (
              <>
                <div className="flex items-center space-x-6 pr-6 border-r border-gray-200">
                  <Link
                    href={ROUTES.ABOUT_US}
                    className="text-sm text-gray-600 hover:text-gray-800 font-medium transition-colors"
                  >
                    Hakkımızda
                  </Link>
                  <Link
                    href={ROUTES.CONTACT}
                    className="text-sm text-gray-600 hover:text-gray-800 font-medium transition-colors"
                  >
                    İletişim
                  </Link>
                  <Link
                    href={ROUTES.FORM_EXAMPLE}
                    className="text-sm text-gray-600 hover:text-gray-800 font-medium transition-colors"
                  >
                    Form Örneği
                  </Link>
                </div>

                <div className="flex items-center space-x-4">
                  <Link
                    href={ROUTES.DASHBOARD.HOME}
                    className="text-sm text-gray-600 hover:text-blue-600 font-medium transition-colors"
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
                  >
                    Çıkış Yap
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center space-x-6 pr-6 border-r border-gray-200">
                  <Link
                    href={ROUTES.ABOUT_US}
                    className="text-sm text-gray-600 hover:text-gray-800 font-medium transition-colors"
                  >
                    Hakkımızda
                  </Link>
                  <Link
                    href={ROUTES.CONTACT}
                    className="text-sm text-gray-600 hover:text-gray-800 font-medium transition-colors"
                  >
                    İletişim
                  </Link>
                  <Link
                    href={ROUTES.FORM_EXAMPLE}
                    className="text-sm text-gray-600 hover:text-gray-800 font-medium transition-colors"
                  >
                    Form Örneği
                  </Link>
                </div>

                <div className="flex items-center space-x-3">
                  <Link
                    href={ROUTES.AUTH.LOGIN}
                    className="text-sm font-medium transition-colors px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Giriş Yap
                  </Link>
                  <Link
                    href={ROUTES.AUTH.REGISTER}
                    className="text-sm font-medium transition-colors px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    Kayıt Ol
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
