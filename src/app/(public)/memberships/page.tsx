"use client";

import { MembershipHeader, PricingToggle, MembershipGrid } from "./_shared";

const MembershipsPage = () => {
  return (
    <section className="favorite-course py-120">
      <div className="container">
        <MembershipHeader />
        <PricingToggle />
        <MembershipGrid />
      </div>
    </section>
  );
};

export default MembershipsPage;
