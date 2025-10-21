import { MembershipProvider } from "./_shared";
import { MembershipsLayoutProps } from "./_shared/types";

const MembershipsLayout = ({ children }: MembershipsLayoutProps) => {
  return <MembershipProvider>{children}</MembershipProvider>;
};

export default MembershipsLayout;
