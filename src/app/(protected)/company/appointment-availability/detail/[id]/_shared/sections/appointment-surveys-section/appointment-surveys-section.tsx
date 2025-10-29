"use client";

import React, { useState } from "react";
import { CustomCard } from "@/components";
import { Button } from "@/components/ui/button";
import { useAppointmentDetail } from "../../context";
import { SurveyItem } from "./survey-item";
import { useSnackbar } from "@/contexts";

export const AppointmentSurveysSection: React.FC = () => {
  const {
    surveys,
    appointmentSurveysLoading: isLoading,
    appointmentSurveysError: error,
    selectSurvey,
    selectedSurveyId,
    submitSurvey,
    surveySubmitLoading,
  } = useAppointmentDetail();

  const { showSnackbar } = useSnackbar();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!selectedSurveyId) {
      showSnackbar("Lütfen bir anket seçiniz", "warning");
      return;
    }

    try {
      setIsSubmitting(true);
      await submitSurvey(selectedSurveyId);
      showSnackbar("Anket başarıyla gönderildi", "success");
    } catch (err) {
      showSnackbar("Anket gönderilemedi. Lütfen tekrar deneyin.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <CustomCard title="Anketler" subtitle="Yükleniyor..." className="h-100">
        <div className="text-center py-5">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Yükleniyor...</span>
          </div>
          <p className="text-muted mb-0">Anketler yükleniyor...</p>
        </div>
      </CustomCard>
    );
  }

  if (error) {
    return (
      <CustomCard title="Anketler" subtitle="Hata oluştu" className="h-100">
        <div className="text-center py-5">
          <div className="mb-3">
            <i
              className="ph ph-warning-circle text-danger"
              style={{ fontSize: "3rem" }}
            ></i>
          </div>
          <h6 className="text-danger mb-2">Yükleme Hatası</h6>
          <p className="text-muted small mb-0">
            Anketler yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin.
          </p>
        </div>
      </CustomCard>
    );
  }

  if (!surveys || !Array.isArray(surveys) || surveys.length === 0) {
    return (
      <CustomCard
        title="Anketler"
        subtitle="Anket bulunamadı"
        className="h-100"
      >
        <div className="text-center py-5">
          <div className="mb-3">
            <i
              className="ph ph-clipboard-text text-muted"
              style={{ fontSize: "3rem" }}
            ></i>
          </div>
          <h6 className="text-muted mb-2">Henüz Anket Eklenmemiş</h6>
          <p className="text-muted small mb-0">
            Bu randevu için kullanılabilir anket bulunmuyor.
          </p>
        </div>
      </CustomCard>
    );
  }

  const selectedSurvey = surveys.find((s) => s.id === selectedSurveyId);

  return (
    <CustomCard
      title="Anketler"
      subtitle="Kullanıcıya göndermek için bir anket seçiniz"
      className="h-100"
    >
      <div className="position-relative">
        {/* Survey List */}
        <div className="pe-2 d-flex flex-column gap-16">
          {surveys.map((survey) => (
            <SurveyItem
              key={survey.id}
              survey={survey}
              isSelected={selectedSurveyId === survey.id}
              onSelect={selectSurvey}
            />
          ))}
        </div>

        {/* Submit Section */}
        <div className="surveys-submit-section">
          {selectedSurvey && (
            <div className="submit-info">
              <div className="info-content">
                <i className="ph-fill ph-info"></i>
                <div className="info-text">
                  <div className="info-title">
                    {selectedSurvey.templateName}
                  </div>
                  <p className="info-desc">
                    Bu anketi göndermek üzeresiniz. Anket{" "}
                    {selectedSurvey.questions?.length || 0} soru içermektedir.
                  </p>
                </div>
              </div>
            </div>
          )}

          <Button
            variant="inline"
            fullWidth
            onClick={handleSubmit}
            disabled={!selectedSurveyId || isSubmitting || surveySubmitLoading}
          >
            {isSubmitting || surveySubmitLoading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                <span>Gönderiliyor...</span>
              </>
            ) : (
              <>
                <i className="ph-fill ph-paper-plane-tilt"></i>
                <span>Anketi Gönder</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </CustomCard>
  );
};
