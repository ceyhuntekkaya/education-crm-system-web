import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nasıl Çalışır? | Eğitim İste",
  description:
    "Eğitim İste platformunun nasıl çalıştığını öğrenin. 3 basit adımda hayalinizdeki eğitim kurumunu bulun.",
  keywords: [
    "nasıl çalışır",
    "eğitim iste rehber",
    "platform kullanımı",
    "okul arama",
    "eğitim iste",
  ],
  openGraph: {
    title: "Nasıl Çalışır? | Eğitim İste",
    description:
      "3 basit adımda hayalinizdeki eğitim kurumunu bulun.",
    type: "website",
  },
};

export default function HowItWorksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
