"use client";

import React from "react";
import { DataGrid } from "@/components/ui/data-grid";

import { createInvitationColumns } from "../config";
import { useRFQInvitationsContext } from "../contexts";

export const InvitationsList: React.FC = () => {
  const { invitations, invitationsListLoading } = useRFQInvitationsContext();
  const columns = createInvitationColumns();

  return (
    <div className="invitations-list-table">
      <DataGrid
        columns={columns}
        rows={invitations}
        loading={invitationsListLoading}
        disableRowSelectionOnClick
      />
    </div>
  );
};
