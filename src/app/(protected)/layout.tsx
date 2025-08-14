import { ProtectedRoute } from "@/guards";
import DashboardSidebar from "@/components/layouts/dashboard-sidebar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="flex h-screen">
        <DashboardSidebar />
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </ProtectedRoute>
  );
}
