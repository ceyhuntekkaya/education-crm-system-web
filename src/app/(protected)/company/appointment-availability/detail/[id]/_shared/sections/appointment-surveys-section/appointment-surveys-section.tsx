"use client";

import React from "react";
import { CustomCard } from "@/components";
import { Button } from "@/components/ui/button";
import { useAppointmentDetail } from "../../context";
import { SurveyItem } from "./survey-item";
import { useAuth } from "@/contexts";
import { useCompany } from "../../../../../../_shared/context";
import { SurveyAssignmentDto } from "@/types/dto/survey/SurveyAssignmentDto";

export const AppointmentSurveysSection: React.FC = () => {
  const { user } = useAuth();
  const { selectedSchool } = useCompany();

  const {
    appointmentId,
    appointment,
    surveys,
    appointmentSurveysLoading: isLoading,
    appointmentSurveysError: error,
    selectSurvey,
    selectedSurveyId,
    clearSelection,
    createSurvey,
    surveyCreateLoading,
  } = useAppointmentDetail();

  const handleSubmit = async () => {
    if (!selectedSurveyId) return;

    const createDto: SurveyAssignmentDto = {
      surveyId: selectedSurveyId,
      appointmentId,
      schoolId: selectedSchool?.id,
      attendId: appointment?.parentUserId,
    };

    const result = await createSurvey(createDto);

    // Anket başarıyla gönderildiyse seçimi temizle
    if (result) {
      clearSelection();
    }
  };

  const isEmpty = !surveys || !Array.isArray(surveys) || surveys.length === 0;
  const selectedSurvey = surveys?.find((s) => s.id === selectedSurveyId);

  return (
    <CustomCard
      title="Anketler"
      subtitle="Kullanıcıya göndermek için bir anket seçiniz"
      isLoading={isLoading}
      isError={!!error}
      isEmpty={isEmpty}
    >
      <div className="position-relative">
        {/* Survey List */}
        <div className="pe-2 d-flex flex-column gap-16">
          {surveys?.map((survey) => (
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
                  <div className="info-title">{selectedSurvey.title}</div>
                  <p className="info-desc">
                    Bu anketi göndermek üzeresiniz. Anket{" "}
                    {selectedSurvey.questions?.length || 0} soru içermektedir.
                    {selectedSurvey.estimatedDuration && (
                      <span>
                        {" "}
                        Tahmini süre: {selectedSurvey.estimatedDuration}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          )}

          <Button
            variant="inline"
            fullWidth
            onClick={handleSubmit}
            disabled={!selectedSurveyId || surveyCreateLoading}
            loading={surveyCreateLoading}
            leftIcon="ph-fill ph-paper-plane-tilt"
          >
            Anketi Gönder
          </Button>
        </div>
      </div>
    </CustomCard>
  );
};
