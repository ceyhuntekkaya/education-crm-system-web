"use client";

import React from "react";

import { useRFQInvitationsContext } from "../contexts";
import { EmptyState } from "./empty-state";
import { InvitationCard } from "./invitation-card";
import { InvitationsList } from "./invitations-list";
import { LoadingState } from "./loading-state";

export const Results: React.FC = () => {
  const {
    invitations,
    invitationsListLoading,
    viewMode,
    invitationsListIsEmpty,
  } = useRFQInvitationsContext();

  if (invitationsListLoading) {
    return <LoadingState />;
  }

  if (invitationsListIsEmpty || !invitations || invitations.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="invitations-results" style={{ position: "relative" }}>
      {/* Conditional View Rendering */}
      {viewMode === "grid" ? (
        <div
          className="row row-gap-24"
          style={{ position: "relative", zIndex: 1 }}
        >
          {invitations.map((invitation) => (
            <InvitationCard
              key={invitation.id || Math.random()}
              invitation={invitation}
            />
          ))}
        </div>
      ) : (
        <InvitationsList />
      )}
    </div>
  );
};
