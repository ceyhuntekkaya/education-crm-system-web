import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sınav Hazırlık Kursları | Eğitim İste",
  description:
    "LGS, YKS, AYT ve üniversite hazırlık kurslarını keşfedin. Türkiye genelindeki en iyi sınav hazırlık programlarını karşılaştırın.",
  keywords: [
    "LGS hazırlık",
    "YKS kursu",
    "AYT kursu",
    "üniversite hazırlık",
    "sınav hazırlık",
    "özel ders",
    "eğitim iste",
  ],
  openGraph: {
    title: "Sınav Hazırlık Kursları | Eğitim İste",
    description:
      "LGS, YKS, AYT ve üniversite hazırlık kurslarını keşfedin ve karşılaştırın.",
    type: "website",
  },
};

export default function EduCoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
