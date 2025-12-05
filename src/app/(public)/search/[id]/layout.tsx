"use client";

// import { Breadcrumb } from "@/components";
import { InstitutionDetailProvider } from "./_shared";
import { useParams } from "next/navigation";

export default function SearchDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const id = params.id as string;

  return (
    <InstitutionDetailProvider id={id}>
      {/* <div>
        <Breadcrumb title={"Kurum Detayı"} />
        {children}
      </div> */}

      {children}
    </InstitutionDetailProvider>
  );
}
