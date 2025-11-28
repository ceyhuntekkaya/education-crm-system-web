import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yetkisiz Erişim",
  description: "Bu sayfaya erişim izniniz bulunmamaktadır",
};

export default function UnauthorizedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
