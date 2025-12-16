import { DrawerExamples, Footer, Header } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ana Sayfa",
  description: "Eğitim kurumlarını keşfedin ve karşılaştırın",
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="public-layout d-flex flex-column min-vh-100">
      <Header />
      <DrawerExamples />
      <main className="main-content flex-fill px-2 px-md-3 px-lg-0">
        {children}
      </main>
      <Footer />
    </div>
  );
}
