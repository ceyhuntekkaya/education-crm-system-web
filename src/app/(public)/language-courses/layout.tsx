import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dil Kursları | Eğitim İste",
  description:
    "8 farklı dilde 600'den fazla dil kursu. İngilizce, Almanca, Fransızca ve daha fazlası. Uluslararası sertifika programları.",
  keywords: [
    "dil kursu",
    "İngilizce kursu",
    "Almanca kursu",
    "IELTS",
    "TOEFL",
    "dil eğitimi",
    "eğitim iste",
  ],
  openGraph: {
    title: "Dil Kursları | Eğitim İste",
    description:
      "8 farklı dilde 600'den fazla dil kursu. Uluslararası sertifika programları.",
    type: "website",
  },
};

export default function LanguageCoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
