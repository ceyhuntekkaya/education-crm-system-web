"use client";

import React from "react";
import { MessageDto } from "@/types/dto/content/MessageDto";
import { Icon } from "@/components/ui/icon";
import { Badge } from "./badge";
import CustomCard from "@/components/ui/custom-card";

interface MessagePaneProps {
  message: MessageDto | null;
}

export const MessagePane: React.FC<MessagePaneProps> = ({ message }) => {
  // Format date helper
  const formatDateTime = (dateString?: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get status badge variant
  const getStatusBadgeVariant = (
    status?: string
  ): "primary" | "secondary" | "success" | "danger" | "warning" | "info" => {
    switch (status) {
      case "NEW":
        return "info";
      case "READ":
        return "secondary";
      case "IN_PROGRESS":
        return "warning";
      case "RESOLVED":
        return "success";
      case "CLOSED":
        return "secondary";
      default:
        return "primary";
    }
  };

  // Get priority badge variant
  const getPriorityBadgeVariant = (
    priority?: string
  ): "primary" | "secondary" | "success" | "danger" | "warning" | "info" => {
    switch (priority) {
      case "CRITICAL":
      case "URGENT":
        return "danger";
      case "HIGH":
        return "warning";
      case "NORMAL":
        return "info";
      case "LOW":
        return "success";
      default:
        return "primary";
    }
  };

  if (!message) {
    return (
      <div className="message-pane-container bg-neutral-25 d-flex align-items-center justify-content-center flex-fill">
        <div className="text-center p-48">
          <Icon
            icon="ph-chat-circle-text"
            size="lg"
            className="text-neutral-400 mb-16"
          />
          <h5 className="text-neutral-600 mb-8">Mesaj Seçilmedi</h5>
          <p className="text-neutral-500 fs-14 mb-0">
            Mesaj detaylarını görmek için sol taraftan bir konuşma seçin
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="message-pane-container bg-neutral-25 flex-fill overflow-auto">
      <div className="container-fluid py-24 px-32">
        {/* Message Header Card */}
        <CustomCard
          className="mb-16"
          padding="p-20"
          bgColor="bg-white"
          borderRadius="rounded-12"
        >
          <div className="d-flex align-items-start justify-content-between mb-16">
            <div className="flex-fill">
              <h4 className="text-heading mb-8">
                {message.subject || "Konu Yok"}
              </h4>
              <div className="d-flex align-items-center gap-8 flex-wrap">
                <Badge
                  variant={getStatusBadgeVariant(message.status)}
                  size="sm"
                >
                  {message.status || "Durum Yok"}
                </Badge>
                <Badge
                  variant={getPriorityBadgeVariant(message.priority)}
                  size="sm"
                >
                  {message.priority || "Öncelik Yok"}
                </Badge>
                {message.messageType && (
                  <Badge variant="info" size="sm">
                    {message.messageType}
                  </Badge>
                )}
              </div>
            </div>
            <div className="d-flex align-items-center gap-8">
              <Icon
                icon="ph-arrow-bend-up-left"
                size="sm"
                variant="inline"
                hoverText="Yanıtla"
                className="cursor-pointer"
              />
              <Icon
                icon="ph-arrow-bend-double-up-right"
                size="sm"
                variant="inline"
                hoverText="İlet"
                className="cursor-pointer"
              />
              <Icon
                icon="ph-archive"
                size="sm"
                variant="inline"
                hoverText="Arşivle"
                className="cursor-pointer"
              />
            </div>
          </div>

          {/* Reference Number */}
          {message.referenceNumber && (
            <div className="d-flex align-items-center gap-8 mb-12">
              <Icon icon="ph-hash" size="sm" className="text-neutral-500" />
              <span className="fs-13 text-neutral-600">
                {message.referenceNumber}
              </span>
            </div>
          )}
        </CustomCard>

        {/* Sender Info Card */}
        <CustomCard
          title="Gönderen Bilgileri"
          className="mb-16"
          padding="p-0"
          headerPadding="p-16"
          bgColor="bg-white"
          borderRadius="rounded-12"
          size="sm"
        >
          <div className="p-20">
            <div className="row g-16">
              <div className="col-md-6">
                <div className="d-flex align-items-start gap-12">
                  <Icon
                    icon="ph-user"
                    size="sm"
                    className="text-primary-600 mt-4"
                  />
                  <div>
                    <p className="fs-12 text-neutral-500 mb-4">Ad Soyad</p>
                    <p className="fs-14 text-heading mb-0 fw-medium">
                      {message.senderName ||
                        message.senderUser?.fullName ||
                        "-"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex align-items-start gap-12">
                  <Icon
                    icon="ph-envelope"
                    size="sm"
                    className="text-primary-600 mt-4"
                  />
                  <div>
                    <p className="fs-12 text-neutral-500 mb-4">E-posta</p>
                    <p className="fs-14 text-heading mb-0 fw-medium">
                      {message.senderEmail || "-"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex align-items-start gap-12">
                  <Icon
                    icon="ph-phone"
                    size="sm"
                    className="text-primary-600 mt-4"
                  />
                  <div>
                    <p className="fs-12 text-neutral-500 mb-4">Telefon</p>
                    <p className="fs-14 text-heading mb-0 fw-medium">
                      {message.senderPhone || "-"}
                    </p>
                  </div>
                </div>
              </div>
              {message.school && (
                <div className="col-md-6">
                  <div className="d-flex align-items-start gap-12">
                    <Icon
                      icon="ph-buildings"
                      size="sm"
                      className="text-primary-600 mt-4"
                    />
                    <div>
                      <p className="fs-12 text-neutral-500 mb-4">Okul</p>
                      <p className="fs-14 text-heading mb-0 fw-medium">
                        {message.school.name}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CustomCard>

        {/* Message Content Card */}
        <CustomCard
          title="Mesaj İçeriği"
          className="mb-16"
          padding="p-0"
          headerPadding="p-16"
          bgColor="bg-white"
          borderRadius="rounded-12"
          size="sm"
        >
          <div className="p-20">
            <div className="message-content">
              <p
                className="fs-14 text-heading mb-0"
                style={{ whiteSpace: "pre-wrap" }}
              >
                {message.content || "İçerik bulunmuyor"}
              </p>
            </div>
          </div>
        </CustomCard>

        {/* Student Info Card (if available) */}
        {(message.studentName || message.gradeInterested) && (
          <CustomCard
            title="Öğrenci Bilgileri"
            className="mb-16"
            padding="p-0"
            headerPadding="p-16"
            bgColor="bg-white"
            borderRadius="rounded-12"
            size="sm"
          >
            <div className="p-20">
              <div className="row g-16">
                {message.studentName && (
                  <div className="col-md-6">
                    <div className="d-flex align-items-start gap-12">
                      <Icon
                        icon="ph-student"
                        size="sm"
                        className="text-primary-600 mt-4"
                      />
                      <div>
                        <p className="fs-12 text-neutral-500 mb-4">
                          Öğrenci Adı
                        </p>
                        <p className="fs-14 text-heading mb-0 fw-medium">
                          {message.studentName}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                {message.studentAge && (
                  <div className="col-md-6">
                    <div className="d-flex align-items-start gap-12">
                      <Icon
                        icon="ph-calendar"
                        size="sm"
                        className="text-primary-600 mt-4"
                      />
                      <div>
                        <p className="fs-12 text-neutral-500 mb-4">Yaş</p>
                        <p className="fs-14 text-heading mb-0 fw-medium">
                          {message.studentAge}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                {message.gradeInterested && (
                  <div className="col-md-6">
                    <div className="d-flex align-items-start gap-12">
                      <Icon
                        icon="ph-graduation-cap"
                        size="sm"
                        className="text-primary-600 mt-4"
                      />
                      <div>
                        <p className="fs-12 text-neutral-500 mb-4">
                          İlgi Duyulan Sınıf
                        </p>
                        <p className="fs-14 text-heading mb-0 fw-medium">
                          {message.gradeInterested}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                {message.enrollmentYear && (
                  <div className="col-md-6">
                    <div className="d-flex align-items-start gap-12">
                      <Icon
                        icon="ph-calendar-blank"
                        size="sm"
                        className="text-primary-600 mt-4"
                      />
                      <div>
                        <p className="fs-12 text-neutral-500 mb-4">
                          Kayıt Yılı
                        </p>
                        <p className="fs-14 text-heading mb-0 fw-medium">
                          {message.enrollmentYear}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CustomCard>
        )}

        {/* Timing Info Card */}
        <CustomCard
          title="Zaman Bilgileri"
          className="mb-16"
          padding="p-0"
          headerPadding="p-16"
          bgColor="bg-white"
          borderRadius="rounded-12"
          size="sm"
        >
          <div className="p-20">
            <div className="row g-16">
              <div className="col-md-6">
                <div className="d-flex align-items-start gap-12">
                  <Icon
                    icon="ph-calendar-plus"
                    size="sm"
                    className="text-primary-600 mt-4"
                  />
                  <div>
                    <p className="fs-12 text-neutral-500 mb-4">Oluşturma</p>
                    <p className="fs-14 text-heading mb-0 fw-medium">
                      {formatDateTime(message.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
              {message.readAt && (
                <div className="col-md-6">
                  <div className="d-flex align-items-start gap-12">
                    <Icon
                      icon="ph-eye"
                      size="sm"
                      className="text-primary-600 mt-4"
                    />
                    <div>
                      <p className="fs-12 text-neutral-500 mb-4">Okunma</p>
                      <p className="fs-14 text-heading mb-0 fw-medium">
                        {formatDateTime(message.readAt)}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {message.firstResponseAt && (
                <div className="col-md-6">
                  <div className="d-flex align-items-start gap-12">
                    <Icon
                      icon="ph-chat-circle-text"
                      size="sm"
                      className="text-primary-600 mt-4"
                    />
                    <div>
                      <p className="fs-12 text-neutral-500 mb-4">İlk Yanıt</p>
                      <p className="fs-14 text-heading mb-0 fw-medium">
                        {formatDateTime(message.firstResponseAt)}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {message.resolvedAt && (
                <div className="col-md-6">
                  <div className="d-flex align-items-start gap-12">
                    <Icon
                      icon="ph-check-circle"
                      size="sm"
                      className="text-primary-600 mt-4"
                    />
                    <div>
                      <p className="fs-12 text-neutral-500 mb-4">Çözüm</p>
                      <p className="fs-14 text-heading mb-0 fw-medium">
                        {formatDateTime(message.resolvedAt)}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CustomCard>

        {/* Internal Notes Card (if available) */}
        {message.internalNotes && (
          <CustomCard
            title="Dahili Notlar"
            className="mb-16"
            padding="p-0"
            headerPadding="p-16"
            bgColor="bg-warning-25"
            borderRadius="rounded-12"
            size="sm"
          >
            <div className="p-20">
              <p
                className="fs-14 text-heading mb-0"
                style={{ whiteSpace: "pre-wrap" }}
              >
                {message.internalNotes}
              </p>
            </div>
          </CustomCard>
        )}

        {/* Satisfaction Rating (if available) */}
        {message.satisfactionRating && (
          <CustomCard
            title="Memnuniyet Değerlendirmesi"
            className="mb-16"
            padding="p-0"
            headerPadding="p-16"
            bgColor="bg-white"
            borderRadius="rounded-12"
            size="sm"
          >
            <div className="p-20">
              <div className="d-flex align-items-center gap-8 mb-12">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Icon
                    key={star}
                    icon={
                      star <= message.satisfactionRating!
                        ? "ph-star-fill"
                        : "ph-star"
                    }
                    size="sm"
                    className={
                      star <= message.satisfactionRating!
                        ? "text-warning-600"
                        : "text-neutral-300"
                    }
                  />
                ))}
              </div>
              {message.satisfactionFeedback && (
                <p className="fs-14 text-heading mb-0">
                  {message.satisfactionFeedback}
                </p>
              )}
            </div>
          </CustomCard>
        )}
      </div>
    </div>
  );
};

export default MessagePane;
