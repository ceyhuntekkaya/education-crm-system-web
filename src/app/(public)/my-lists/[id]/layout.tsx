"use client";

import React from "react";
import { useParams } from "next/navigation";
import {
  parseListIdFromUrl,
  MyListProvider,
  ListSidebarContent,
} from "./_shared";

/**
 * My List Layout Component
 * Wraps page with MyListProvider for shared state
 */
export default function MyListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const id = params.id as string;
  const listId = parseListIdFromUrl(id);

  return (
    <MyListProvider key={listId} listId={listId}>
      <div className="container py-40">
        <div className="row">
          <div className="col-lg-3">
            <ListSidebarContent listId={id} />
          </div>
          <div className="col-lg-9">{children}</div>
        </div>
      </div>
    </MyListProvider>
  );
}
