import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yasal Sayfalar",
  description: "Kullanım koşulları ve gizlilik politikası",
};

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="legal-layout">{children}</div>;
}
