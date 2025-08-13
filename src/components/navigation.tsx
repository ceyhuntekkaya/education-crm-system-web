"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import {
  PublicRoutes,
  GuestAuthRoutes,
  AuthenticatedRoutes,
} from "@/config/routes";

export default function Navigation() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  // Navigation menülerini al
  const getPublicNavRoutes = () => {
    return PublicRoutes.filter((route) => route.href !== "/"); // Ana sayfa hariç
  };

  const getAuthenticatedRoutes = () => {
    return AuthenticatedRoutes;
  };

  const getGuestAuthRoutes = () => {
    return GuestAuthRoutes;
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-6">
            <Link
              href="/"
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
                  {getPublicNavRoutes().map((route) => (
                    <Link
                      key={route.href}
                      href={route.href}
                      className="text-sm text-gray-600 hover:text-gray-800 font-medium transition-colors"
                    >
                      {route.label}
                    </Link>
                  ))}
                </div>

                <div className="flex items-center space-x-4">
                  {getAuthenticatedRoutes().map((route) => (
                    <Link
                      key={route.href}
                      href={route.href}
                      className="text-sm text-gray-600 hover:text-blue-600 font-medium transition-colors"
                    >
                      {route.label}
                    </Link>
                  ))}

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
                  {getPublicNavRoutes().map((route) => (
                    <Link
                      key={route.href}
                      href={route.href}
                      className="text-sm text-gray-600 hover:text-gray-800 font-medium transition-colors"
                    >
                      {route.label}
                    </Link>
                  ))}
                </div>

                <div className="flex items-center space-x-3">
                  {getGuestAuthRoutes().map((route) => {
                    const isLogin = route.href === "/login";
                    return (
                      <Link
                        key={route.href}
                        href={route.href}
                        className={`text-sm font-medium transition-colors px-4 py-2 rounded-md ${
                          isLogin
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {route.label}
                      </Link>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
