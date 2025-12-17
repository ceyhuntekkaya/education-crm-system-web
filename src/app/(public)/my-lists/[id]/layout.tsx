"use client";

import React from "react";
import { useParams } from "next/navigation";
import {
  parseListIdFromUrl,
  MyListProvider,
  ListSidebarContent,
  MobileListHeader,
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
      <section className="course-list-view py-40 background-img bg-img">
        <div className="container">
          {/* Mobile Header - Only visible on mobile */}
          <MobileListHeader />

          <div className="row">
            {/* Sidebar - Hidden on mobile, visible on lg and up */}
            <div className="col-lg-3 d-none d-lg-block">
              <ListSidebarContent listId={id} />
            </div>
            <div className="col-lg-9">{children}</div>
          </div>
        </div>
      </section>
    </MyListProvider>
  );
}
