import PublicHeader from "@/components/layouts/public-header";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <PublicHeader />
      {children}
    </div>
  );
}
