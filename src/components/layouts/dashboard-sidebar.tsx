"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { usePathname } from "next/navigation";
import { ROLES } from "@/types/roles";
import { getDashboardRoutes, ROUTES, type MenuItem } from "@/config/routes";
import { useState } from "react";

export default function DashboardSidebar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const isActive = (path: string) => pathname === path;

  const isSubRouteActive = (item: MenuItem) => {
    if (item.children) {
      return item.children.some((child: MenuItem) => pathname === child.href);
    }
    return false;
  };

  const toggleExpanded = (href: string) => {
    setExpandedItems((prev) =>
      prev.includes(href)
        ? prev.filter((item) => item !== href)
        : [...prev, href]
    );
  };

  if (!user) return null;

  return (
    <div className="bg-gray-50 border-r border-gray-200 w-64 h-screen sticky top-0 overflow-y-auto flex flex-col">
      {/* Ana Sayfa (Home) Linki */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <Link
          href={ROUTES.HOME}
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
          {getDashboardRoutes(user.role as ROLES).map((item) => (
            <div key={item.href}>
              {/* Ana menü öğesi */}
              <div className="flex items-center">
                <Link
                  href={item.href}
                  className={`flex-1 px-3 py-2 rounded-md text-sm font-medium ${
                    isActive(item.href) || isSubRouteActive(item)
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {item.icon} {item.label}
                </Link>
                {/* Alt menü varsa açma/kapama butonu */}
                {item.children && item.children.length > 0 && (
                  <button
                    onClick={() => toggleExpanded(item.href)}
                    className="p-2 text-gray-500 hover:text-gray-700"
                  >
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        expandedItems.includes(item.href) ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                )}
              </div>

              {/* Alt menü öğeleri */}
              {item.children &&
                item.children.length > 0 &&
                (expandedItems.includes(item.href) ||
                  isSubRouteActive(item)) && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`block px-3 py-2 rounded-md text-sm font-medium ${
                          isActive(child.href)
                            ? "bg-blue-100 text-blue-700"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-700"
                        }`}
                      >
                        {child.icon} {child.label}
                      </Link>
                    ))}
                  </div>
                )}
            </div>
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
            window.location.href = ROUTES.HOME;
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
