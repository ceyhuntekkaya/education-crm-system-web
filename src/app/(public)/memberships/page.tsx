"use client";

import { MembershipHeader, MembershipGrid } from "./_shared";

const MembershipsPage = () => {
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
