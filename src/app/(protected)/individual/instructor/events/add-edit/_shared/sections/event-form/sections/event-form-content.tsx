"use client";

import React from "react";
import { useForm } from "@/contexts/form-context";
import {
  Form,
  FormInput,
  FormTextarea,
  FormAutocomplete,
  FormCheckbox,
} from "@/components/forms";
import { FileInput } from "@/components/file-input";
import { Button } from "@/components/ui/button";
import { Divider } from "@/components";
import { useFormHook } from "@/hooks";
import { useEventAddEdit } from "../../../context/event-add-edit-context";
import { useRouter } from "next/navigation";
import { useEventsContext } from "@/app/(protected)/individual/instructor/events/_shared/contexts";
import { useGetOrganizers } from "@/app/(protected)/individual/instructor/organizers/_shared/hooks/api";
import type { EventCreateDto, EventUpdateDto } from "@/types";

const EVENT_TYPE_OPTIONS = [
  { label: "Webinar", value: "WEBINAR" },
  { label: "Seminer", value: "SEMINAR" },
  { label: "Eğitim", value: "TRAINING" },
  { label: "Atölye", value: "WORKSHOP" },
];

const DELIVERY_FORMAT_OPTIONS = [
  { label: "Online", value: "ONLINE" },
  { label: "Yüz Yüze", value: "IN_PERSON" },
  { label: "Hibrit", value: "HYBRID" },
];

const STATUS_OPTIONS = [
  { label: "Taslak", value: "DRAFT" },
  { label: "Yayında", value: "PUBLISHED" },
  { label: "Tamamlandı", value: "COMPLETED" },
  { label: "İptal Edildi", value: "CANCELLED" },
];

