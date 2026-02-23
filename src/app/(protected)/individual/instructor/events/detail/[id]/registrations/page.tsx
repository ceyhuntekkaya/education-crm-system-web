"use client";

import React, { useMemo, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { usePageTitle } from "@/hooks";
import { DataCollectionLayout } from "@/components/layouts/data-collection-layout";
import { useEventDetailContext } from "../_shared/context/event-detail-context";
import { useRegistrationsContext } from "./_shared/context";
import {
  RegistrationCard,
  UpdateStatusModal,
  AttendanceModal,
  DeleteRegistrationModal,
} from "./_shared/sections";
import {
  createRegistrationColumns,
  REGISTRATION_POPOVER_FILTERS,
  REGISTRATION_SORT_OPTIONS,
} from "./_shared/config";
import type { EventRegistrationDto } from "@/types";

const EventRegistrationsPage: React.FC = () => {
  const router = useRouter();
  const { event, eventId } = useEventDetailContext();
  const { registrations, registrationsLoading, refetch } =
    useRegistrationsContext();

  usePageTitle(event ? `${event.title} — Kayıtlar` : "Etkinlik Kayıtları");

  // ── Modal state ──────────────────────────────────────────────────────────
  const [selectedReg, setSelectedReg] = useState<EventRegistrationDto | null>(
    null,
  );
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [attendanceModalOpen, setAttendanceModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const openStatus = useCallback((reg: EventRegistrationDto) => {
    setSelectedReg(reg);
    setStatusModalOpen(true);
  }, []);
  const openAttendance = useCallback((reg: EventRegistrationDto) => {
    setSelectedReg(reg);
    setAttendanceModalOpen(true);
  }, []);
  const openDelete = useCallback((reg: EventRegistrationDto) => {
    setSelectedReg(reg);
    setDeleteModalOpen(true);
  }, []);

  // ── Config ───────────────────────────────────────────────────────────────
  const callbacks = useMemo(
    () => ({
      onStatusClick: openStatus,
      onAttendanceClick: openAttendance,
      onDeleteClick: openDelete,
    }),
    [openStatus, openAttendance, openDelete],
  );

  const columns = useMemo(
    () => createRegistrationColumns(callbacks),
    [callbacks],
  );
  const filters = useMemo(() => REGISTRATION_POPOVER_FILTERS, []);
  const sortOptions = useMemo(() => REGISTRATION_SORT_OPTIONS, []);

  const actionButtons = useMemo(
    () => [
      {
        label: "Etkinliğe Dön",
        icon: "ph-arrow-left",
        onClick: () =>
          router.push(`/individual/instructor/events/detail/${eventId}`),
        variant: "secondary" as const,
      },
    ],
    [router, eventId],
  );

  return (
    <>
      <DataCollectionLayout<EventRegistrationDto>
        // ═══ HEADER ═══════════════════════════════════════════════════════
        header={{
          title: "Etkinlik Kayıtları",
          subtitle: event
            ? `"${event.title}" etkinliğine ait katılımcı kayıtları`
            : "Etkinliğe ait katılımcı kayıtları",
          icon: "ph-users",
          actionButtons,
        }}
        // ═══ DATA ═════════════════════════════════════════════════════════
        data={{
          data: registrations,
          loading: registrationsLoading,
        }}
        // ═══ VIEW ═════════════════════════════════════════════════════════
        view={{
          defaultMode: "grid",
          enableToggle: true,
          grid: {
            renderCard: ({ item }: { item: EventRegistrationDto }) => (
              <RegistrationCard
                registration={item}
                onStatusClick={openStatus}
                onAttendanceClick={openAttendance}
                onDeleteClick={openDelete}
              />
            ),
            col: 4,
          },
          list: {
            columns,
          },
        }}
        // ═══ FILTERS ══════════════════════════════════════════════════════
        filters={{ enabled: true, options: filters }}
        // ═══ SORT ═════════════════════════════════════════════════════════
        sort={{ enabled: true, options: sortOptions }}
        // ═══ SEARCH ═══════════════════════════════════════════════════════
        search={{
          enabled: true,
          placeholder: "Öğretmen adı veya e-posta ara...",
          fields: ["teacherName", "teacherEmail", "registrationNote"],
        }}
        // ═══ STATES ═══════════════════════════════════════════════════════
        states={{
          empty: {
            title: "Henüz Kayıt Yok",
            description: "Bu etkinliğe henüz hiç kayıt yapılmamış.",
            icon: "ph-users",
          },
        }}
      />

      {/* ── Modals ── */}
      <UpdateStatusModal
        isOpen={statusModalOpen}
        onClose={() => setStatusModalOpen(false)}
        registration={selectedReg}
        onSuccess={refetch}
      />
      <AttendanceModal
        isOpen={attendanceModalOpen}
        onClose={() => setAttendanceModalOpen(false)}
        registration={selectedReg}
        onSuccess={refetch}
      />
      <DeleteRegistrationModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        registration={selectedReg}
        onSuccess={refetch}
      />
    </>
  );
};

export default EventRegistrationsPage;
