"use client";

import React from "react";
import { Form, FormValues, FormStarIcon } from "@/components/forms";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui";
import { useFormHook } from "@/hooks";
import { useForm } from "@/contexts/form-context";
import { useSurveyList } from "../../../context/survey-context";
import { SurveyQuestionResponseDto } from "@/types";
import { SurveyEvaluationFormValues } from "../schemas/initial-values";

// Rating category Türkçe çevirileri
const getRatingCategoryName = (category?: string): string => {
  if (!category) return "";

  const categoryMap: { [key: string]: string } = {
    OVERALL_SATISFACTION: "Genel Memnuniyet",
    CLEANLINESS: "Temizlik",
    STAFF_FRIENDLINESS: "Personel Davranışı",
    FACILITIES: "Tesisler",
    COMMUNICATION: "İletişim",
    PROFESSIONALISM: "Profesyonellik",
    VALUE_FOR_MONEY: "Fiyat/Performans",
    RECOMMENDATION: "Tavsiye",
    ACADEMIC_QUALITY: "Akademik Kalite",
    INFRASTRUCTURE: "Alt Yapı",
    EXTRACURRICULAR: "Sosyal Aktiviteler",
    SAFETY: "Güvenlik",
    TRANSPORTATION: "Ulaşım",
    CAFETERIA: "Kafeterya",
    TECHNOLOGY: "Teknoloji",
    CUSTOM: "Özel",
  };

  return categoryMap[category] || category;
};

/**
 * Survey Evaluation Form Content - Protected area için
 * Context'ten survey verilerini alır - Sadece görüntüleme amaçlı
 */