export const EventFormContent: React.FC = () => {
  const { hasErrors } = useFormHook();
  const { reset } = useForm();
  const router = useRouter();
  const { refetch } = useEventsContext();
  const { isEditMode, eventId, postEvent, putEvent, eventSubmitLoading } =
    useEventAddEdit();

  // Organizatör listesini API'den çek
  const { data: organizersData, loading: organizersLoading } = useGetOrganizers(
    { page: 0, size: 100 },
  );
  const organizerOptions = React.useMemo(
    () =>
      (organizersData?.data?.content ?? []).map((org) => ({
        value: String(org.id),
        label: org.name,
      })),
    [organizersData],
  );

  const handleSubmit = async (values: any) => {
    let success = false;

    if (isEditMode) {
      const updateData: EventUpdateDto = {
        organizerId: values.organizerId
          ? Number(values.organizerId)
          : undefined,
        title: values.title || undefined,
        description: values.description || undefined,
        eventType: values.eventType || undefined,
        deliveryFormat: values.deliveryFormat || undefined,
        startDateTime: values.startDateTime || undefined,
        endDateTime: values.endDateTime || undefined,
        maxCapacity: values.maxCapacity || undefined,
        location: values.location || undefined,
        onlineLink: values.onlineLink || undefined,
        targetAudience: values.targetAudience || undefined,
        speakerName: values.speakerName || undefined,
        speakerBio: values.speakerBio || undefined,
        coverImageUrl: values.coverImageUrl || undefined,
        registrationDeadline: values.registrationDeadline || undefined,
        categoryId: values.categoryId || undefined,
        autoApproveRegistration: values.autoApproveRegistration,
        certificateEnabled: values.certificateEnabled,
        certificateTemplateUrl: values.certificateTemplateUrl || undefined,
        status: values.status || undefined,
      };
      const result = await putEvent(updateData);
      success = !!result;
    } else {
      const createData: EventCreateDto = {
        organizerId: Number(values.organizerId),
        title: values.title,
        description: values.description || undefined,
        eventType: values.eventType,
        deliveryFormat: values.deliveryFormat,
        startDateTime: values.startDateTime,
        endDateTime: values.endDateTime,
        maxCapacity: values.maxCapacity || undefined,
        location: values.location || undefined,
        onlineLink: values.onlineLink || undefined,
        targetAudience: values.targetAudience || undefined,
        speakerName: values.speakerName || undefined,
        speakerBio: values.speakerBio || undefined,
        coverImageUrl: values.coverImageUrl || undefined,
        registrationDeadline: values.registrationDeadline || undefined,
        categoryId: values.categoryId || undefined,
        autoApproveRegistration: values.autoApproveRegistration ?? true,
        certificateEnabled: values.certificateEnabled ?? false,
        certificateTemplateUrl: values.certificateTemplateUrl || undefined,
        status: values.status || "DRAFT",
      };
      const result = await postEvent(createData);
      success = !!result;
    }

    if (success) {
      const destination =
        isEditMode && eventId
          ? `/individual/instructor/events/detail/${eventId}`
          : "/individual/instructor/events";
      router.push(destination);
      try {
        await refetch();
      } catch (error) {
        console.error("Error during refetch:", error);
      }
    }
  };

  const handleCancel = () => {
    reset();
    router.back();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="row row-gap-24">
        {/* ─────────────── Temel Bilgiler ─────────────── */}
        <div className="col-12">
          <h5 className="mb-3">
            <i className="ph ph-calendar me-2"></i>
            Temel Bilgiler
          </h5>
        </div>

        {/* Kapak Görseli */}
        <div className="col-md-4">
          <FileInput
            label="Kapak Görseli"
            name="coverImageUrl"
            type="img"
            variant="outline"
            placeholder="Görsel seçin veya sürükleyin"
            maxSize={5}
            isAutoUpload
          />
        </div>

        <div className="col-md-8">
          <div className="row row-gap-24">
            <div className="col-12">
              <FormInput
                label="Etkinlik Başlığı"
                name="title"
                isRequired
                placeholder="Örn: İleri Düzey React Workshop"
              />
            </div>

            <div className="col-md-6">
              <FormAutocomplete
                label="Etkinlik Türü"
                name="eventType"
                isRequired
                placeholder="Tür seçiniz..."
                options={EVENT_TYPE_OPTIONS}
              />
            </div>

            <div className="col-md-6">
              <FormAutocomplete
                label="Gerçekleşme Formatı"
                name="deliveryFormat"
                isRequired
                placeholder="Format seçiniz..."
                options={DELIVERY_FORMAT_OPTIONS}
              />
            </div>
          </div>
        </div>

        <div className="col-12">
          <FormTextarea
            label="Açıklama"
            name="description"
            rows={3}
            placeholder="Etkinlik hakkında kısa bir açıklama yazın..."
          />
        </div>

        {/* ─────────────── Organizatör ─────────────── */}
        <div className="col-12">
          <Divider size="xxs" />
        </div>

        <div className="col-12">
          <h5 className="mb-3">
            <i className="ph ph-buildings me-2"></i>
            Organizatör
          </h5>
        </div>

        <div className="col-md-6">
          <FormAutocomplete
            label="Organizatör"
            name="organizerId"
            isRequired
            placeholder="Organizatör seçiniz..."
            options={organizerOptions}
            isLoading={organizersLoading}
            noOptionsText="Organizatör bulunamadı"
          />
        </div>

        {/* ─────────────── Tarih & Saat ─────────────── */}
        <div className="col-12">
          <Divider size="xxs" />
        </div>

        <div className="col-12">
          <h5 className="mb-3">
            <i className="ph ph-clock me-2"></i>
            Tarih & Saat
          </h5>
        </div>

        <div className="col-md-6">
          <FormInput
            label="Başlangıç Tarihi & Saati"
            name="startDateTime"
            type="datetime-local"
            isRequired
          />
        </div>

        <div className="col-md-6">
          <FormInput
            label="Bitiş Tarihi & Saati"
            name="endDateTime"
            type="datetime-local"
            isRequired
          />
        </div>

        <div className="col-md-6">
          <FormInput
            label="Kayıt Son Tarihi"
            name="registrationDeadline"
            type="datetime-local"
          />
        </div>

        {/* ─────────────── Konum & Bağlantı ─────────────── */}
        <div className="col-12">
          <Divider size="xxs" />
        </div>

        <div className="col-12">
          <h5 className="mb-3">
            <i className="ph ph-map-pin me-2"></i>
            Konum & Bağlantı
          </h5>
        </div>

        <div className="col-md-6">
          <FormInput
            label="Konum (Fiziksel Adres)"
            name="location"
            placeholder="Örn: İTÜ Arı Teknokent, İstanbul"
          />
        </div>

        <div className="col-md-6">
          <FormInput
            label="Online Bağlantı"
            name="onlineLink"
            placeholder="Zoom, Teams vb. bağlantı"
          />
        </div>

        {/* ─────────────── Kontenjan ─────────────── */}
        <div className="col-12">
          <Divider size="xxs" />
        </div>

        <div className="col-12">
          <h5 className="mb-3">
            <i className="ph ph-ticket me-2"></i>
            Kontenjan & Hedef Kitle
          </h5>
        </div>

        <div className="col-md-6">
          <FormInput
            label="Maksimum Kontenjan"
            name="maxCapacity"
            type="number"
            placeholder="Boş bırakırsanız sınırsız olur"
          />
        </div>

        <div className="col-md-6">
          <FormInput
            label="Hedef Kitle"
            name="targetAudience"
            placeholder="Örn: Matematik öğretmenleri, Lise öğrencileri"
          />
        </div>

        {/* ─────────────── Konuşmacı ─────────────── */}
        <div className="col-12">
          <Divider size="xxs" />
        </div>

        <div className="col-12">
          <h5 className="mb-3">
            <i className="ph ph-microphone me-2"></i>
            Konuşmacı
          </h5>
        </div>

        <div className="col-md-6">
          <FormInput
            label="Konuşmacı Adı"
            name="speakerName"
            placeholder="Örn: Prof. Dr. Ahmet Yılmaz"
          />
        </div>

        <div className="col-12">
          <FormTextarea
            label="Konuşmacı Biyografisi"
            name="speakerBio"
            rows={3}
            placeholder="Konuşmacı hakkında kısa bilgi..."
          />
        </div>

        {/* ─────────────── Durum & Ayarlar ─────────────── */}
        <div className="col-12">
          <Divider size="xxs" />
        </div>

        <div className="col-12">
          <h5 className="mb-3">
            <i className="ph ph-toggles me-2"></i>
            Durum & Ayarlar
          </h5>
        </div>

        <div className="col-md-6">
          <FormAutocomplete
            label="Etkinlik Durumu"
            name="status"
            placeholder="Durum seçiniz..."
            options={STATUS_OPTIONS}
          />
        </div>

        <div className="col-md-6 d-flex flex-column gap-16">
          <div>
            <FormCheckbox
              label="Otomatik Kayıt Onayı"
              name="autoApproveRegistration"
              variant="outlined"
            />
            <small className="text-muted">
              Aktif ise kayıtlar otomatik onaylanır
            </small>
          </div>

          <div>
            <FormCheckbox
              label="Sertifika Verilsin"
              name="certificateEnabled"
              variant="outlined"
            />
            <small className="text-muted">
              Katılımcılara tamamlama sertifikası verilir
            </small>
          </div>
        </div>

        {/* Form Actions */}
        <div className="col-12">
          <div className="d-flex justify-content-end gap-12 mt-24">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={eventSubmitLoading}
            >
              İptal
            </Button>
            <Button
              type="submit"
              disabled={hasErrors || eventSubmitLoading}
              loading={eventSubmitLoading}
            >
              {isEditMode ? "Etkinliği Güncelle" : "Etkinlik Oluştur"}
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
};
