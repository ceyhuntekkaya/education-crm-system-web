import { Department } from "@/enums/Department";
import { Permission } from "@/enums/Permission";
import { ProtectedGuard } from "@/providers";
import React from "react";

const UserPage: React.FC = () => {
  return (
    <div>
      <ProtectedGuard>
        <h1>PUBLIC</h1>
      </ProtectedGuard>
      <ProtectedGuard allowedDepartments={[Department.AUTHOR]}>
        <h1>AUTHOR DEPARTMAN PROTECTED</h1>
      </ProtectedGuard>
      <ProtectedGuard allowedDepartments={[Department.AUTHOR_REVIEWER]}>
        <h1>AUTHOR_REVIEWER DEPARTMAN PROTECTED</h1>
      </ProtectedGuard>
      <ProtectedGuard allowedPermissions={[Permission.USER_CREATE]}>
        <h1>USER_CREATE PROTECTED</h1>
      </ProtectedGuard>
      <ProtectedGuard allowedPermissions={[Permission.ACCOUNTING_OPERATION]}>
        <h1>ACCOUNTING_OPERATION PROTECTED</h1>
      </ProtectedGuard>
      <ProtectedGuard
        allowedDepartments={[Department.AUTHOR_REVIEWER]}
        allowedPermissions={[Permission.USER_CREATE]}
      >
        <h1>AUTHOR_REVIEWER & USER_CREATE PROTECTED</h1>
      </ProtectedGuard>
    </div>
  );
};

export default UserPage;
