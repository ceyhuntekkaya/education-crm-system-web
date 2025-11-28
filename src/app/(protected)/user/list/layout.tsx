import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kullanıcı Listesi",
  description: "Kullanıcı listesi sayfası",
};

export default function UserListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
