import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Özel Okullar | Eğitim İste",
  description:
    "Türkiye genelindeki özel okulları keşfedin. Anaokulu, ilkokul, ortaokul ve lise seviyelerinde en iyi özel okulları karşılaştırın.",
  keywords: [
    "özel okul",
    "anaokulu",
    "ilkokul",
    "ortaokul",
    "lise",
    "özel okul karşılaştırma",
    "eğitim iste",
  ],
  openGraph: {
    title: "Özel Okullar | Eğitim İste",
    description:
      "Türkiye genelindeki özel okulları keşfedin ve karşılaştırın.",
    type: "website",
  },
};

export default function PrivateSchoolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
