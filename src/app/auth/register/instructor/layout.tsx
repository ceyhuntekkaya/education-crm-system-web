import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eğitmen Kaydı | Eğitim İste",
  description: "Eğitmen olarak sisteme kayıt olun",
};

export default function InstructorRegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
