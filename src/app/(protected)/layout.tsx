import ProtectedRoute from "@/components/protected-route";
import DashboardNavigation from "@/components/dashboard-navigation";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="flex h-screen">
        <DashboardNavigation />
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </ProtectedRoute>
  );
}
