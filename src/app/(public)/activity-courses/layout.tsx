import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aktivite Kursları | Eğitim İste",
  description:
    "Müzik, spor, sanat, dans, satranç ve yüzme kurslarını keşfedin. Çocuğunuzun yeteneklerini geliştirin.",
  keywords: [
    "aktivite kursu",
    "müzik kursu",
    "spor kursu",
    "sanat kursu",
    "dans",
    "satranç",
    "yüzme",
    "eğitim iste",
  ],
  openGraph: {
    title: "Aktivite Kursları | Eğitim İste",
    description:
      "Müzik, spor, sanat ve daha fazlası. Çocuğunuzun yeteneklerini keşfedin.",
    type: "website",
  },
};

export default function ActivityCoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
