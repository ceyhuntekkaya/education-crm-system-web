import { Footer, Header } from "@/components";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="public-layout d-flex flex-column min-vh-100">
      <Header />
      <main className="main-content flex-fill px-2 px-md-3 px-lg-0">
        {children}
      </main>
      <Footer />
    </div>
  );
}
