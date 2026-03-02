import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tedarik Paneli | Eğitim İste",
  description:
    "Eğitim kurumları ve tedarikçileri buluşturan dijital tedarik yönetim sistemi. Ürün arama, alım ilanı, teklif yönetimi ve tedarikçi rehberi.",
  keywords: [
    "eğitim tedarik",
    "okul tedarikçi",
    "eğitim kurumu alım",
    "tedarik yönetimi",
    "eğitim malzeme alımı",
    "tedarikçi yönetim paneli",
    "eğitim iste",
  ],
  openGraph: {
    title: "Tedarik Paneli | Eğitim İste",
    description:
      "Eğitim kurumları ve tedarikçileri buluşturan dijital tedarik yönetim sistemi.",
    type: "website",
  },
};

export default function SupplyPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
