import { Metadata } from "next";

export const metadata: Metadata = {
  title: "İnsan Kaynakları | Eğitim İste",
  description:
    "Eğitim sektörüne özel İK çözümleri. Öğretmen, danışman ve yönetici pozisyonlarında iş ilanları ve yetenek yönetimi.",
  keywords: [
    "eğitim İK",
    "öğretmen iş ilanı",
    "eğitim kurumu işe alım",
    "eğitimci kariyer",
    "eğitim sektörü insan kaynakları",
    "eğitim iste",
  ],
  openGraph: {
    title: "İnsan Kaynakları | Eğitim İste",
    description:
      "Eğitim sektörüne özel İK çözümleri ve iş ilanları.",
    type: "website",
  },
};

export default function HrEducationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
