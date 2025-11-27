"use client";

import React, { useState } from "react";
import { useForm } from "@/contexts/form-context";
import "./form-multi-date-calendar.scss";

interface FormDateCalendarProps {
  name: string;
  label?: string;
  isRequired?: boolean;
  isRequiredText?: string;
  helperText?: string;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  multi?: boolean;
}

export const FormDateCalendar: React.FC<FormDateCalendarProps> = ({
  name,
  label,
  isRequired = false,
  isRequiredText,
  helperText,
  minDate,
  maxDate,
  disabled = false,
  multi = false,
}) => {
  const { getValue, setValue, getError } = useForm();
  const value = getValue(name);
  const selectedDates: string[] = multi
    ? (value as string[]) || []
    : value
    ? [value as string]
    : [];
  const error = getError(name);

  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthNames = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ];

  const dayNames = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];

  // Ayın günlerini hesapla
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    // Haftanın ilk gününü ayarla (0=Pazar, 1=Pazartesi)
    let firstDayOfWeek = firstDay.getDay();
    firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

    const days: (number | null)[] = [];

    // Önceki ayın boş günleri
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }

    // Ayın günleri
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const isDateSelected = (day: number): boolean => {
    const dateStr = formatDate(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    );
    return selectedDates.includes(dateStr);
  };

  const isDateDisabled = (day: number): boolean => {
    if (disabled) return true;

    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );

    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;

    return false;
  };

  const handleDateClick = (day: number) => {
    if (isDateDisabled(day)) return;

    const dateStr = formatDate(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    );

    if (multi) {
      // Multi mode: Array olarak birden fazla tarih seçimi
      let newSelectedDates: string[];

      if (selectedDates.includes(dateStr)) {
        // Tarih zaten seçiliyse, kaldır
        newSelectedDates = selectedDates.filter((d) => d !== dateStr);
      } else {
        // Tarih seçili değilse, ekle
        newSelectedDates = [...selectedDates, dateStr];
      }

      // Tarihleri sırala
      newSelectedDates.sort();

      setValue(name, newSelectedDates);
    } else {
      // Single mode: Sadece tek tarih seçimi
      if (selectedDates.includes(dateStr)) {
        // Aynı tarihe tekrar tıklanırsa seçimi kaldır
        setValue(name, "");
      } else {
        // Yeni tarih seç
        setValue(name, dateStr);
      }
    }
  };

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  const handleToday = () => {
    setCurrentMonth(new Date());
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <div className="form-multi-date-calendar">
      {label && (
        <label
          htmlFor={name}
          className="text-neutral-700 text-lg fw-medium mb-12"
        >
          {label}
        </label>
      )}

      <div className="calendar">
        {/* Calendar Header */}
        <div className="calendar__header">
          <button
            type="button"
            className="calendar__nav-btn"
            onClick={handlePrevMonth}
            disabled={disabled}
          >
            <i className="ph ph-caret-left" />
          </button>

          <div className="calendar__month-year">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </div>

          <button
            type="button"
            className="calendar__nav-btn"
            onClick={handleNextMonth}
            disabled={disabled}
          >
            <i className="ph ph-caret-right" />
          </button>
        </div>

        {/* Calendar Body */}
        <div className="calendar__body">
          {/* Day Names */}
          <div className="calendar__day-names">
            {dayNames.map((day) => (
              <div key={day} className="calendar__day-name">
                {day}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="calendar__days">
            {days.map((day, index) => (
              <div
                key={index}
                className={`calendar__day ${
                  day === null ? "calendar__day--empty" : ""
                } ${
                  day && isDateSelected(day) ? "calendar__day--selected" : ""
                } ${
                  day && isDateDisabled(day) ? "calendar__day--disabled" : ""
                }`}
                onClick={() => day && handleDateClick(day)}
              >
                {day}
              </div>
            ))}
          </div>
        </div>

        {/* Today Button */}
        <div className="calendar__footer">
          <button
            type="button"
            className="calendar__today-btn"
            onClick={handleToday}
            disabled={disabled}
          >
            Bugün
          </button>
          {selectedDates.length > 0 && (
            <span className="calendar__selected-count">
              {selectedDates.length} gün seçildi
            </span>
          )}
        </div>
      </div>

      {/* Seçili Tarihleri Önizleme - Sadece multi modda göster */}
      {multi && selectedDates.length > 0 && (
        <div className="calendar__selected-preview">
          <div className="calendar__preview-header">
            <i className="ph ph-calendar-check" />
            <span>Seçili Tarihler:</span>
          </div>
          <div className="calendar__preview-dates">
            {selectedDates.map((date) => {
              const dateObj = new Date(date + "T00:00:00");
              const formatted = dateObj.toLocaleDateString("tr-TR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              });
              return (
                <span key={date} className="calendar__preview-date">
                  {formatted}
                  <button
                    type="button"
                    className="calendar__preview-date-remove"
                    onClick={() => {
                      if (!disabled) {
                        const newSelectedDates = selectedDates.filter(
                          (d) => d !== date
                        );
                        setValue(name, newSelectedDates);
                      }
                    }}
                    disabled={disabled}
                    title="Tarihi kaldır"
                  >
                    <i className="ph ph-x" />
                  </button>
                </span>
              );
            })}
          </div>
        </div>
      )}

      {error && <div className="form-multi-date-calendar__error">{error}</div>}
      {!error && isRequired && selectedDates.length === 0 && (
        <small className="form-multi-date-calendar__required text-danger-600 fw-semibold d-block mt-8">
          {isRequiredText || "* Bu alan zorunludur."}
        </small>
      )}
      {!error && !isRequired && helperText && (
        <small className="form-multi-date-calendar__helper text-muted d-block mt-8">
          {helperText}
        </small>
      )}
    </div>
  );
};
