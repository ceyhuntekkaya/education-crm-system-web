"use client";

import React from "react";
import { AppointmentDto } from "@/types/dto/appointment/AppointmentDto";
import { Avatar } from "../../../components/avatar";
import { Badge } from "../../../components/badge";
import {
  getParticipantTypeBadgeVariant,
  getParticipantTypeDisplay,
} from "../../../utils";

interface ParticipantsInfoProps {
  appointment: AppointmentDto;
}

export const ParticipantsInfo: React.FC<ParticipantsInfoProps> = ({
  appointment,
}) => {
  // Katılımcı yoksa component'i render etme
  if (!appointment.participants || appointment.participants.length === 0) {
    return null;
  }

  return (
    <div className="col-12 mb-32">
      <h5 className="h5 text-heading mb-16">
        Katılımcılar ({appointment.participants.length})
      </h5>
      <div className="bg-neutral-25 p-16 rounded-8">
        <div className="row">
          {appointment.participants.map((participant, index) => (
            <div key={index} className="col-md-6 mb-16">
              <div className="d-flex align-items-center">
                <Avatar
                  src={undefined}
                  alt={participant.name}
                  className="me-2"
                  size="sm"
                />
                <div className="overflow-hidden flex-grow-1">
                  <div className="fw-medium text-truncate">
                    {participant.name || "-"}
                  </div>
                  <div>
                    <Badge
                      variant={getParticipantTypeBadgeVariant(
                        participant.participantType || ""
                      )}
                      className="small"
                    >
                      {getParticipantTypeDisplay(participant.participantType)}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ParticipantsInfo;
