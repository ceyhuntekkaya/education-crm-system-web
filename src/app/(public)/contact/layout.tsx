import { Metadata } from "next";

export const metadata: Metadata = {
  title: "İletişim",
  description: "Bizimle iletişime geçin",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
