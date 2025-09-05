import { Breadcrumb } from "@/components";

export default function SearchDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Breadcrumb title={"Okul Detayı"} />
      {children}
    </div>
  );
}
