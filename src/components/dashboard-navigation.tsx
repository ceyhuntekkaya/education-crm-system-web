"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { usePathname } from "next/navigation";
import { ROLES } from "@/types/roles";
import { DashboardRoutes } from "@/config/routes";

export default function DashboardNavigation() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  if (!user) return null;

  return (
    <div className="bg-gray-50 border-r border-gray-200 w-64 h-screen sticky top-0 overflow-y-auto flex flex-col">
      {/* Ana Sayfa (Home) Linki */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <Link
          href="/"
          className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition duration-200"
        >
          <svg
            className="w-5 h-5 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          🏠 Ana Sayfa (Web)
        </Link>
      </div>

      <div className="p-4 flex-1">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Dashboard</h2>

        <nav className="space-y-2">
          {/* Dinamik Menü - Role bazlı */}
          {DashboardRoutes.filter((item) =>
            item.allowedRoles.includes(user.role as ROLES)
          ).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-3 py-2 rounded-md text-sm font-medium ${
                isActive(item.href)
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.icon} {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Çıkış Yap Bölümü */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="mb-3 text-xs text-gray-500">
          <p className="truncate">
            <span className="font-medium">{user.name}</span>
          </p>
          <p>
            Rol:{" "}
            <span className="font-medium text-blue-600 capitalize">
              {user.role}
            </span>
          </p>
        </div>
        <button
          onClick={() => {
            logout();
            window.location.href = "/";
          }}
          className="w-full flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition duration-200"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Çıkış Yap
        </button>
      </div>
    </div>
  );
}
