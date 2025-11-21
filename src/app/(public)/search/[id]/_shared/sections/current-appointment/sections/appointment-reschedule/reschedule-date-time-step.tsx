"use client";

import React, { useMemo } from "react";
import { getSlotTypeIcon, getTypeDisplayName } from "@/utils";
import { AppointmentSlotDto } from "@/types";
import { useInstitutionDetail } from "../../../../contexts";
import { useForm } from "@/contexts";
import { FormAutocomplete } from "@/components/forms";

interface RescheduleDateTimeStepProps {
  schoolId: string;
}

interface DateOption {
  value: string;
  label: string;
}

export const RescheduleDateTimeStep: React.FC<RescheduleDateTimeStepProps> = ({
  schoolId,
}) => {
  const { getValue, setValue, getError } = useForm();

  const appointmentDate = getValue("appointmentDate") || "";
  const selectedSlotId = getValue("selectedSlotId");

  // InstitutionDetailContext'ten slots'u al - TEK KAYNAK
  const {
    appointmentSlots: slots,
    appointmentSlotsLoading: slotsLoading,
    refetchAppointmentSlots: refetchSlots,
  } = useInstitutionDetail();

  // Tarihe göre gruplandırılmış slotlar
  const slotsByDate = useMemo(() => {
    const grouped: Record<string, AppointmentSlotDto[]> = {};

    // Slots array kontrolü
    if (!Array.isArray(slots)) {
      console.warn("⚠️ Slots is not an array:", slots);
      return grouped;
    }

    slots.forEach((slot) => {
      if (slot.slotDate) {
        // Backend'den gelen format: "2025-11-05T14:40:00"
        // Sadece tarih kısmını al: "2025-11-05"
        const dateKey = slot.slotDate.split("T")[0];

        if (!grouped[dateKey]) {
          grouped[dateKey] = [];
        }
        grouped[dateKey].push(slot);
      }
    });

    return grouped;
  }, [slots]);

  // FormAutocomplete için tarih seçenekleri oluştur
  const dateOptions: DateOption[] = useMemo(() => {
    return Object.entries(slotsByDate)
      .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
      .map(([date, dateSlots]) => {
        // Tarihi formatla: "5 Kasım 2025, Çarşamba"
        const formattedDate = new Date(date).toLocaleDateString("tr-TR", {
          day: "numeric",
          month: "long",
          year: "numeric",
          weekday: "long",
        });

        return {
          value: date,
          label: `${formattedDate} (${dateSlots.length} müsait slot)`,
        };
      });
  }, [slotsByDate]);

  // Seçilen tarihe ait slotlar - Saate göre sıralanmış (Card tasarımı için)
  const availableSlots = useMemo(() => {
    if (!appointmentDate) return [];
    const slotsForDate = slotsByDate[appointmentDate] || [];

    // Slotları saate göre sırala
    return slotsForDate.sort((a, b) => {
      if (!a.slotDate || !b.slotDate) return 0;
      return new Date(a.slotDate).getTime() - new Date(b.slotDate).getTime();
    });
  }, [appointmentDate, slotsByDate]);

  const handleSlotSelect = (slotId: number) => {
    setValue("selectedSlotId", slotId);
  };

  return (
    <div className="reschedule-date-time-step">
      {/* Header */}
      <div className="step-header mb-24">
        <h5 className="text-neutral-800 mb-8">Yeni Tarih ve Saat Seçiniz</h5>
        <p className="text-md text-neutral-600 mb-0">
          Randevunuz için yeni tarihinizi seçin ve müsait saatlerden size uygun
          olanı belirleyin
        </p>
      </div>

      {/* Date Selection */}
      <div className="date-selection-container mb-32">
        <FormAutocomplete
          name="appointmentDate"
          label="Yeni Randevu Tarihi"
          placeholder="Tarihi seçiniz veya arayın..."
          options={dateOptions}
          required
          disabled={slotsLoading}
          isLoading={slotsLoading}
          noOptionsText="Müsait tarih bulunamadı"
          loadingText="Tarihler yükleniyor..."
          iconLeft="ph-calendar"
          variant="inline"
        />
      </div>

      {/* Date Selection Info - When no date selected */}
      {!appointmentDate && (
        <div className="date-time-empty-state mt-24">
          <div className="empty-state-content">
            <div className="empty-state-icon">
              <i className="ph-bold ph-calendar-plus" />
            </div>
            <div className="empty-state-text">
              <h6 className="empty-state-title">Tarih Seçimi Bekleniyor</h6>
              <p className="empty-state-description">
                Yukarıdan yeni randevu tarihinizi seçtiğinizde müsait saatler
                otomatik olarak yüklenecektir
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
            {availableSlots.map((slot) => {
              const slotTime = slot.slotDate
                ? new Date(slot.slotDate).toLocaleTimeString("tr-TR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "";

              return (
                <div
                  key={slot.id}
                  className={`time-slot-card ${
                    selectedSlotId === slot.id ? "selected" : ""
                  }`}
                  onClick={() => handleSlotSelect(slot.id!)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleSlotSelect(slot.id!);
                    }
                  }}
                >
                  {/* Slot Header */}
                  <div className="slot-header">
                    <div className="slot-time">
                      <i className="ph-bold ph-clock" />
                      <span>{slotTime}</span>
                    </div>
                    <div className="slot-duration">
                      <span>{slot.durationMinutes || 30} dk</span>
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
                            slot.onlineMeetingAvailable
                              ? "ph-video-camera"
                              : "ph-map-pin"
                          }`}
                        />
                        <span>
                          {slot.onlineMeetingAvailable
                            ? "Online"
                            : slot.schoolName || "Yerinde"}
                        </span>
                      </div>

                      <div className="slot-staff">
                        <i className="ph ph-user" />
                        <span>{slot.staffUserName || "Uzman"}</span>
                      </div>

                      {slot.requiresApproval && (
                        <div className="slot-approval">
                          <i className="ph ph-check-circle" />
                          <span>Onaylayınız</span>
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
              );
            })}
          </div>
        </div>
      )}

      {/* Empty State - When date selected but no slots */}
      {appointmentDate && availableSlots.length === 0 && !slotsLoading && (
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
