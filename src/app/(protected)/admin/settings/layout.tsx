import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ayarlar",
  description: "Admin ayarları",
};

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
