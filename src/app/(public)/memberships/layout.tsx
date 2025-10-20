import { ReactNode } from "react";
import { MembershipProvider } from "./_shared";

interface MembershipsLayoutProps {
  children: ReactNode;
}

const MembershipsLayout = ({ children }: MembershipsLayoutProps) => {
  return <MembershipProvider>{children}</MembershipProvider>;
};

export default MembershipsLayout;