export const SurveyEvaluationFormContent: React.FC = () => {
  // Form hook - validation ve error kontrolü için
  const { hasErrors } = useFormHook();

  // Form reset hook'u
  const { reset } = useForm();

  // Context'ten survey işlemlerini al
  const {
    selectedSurvey,
    submitEvaluation,
    submissionLoading,
    closeEvaluationModal,
  } = useSurveyList();

  if (!selectedSurvey) return null;

  const survey = selectedSurvey;

  const handleSubmit = async (values: SurveyEvaluationFormValues) => {
    if (!survey.id) return;

    await submitEvaluation(values);
  };

  const handleCancel = () => {
    reset();
    closeEvaluationModal(); // Modal'ı kapat
  };

  // RATING_STAR tipindeki question responses'ları filtrele
  const ratingStarQuestions =
    survey.questionResponses?.filter(
      (qr) => qr.questionType === "RATING_STAR"
    ) || [];

  if (!survey.questionResponses?.length) {
    return (
      <div
        className="text-center py-32"
        data-aos="fade-in"
        data-aos-duration="400"
      >
        <div className="mb-16">
          <Icon
            icon="ph-question"
            className="text-neutral-300 text-4xl"
            size="lg"
          />
        </div>
        <h6 className="text-neutral-600 mb-8">Henüz Cevap Yok</h6>
        <p className="text-neutral-500 text-sm">
          Bu anket için henüz cevap bulunmamaktadır.
        </p>
      </div>
    );
  }

  if (!ratingStarQuestions.length) {
    return (
      <div
        className="text-center py-32"
        data-aos="fade-in"
        data-aos-duration="400"
      >
        <div className="mb-16">
          <Icon
            icon="ph-star"
            className="text-warning-300 text-4xl"
            size="lg"
          />
        </div>
        <h6 className="text-neutral-600 mb-8">Yıldız Değerlendirmesi Yok</h6>
        <p className="text-neutral-500 text-sm">
          Bu ankette yıldız değerlendirmesi içeren cevap bulunmamaktadır.
          <br />
          Sadece yıldız değerlendirme tipindeki cevaplar görüntülenmektedir.
        </p>
      </div>
    );
  }

  return (
    <div className="survey-evaluation-content">
      {/* SURVEY HEADER */}
      <div className="mb-32" data-aos="fade-down" data-aos-duration="400">
        <div className="text-center mb-24">
          <h4 className="text-neutral-800 mb-8">
            {survey.surveyTitle || "Anket Değerlendirmesi"}
          </h4>

          <p className="text-neutral-600 mb-0">
            {survey.formattedCompletionTime &&
              `Tamamlama Süresi: ${survey.formattedCompletionTime}`}
            {survey.completedAt &&
              ` • Tamamlanma: ${new Date(survey.completedAt).toLocaleDateString(
                "tr-TR"
              )}`}
          </p>
        </div>
      </div>

      {/* EVALUATION FORM */}
      <Form onSubmit={handleSubmit}>
        {/* <FormValues /> */}

        {/* RATING QUESTIONS */}
        <div className="questions-container">
          {ratingStarQuestions
            .sort((a, b) => (a.responseOrder || 0) - (b.responseOrder || 0))
            .map((questionResponse, index) => {
              if (!questionResponse.questionId) return null;

              const fieldName = `question_${questionResponse.questionId}`;

              return (
                <div
                  key={questionResponse.questionId}
                  className="question-item mb-24"
                >
                  <div className="bg-white border border-neutral-30 rounded-12 p-24">
                    <div className="row align-items-center">
                      {/* Sol taraf - Soru */}
                      <div className="col-8">
                        <div className="d-flex align-items-start gap-16">
                          <div className="question-number w-32 h-32 bg-main-600 text-white rounded-circle d-flex align-items-center justify-content-center text-sm fw-bold flex-shrink-0">
                            {index + 1}
                          </div>
                          <div className="w-100">
                            <h6 className="text-neutral-800 mb-8 fw-medium text-lg">
                              {questionResponse.questionText}
                            </h6>
                            <div className="d-flex align-items-center gap-8 mb-8">
                              {questionResponse.ratingCategory && (
                                <span className="badge bg-info-100 text-info-600 text-xs px-8 py-4 rounded-6">
                                  {getRatingCategoryName(
                                    questionResponse.ratingCategory
                                  )}
                                </span>
                              )}
                              {questionResponse.formattedResponse && (
                                <span className="text-warning-600 text-sm fw-medium">
                                  {questionResponse.formattedResponse}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Sağ taraf - Rating */}
                      <div className="col-4">
                        <div className="rating-section">
                          <div className="d-flex align-items-center justify-content-end gap-12">
                            <div className="text-center">
                              <FormStarIcon
                                name={fieldName}
                                max={5}
                                size="lg"
                                value={questionResponse.ratingResponse || 0}
                                readOnly={true} // Protected alanda sadece görüntüleme
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        {/* FORM ACTIONS */}
        <div
          className="mt-40 pt-24 border-t border-neutral-30"
          data-aos="fade-up"
          data-aos-duration="400"
          data-aos-delay="200"
        >
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-16">
              <div className="d-flex align-items-center gap-8">
                <Icon icon="ph-star-four" className="text-warning-500" />
                <span className="text-sm text-neutral-600">
                  {ratingStarQuestions.length} yıldız değerlendirmesi
                </span>
              </div>
              {survey.generalFeedback && (
                <div className="d-flex align-items-center gap-8">
                  <Icon icon="ph-chat-text" className="text-info-500" />
                  <span className="text-sm text-neutral-600">
                    Geri bildirim mevcut
                  </span>
                </div>
              )}
            </div>

            <div className="d-flex gap-12">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={submissionLoading}
              >
                Kapat
              </Button>
            </div>
          </div>

          {/* ADDITIONAL INFO */}
          {(survey.generalFeedback || survey.suggestions) && (
            <div className="mt-24 pt-20 border-t border-neutral-30">
              <div className="row">
                {survey.generalFeedback && (
                  <div className="col-6">
                    <div className="bg-neutral-50 border border-neutral-200 rounded-12 p-16">
                      <h6 className="text-neutral-700 mb-8 fw-medium d-flex align-items-center gap-8">
                        <Icon
                          icon="ph-chat-text"
                          className="text-neutral-500"
                        />
                        Genel Geri Bildirim
                      </h6>
                      <p className="text-neutral-600 mb-0 text-sm">
                        &ldquo;{survey.generalFeedback}&rdquo;
                      </p>
                    </div>
                  </div>
                )}
                {survey.suggestions && (
                  <div className="col-6">
                    <div className="bg-success-50 border border-success-200 rounded-12 p-16">
                      <h6 className="text-success-700 mb-8 fw-medium d-flex align-items-center gap-8">
                        <Icon
                          icon="ph-lightbulb"
                          className="text-success-500"
                        />
                        Öneriler
                      </h6>
                      <p className="text-success-600 mb-0 text-sm">
                        &ldquo;{survey.suggestions}&rdquo;
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </Form>
    </div>
  );
};
