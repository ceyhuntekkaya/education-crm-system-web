"use client";

import { MembershipHeader, MembershipGrid } from "./_shared";
import { usePageTitle } from "@/hooks";

const MembershipsPage = () => {
  usePageTitle("Kurumsal Üyelik Paketleri");
  return (
    <section className="favorite-course py-40">
      <div className="container">
        <MembershipHeader />
        <MembershipGrid />
      </div>
    </section>
  );
};

export default MembershipsPage;
