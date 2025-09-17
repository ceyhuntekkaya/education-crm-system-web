"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  TabNavigation,
  TabContent,
  TabItem,
} from "@/components/ui";
import { AppointmentDto } from "@/types/dto/appointment/AppointmentDto";
import {
  BasicInfo,
  DateTimeInfo,
  PeopleInfo,
  ParticipantsInfo,
  LocationInfo,
  OutcomeInfo,
  NotesInfo,
  CancellationInfo,
  SurveyInfo,
  EnhancedInfo,
  MeetingInfo,
  StatisticsInfo,
} from "./components";

interface AppointmentDetailProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: AppointmentDto | null;
}

export const AppointmentDetail: React.FC<AppointmentDetailProps> = ({
  isOpen,
  onClose,
  appointment,
}) => {
  if (!appointment || !isOpen) return null;

  const handleEdit = () => {
    console.log("Düzenle butonu tıklandı!");
    // Düzenleme modalı açılabilir
  };

  const tabs: TabItem[] = [
    {
      id: "general",
      title: "Genel Bilgiler",
      label: "Genel Bilgiler",
      icon: "ph ph-info",
      isActive: true, // İlk tab default olarak aktif
      content: (
        <div className="row">
          <BasicInfo appointment={appointment} />
          <DateTimeInfo appointment={appointment} />
          <PeopleInfo appointment={appointment} />
          <LocationInfo appointment={appointment} />
          <MeetingInfo appointment={appointment} />
        </div>
      ),
    },
    {
      id: "participants",
      title: "Katılımcılar",
      label: "Katılımcılar",
      icon: "ph ph-users",
      content: (
        <div className="row">
          <ParticipantsInfo appointment={appointment} />
        </div>
      ),
    },
    {
      id: "outcome",
      title: "Sonuç & Takip",
      label: "Sonuç & Takip",
      icon: "ph ph-chart-line",
      content: (
        <div className="row">
          <OutcomeInfo appointment={appointment} />
          <EnhancedInfo appointment={appointment} />
          <SurveyInfo appointment={appointment} />
        </div>
      ),
    },
    {
      id: "notes",
      title: "Notlar & Geçmiş",
      label: "Notlar & Geçmiş",
      icon: "ph ph-note",
      content: (
        <div className="row">
          <NotesInfo appointment={appointment} />
          <CancellationInfo appointment={appointment} />
          <StatisticsInfo appointment={appointment} />
        </div>
      ),
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      ariaLabel={`Randevu Detayları - ${
        appointment.appointmentNumber || "N/A"
      }`}
      scrollable
      closeOnBackdropClick={true}
      animated={true}
    >
      <ModalHeader
        title={
          appointment.title ||
          `Randevu Detayları - ${appointment.appointmentNumber || "N/A"}`
        }
        onClose={onClose}
      />

      <ModalBody scrollable className="p-0">
        {/* Tab Navigation */}
        <div className="border-bottom border-neutral-30 px-24 pt-20 pb-16">
          <TabNavigation tabs={tabs} size="xs" allowMultiline={false} />
        </div>

        {/* Tab Content */}
        <div className="px-24 py-20">
          <TabContent tabs={tabs} />
        </div>
      </ModalBody>

      <ModalFooter className="bg-neutral-25 border-top border-neutral-30">
        <div className="d-flex justify-content-between align-items-center w-100">
          <div className="d-flex gap-12">
            <Button variant="outline" size="sm" onClick={handleEdit}>
              <i className="ph ph-pencil me-8 text-md"></i>
              Düzenle
            </Button>
            {appointment.canReschedule && (
              <Button variant="outline" size="sm">
                <i className="ph ph-calendar-x me-8 text-md"></i>
                Ertele
              </Button>
            )}
            {appointment.canCancel && (
              <Button variant="error" size="sm">
                <i className="ph ph-x-circle me-8 text-md"></i>
                İptal Et
              </Button>
            )}
          </div>
          <div className="d-flex gap-12">
            <Button variant="outline" size="sm" onClick={onClose}>
              <i className="ph ph-x me-8 text-md"></i>
              Kapat
            </Button>
            {appointment.canComplete && (
              <Button variant="success" size="sm">
                <i className="ph ph-check me-8 text-md"></i>
                Tamamla
              </Button>
            )}
          </div>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default AppointmentDetail;
