"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { ROUTES } from "@/config/routes";

interface AuthRedirectProps {
  children: React.ReactNode;
}

export default function AuthRedirect({ children }: AuthRedirectProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      // Kullanıcı giriş yapmışsa dashboard'a yönlendir
      router.push(ROUTES.DASHBOARD.HOME);
    }
  }, [user, isLoading, router]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Kullanıcı giriş yapmışsa hiçbir şey render etme
  if (user) {
    return null;
  }

  return <>{children}</>;
}
