import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tanıtım Videosu",
  description:
    "Eğitim İste platformunu tanıtan videomuz ile eğitim kurumlarını keşfetmenin en kolay yolunu öğrenin.",
  keywords: [
    "eğitim iste",
    "tanıtım videosu",
    "okul arama",
    "eğitim kurumu karşılaştırma",
  ],
  openGraph: {
    title: "Tanıtım Videosu | Eğitim İste",
    description:
      "Eğitim İste platformunu tanıtan videomuz ile eğitim kurumlarını keşfetmenin en kolay yolunu öğrenin",
    type: "video.other",
  },
};

export default function VideoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

