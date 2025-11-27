"use client";

import React from "react";
import { useForm } from "@/contexts/form-context";
import "./form-time-slot-picker.scss";

interface TimeSlot {
  value: string;
  label: string;
}

interface FormTimeSlotPickerProps {
  name: string;
  label?: string;
  isRequired?: boolean;
  isRequiredText?: string;
  helperText?: string;
  disabled?: boolean;
  startHour?: number;
  endHour?: number;
  intervalMinutes?: number;
  multi?: boolean;
}

export const FormTimeSlotPicker: React.FC<FormTimeSlotPickerProps> = ({
  name,
  label,
  isRequired = false,
  isRequiredText,
  helperText,
  disabled = false,
  startHour = 9,
  endHour = 18,
  intervalMinutes = 30,
  multi = false,
}) => {
  const { getValue, setValue, getError } = useForm();
  const value = getValue(name);
  const selectedSlots: string[] = multi
    ? (value as string[]) || []
    : value
    ? [value as string]
    : [];
  const error = getError(name);

  // Zaman dilimlerini oluştur
  const generateTimeSlots = (): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const startMinutes = startHour * 60;
    const endMinutes = endHour * 60;

    for (let i = startMinutes; i < endMinutes; i += intervalMinutes) {
      const startTime = formatTime(i);
      const endTime = formatTime(i + intervalMinutes);
      const value = `${startTime}-${endTime}`;
      const label = value;

      slots.push({ value, label });
    }

    return slots;
  };

  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
  };

  const handleSlotClick = (slotValue: string) => {
    if (disabled) return;

    if (multi) {
      // Multi mode: Array olarak birden fazla slot seçimi
      let newSelectedSlots: string[];

      if (selectedSlots.includes(slotValue)) {
        // Slot zaten seçiliyse, kaldır
        newSelectedSlots = selectedSlots.filter((s) => s !== slotValue);
      } else {
        // Slot seçili değilse, ekle
        newSelectedSlots = [...selectedSlots, slotValue];
      }

      setValue(name, newSelectedSlots);
    } else {
      // Single mode: Sadece tek slot seçimi
      if (selectedSlots.includes(slotValue)) {
        // Aynı slot'a tekrar tıklanırsa seçimi kaldır
        setValue(name, "");
      } else {
        // Yeni slot seç
        setValue(name, slotValue);
      }
    }
  };

  const handleSelectAll = () => {
    if (disabled || !multi) return;
    const allSlots = generateTimeSlots().map((slot) => slot.value);
    setValue(name, allSlots);
  };

  const handleClearAll = () => {
    if (disabled || !multi) return;
    setValue(name, []);
  };

  const timeSlots = generateTimeSlots();

  return (
    <div className="form-time-slot-picker">
      {label && (
        <label
          htmlFor={name}
          className="text-neutral-700 text-lg fw-medium mb-12"
        >
          {label}
        </label>
      )}

      <div className="time-slot-picker">
        {/* Header with Actions - Sadece multi modda göster */}
        {multi && (
          <div className="time-slot-picker__header">
            <div className="time-slot-picker__info">
              <span className="time-slot-picker__count">
                {selectedSlots.length} dilim seçildi
              </span>
            </div>
            <div className="time-slot-picker__actions">
              <button
                type="button"
                className="time-slot-picker__action-btn"
                onClick={handleSelectAll}
                disabled={disabled || selectedSlots.length === timeSlots.length}
              >
                Tümünü Seç
              </button>
              <button
                type="button"
                className="time-slot-picker__action-btn"
                onClick={handleClearAll}
                disabled={disabled || selectedSlots.length === 0}
              >
                Temizle
              </button>
            </div>
          </div>
        )}

        {/* Time Slots Grid */}
        <div className="time-slot-picker__slots">
          {timeSlots.map((slot) => {
            const isSelected = selectedSlots.includes(slot.value);

            return (
              <button
                key={slot.value}
                type="button"
                className={`time-slot ${
                  isSelected ? "time-slot--selected" : ""
                } ${disabled ? "time-slot--disabled" : ""}`}
                onClick={() => handleSlotClick(slot.value)}
                disabled={disabled}
              >
                {slot.label}
              </button>
            );
          })}
        </div>
      </div>

      {error && <div className="form-time-slot-picker__error">{error}</div>}
      {!error &&
        isRequired &&
        ((Array.isArray(getValue(name)) &&
          (getValue(name) as string[]).length === 0) ||
          !getValue(name) ||
          getValue(name) === "") && (
          <small className="form-time-slot-picker__required text-danger-600 fw-semibold d-block mt-8">
            {isRequiredText || "* Bu alan zorunludur."}
          </small>
        )}
      {!error && !isRequired && helperText && (
        <small className="form-time-slot-picker__helper text-muted d-block mt-8">
          {helperText}
        </small>
      )}
    </div>
  );
};
