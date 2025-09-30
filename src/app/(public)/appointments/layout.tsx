import { Breadcrumb, Footer, Header } from "@/components";

export default function AppointmentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Breadcrumb title={"Randevularım"} />
      {children}
    </div>
  );
}
