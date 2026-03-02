import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Webinar & Etkinlikler | Eğitim İste",
  description:
    "Eğitim dünyasının uzmanlarıyla canlı webinar ve etkinliklere katılın. Online, yüz yüze ve hibrit formatlarda.",
  keywords: [
    "webinar",
    "eğitim etkinliği",
    "online seminer",
    "eğitim semineri",
    "uzman konuşmacı",
    "eğitim iste",
  ],
  openGraph: {
    title: "Webinar & Etkinlikler | Eğitim İste",
    description:
      "Eğitim dünyasının uzmanlarıyla canlı webinar ve etkinliklere katılın.",
    type: "website",
  },
};

export default function WebinarsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
