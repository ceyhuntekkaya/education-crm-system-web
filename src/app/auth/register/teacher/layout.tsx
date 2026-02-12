import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Öğretmen Kaydı | Eğitim İste",
  description: "Öğretmen olarak sisteme kayıt olun",
};

export default function TeacherRegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
