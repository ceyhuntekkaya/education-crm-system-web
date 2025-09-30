"use client";

import { Breadcrumb } from "@/components";
import ListSidebar from "./_shared/sections/list-sidebar";
import { useParams } from "next/navigation";
import { getListById } from "./_shared/utils";

export default function MyListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const id = params.id as string;
  const listData = getListById(parseInt(id));
  const listTitle = listData?.label || `Liste ${id}`;

  return (
    <>
      <div>
        <Breadcrumb title={`Listem: ${listTitle}`} />
        <div className="container py-120">
          <div className="row">
            <div className="col-lg-3">
              <ListSidebar listId={id} />
            </div>
            <div className="col-lg-9">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
