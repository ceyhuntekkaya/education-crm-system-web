import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Veli Kaydı | Eğitim İşte",
  description: "Veli olarak sisteme kayıt olun",
};

export default function UserRegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
