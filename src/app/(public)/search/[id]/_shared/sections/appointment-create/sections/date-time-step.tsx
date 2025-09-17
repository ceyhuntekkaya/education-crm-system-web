import React, { useEffect, useState } from "react";
import { FormInput } from "@/components/forms";
import { useFormHook } from "@/hooks/use-form-hook";
import { getSlotTypeIcon, getTypeDisplayName } from "@/utils";
import { mockAvailableSlots } from "../mock/appointment-create-mock";
import { AvailableSlotDto } from "@/types/dto/appointment/AvailableSlotDto";

export const DateTimeStep = () => {
  const { updateField, values } = useFormHook();
  const appointmentDate = values.appointmentDate || "";
  const selectedSlotId = values.selectedSlotId || "";
  const [availableSlots, setAvailableSlots] = useState<AvailableSlotDto[]>([]);

  // Load available slots when date changes
  useEffect(() => {
    if (appointmentDate) {
      // In real implementation, call API with date
      setAvailableSlots(mockAvailableSlots);
    } else {
      setAvailableSlots([]);
    }
  }, [appointmentDate]);

  const handleSlotSelect = (slotId: string) => {
    updateField("selectedSlotId", slotId);
  };

  return (
    <div className="date-time-step">
      {/* Header */}
      <div className="step-header mb-24">
        <h5 className="text-neutral-800 mb-8">Tarih ve Saat Seçiniz</h5>
        <p className="text-md text-neutral-600 mb-0">
          Randevu tarihinizi seçin ve müsait saatlerden size uygun olanı
          belirleyin
        </p>
      </div>

      {/* Date Selection */}
      <div className="date-selection-container mb-32">
        <FormInput
          name="appointmentDate"
          type="date"
          label="Randevu Tarihi"
          variant="inline"
          min={new Date().toISOString().split("T")[0]}
        />
      </div>

      {/* Date Selection Info - When no date selected */}
      {!appointmentDate && (
        <div className="date-time-empty-state">
          <div className="empty-state-content">
            <div className="empty-state-icon">
              <i className="ph-bold ph-calendar-plus" />
            </div>
            <div className="empty-state-text">
              <h6 className="empty-state-title">Tarih Seçimi Bekleniyor</h6>
              <p className="empty-state-description">
                Yukarıdan randevu tarihinizi seçtiğinizde müsait saatler burada
                listelenir
              </p>
            </div>
          </div>

          <div className="date-selection-features">
            <div className="feature-item">
              <div className="feature-icon">
                <i className="ph ph-clock" />
              </div>
              <span>Gerçek zamanlı müsaitlik</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <i className="ph ph-user-check" />
              </div>
              <span>Uzman eğitmen seçimi</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <i className="ph ph-video-camera" />
              </div>
              <span>Online & yüz yüze</span>
            </div>
          </div>
        </div>
      )}

      {/* Available Slots */}
      {appointmentDate && availableSlots.length > 0 && (
        <div className="time-slots-section">
          <div className="slots-header mb-20">
            <h6 className="text-neutral-800 mb-4">Müsait Saatler</h6>
            <p className="text-sm text-neutral-600 mb-0">
              {availableSlots.length} müsait slot bulundu
            </p>
          </div>

          <div className="time-slots-grid">
            {availableSlots.map((slot) => (
              <div
                key={slot.slotId}
                className={`time-slot-card ${
                  selectedSlotId === slot.slotId?.toString() ? "selected" : ""
                } ${slot.isRecommended ? "recommended" : ""}`}
                onClick={() => handleSlotSelect(slot.slotId!.toString())}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleSlotSelect(slot.slotId!.toString());
                  }
                }}
              >
                {/* Slot Header */}
                <div className="slot-header">
                  <div className="slot-time">
                    <i className="ph-bold ph-clock" />
                    <span>{slot.timeRange}</span>
                  </div>
                  <div className="slot-duration">
                    <span>{slot.durationMinutes} dk</span>
                  </div>
                </div>

                {/* Slot Content */}
                <div className="slot-content">
                  <div className="slot-type">
                    <div className="slot-type-icon">
                      <i
                        className={`ph-bold ${getSlotTypeIcon(
                          slot.appointmentType
                        )}`}
                      />
                    </div>
                    <span className="slot-type-name">
                      {getTypeDisplayName(slot.appointmentType)}
                    </span>
                  </div>

                  <div className="slot-details">
                    <div className="slot-location">
                      <i
                        className={`ph ${
                          slot.isOnline ? "ph-video-camera" : "ph-map-pin"
                        }`}
                      />
                      <span>{slot.location}</span>
                    </div>

                    <div className="slot-staff">
                      <i className="ph ph-user" />
                      <span>{slot.staffUserName}</span>
                    </div>

                    {slot.availableCapacity && slot.availableCapacity > 1 && (
                      <div className="slot-capacity">
                        <i className="ph ph-users" />
                        <span>{slot.availableCapacity} kişi kapasiteli</span>
                      </div>
                    )}

                    {slot.requiresApproval && (
                      <div className="slot-approval">
                        <i className="ph ph-check-circle" />
                        <span>Onay gerektirir</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Selection Indicator */}
                <div className="slot-selector">
                  <div className="slot-check">
                    <i className="ph-bold ph-check" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {appointmentDate && availableSlots.length === 0 && (
        <div className="empty-slots-state">
          <div className="empty-slots-icon">
            <i className="ph-bold ph-calendar-x" />
          </div>
          <h6 className="empty-slots-title">Müsait slot bulunamadı</h6>
          <p className="empty-slots-description">
            Seçilen tarih için müsait randevu saati bulunmuyor. Lütfen farklı
            bir tarih deneyin.
          </p>
        </div>
      )}
    </div>
  );
};
