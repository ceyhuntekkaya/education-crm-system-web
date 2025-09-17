"use client";

import React from "react";
import { AppointmentDto } from "@/types/dto/appointment/AppointmentDto";
import { Badge } from "../../../components/badge";

interface MeetingInfoProps {
  appointment: AppointmentDto;
}

export const MeetingInfo: React.FC<MeetingInfoProps> = ({ appointment }) => {
  const hasOnlineInfo =
    appointment.isOnline ||
    appointment.meetingUrl ||
    appointment.meetingId ||
    appointment.meetingPassword;

  if (!hasOnlineInfo) {
    return null;
  }

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      // Burada toast notification gösterilebilir
      console.log(`${type} panoya kopyalandı: ${text}`);
    });
  };

  return (
    <div className="col-12 mb-32">
      <h5 className="h5 text-heading mb-16">Online Toplantı Bilgileri</h5>
      <div className="bg-info-25 p-20 rounded-12 border-start border-info-600 border-4">
        <div className="row">
          {/* Online Status */}
          {appointment.isOnline && (
            <div className="col-12 mb-16">
              <Badge variant="info" className="fs-sm">
                <i className="ph ph-video-camera me-8"></i>
                Online Randevu
              </Badge>
            </div>
          )}

          {/* Meeting URL */}
          {appointment.meetingUrl && (
            <div className="col-12 mb-16">
              <label className="form-label small text-muted mb-8">
                Toplantı Linki
              </label>
              <div className="d-flex align-items-center gap-12 bg-white p-12 rounded-8 border border-neutral-30">
                <a
                  href={appointment.meetingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none text-main-600 flex-grow-1 text-truncate"
                >
                  {appointment.meetingUrl}
                </a>
                <button
                  className="btn btn-sm btn-outline-info border-0 p-8"
                  onClick={() =>
                    copyToClipboard(appointment.meetingUrl!, "Toplantı linki")
                  }
                  title="Kopyala"
                >
                  <i className="ph ph-copy"></i>
                </button>
                <a
                  href={appointment.meetingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-info p-8"
                  title="Toplantıya Katıl"
                >
                  <i className="ph ph-arrow-square-out"></i>
                </a>
              </div>
            </div>
          )}

          <div className="row">
            {/* Meeting ID */}
            {appointment.meetingId && (
              <div className="col-md-6 mb-16">
                <label className="form-label small text-muted mb-8">
                  Toplantı ID
                </label>
                <div className="d-flex align-items-center gap-8 bg-white p-12 rounded-8 border border-neutral-30">
                  <code className="bg-transparent text-neutral-700 flex-grow-1">
                    {appointment.meetingId}
                  </code>
                  <button
                    className="btn btn-sm btn-outline-info border-0 p-4"
                    onClick={() =>
                      copyToClipboard(appointment.meetingId!, "Toplantı ID")
                    }
                    title="Kopyala"
                  >
                    <i className="ph ph-copy text-xs"></i>
                  </button>
                </div>
              </div>
            )}

            {/* Meeting Password */}
            {appointment.meetingPassword && (
              <div className="col-md-6 mb-16">
                <label className="form-label small text-muted mb-8">
                  Toplantı Şifresi
                </label>
                <div className="d-flex align-items-center gap-8 bg-white p-12 rounded-8 border border-neutral-30">
                  <code className="bg-transparent text-neutral-700 flex-grow-1">
                    {appointment.meetingPassword}
                  </code>
                  <button
                    className="btn btn-sm btn-outline-info border-0 p-4"
                    onClick={() =>
                      copyToClipboard(
                        appointment.meetingPassword!,
                        "Toplantı şifresi"
                      )
                    }
                    title="Kopyala"
                  >
                    <i className="ph ph-copy text-xs"></i>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="col-12">
            <div className="bg-info-50 p-12 rounded-8">
              <small className="text-info-700">
                <i className="ph ph-info me-8"></i>
                Toplantıya katılmak için yukarıdaki linke tıklayın veya toplantı
                ID ve şifresini kullanın.
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingInfo;
