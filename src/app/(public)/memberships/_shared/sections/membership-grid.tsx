import { useMembership } from "../context";
import MembershipCard from "./membership-card";

const MembershipGrid = () => {
  const { plans } = useMembership();

  return (
    <div className="row gy-4">
      {plans.map((plan, index) => (
        <MembershipCard key={plan.id} plan={plan} index={index} />
      ))}
    </div>
  );
};

export default MembershipGrid;
