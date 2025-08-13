"use client";

import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import UnauthorizedAccess from "./unauthorized-access";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "admin" | "user";
  allowAdminAccess?: boolean;
}

export default function ProtectedRoute({
  children,
  requiredRole,
  allowAdminAccess = true,
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      // Sadece giriş yapmamış kullanıcıları login sayfasına yönlendir
      router.push("/login");
    }
  }, [user, isLoading, router]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  // Kullanıcı giriş yapmamışsa hiçbir şey render etme (useEffect login'e yönlendirecek)
  if (!user) {
    return null;
  }

  // Rol kontrolü - yetkisiz erişim durumunda unauthorized component'i render et
  if (requiredRole && user.role !== requiredRole) {
    // Admin kullanıcılar eğer allowAdminAccess true ise tüm sayfalara erişebilir
    if (user.role === "admin" && allowAdminAccess) {
      // Admin erişimi izinli, normal içeriği render et
      return <>{children}</>;
    } else {
      // Yetkisiz erişim - unauthorized component'i render et
      return <UnauthorizedAccess user={user} />;
    }
  }

  // Normal erişim - içeriği render et
  return <>{children}</>;
}
