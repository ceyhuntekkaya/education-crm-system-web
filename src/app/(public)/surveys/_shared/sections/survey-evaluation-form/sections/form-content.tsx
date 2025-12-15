"use client";

import React from "react";
import { Form, FormValues, FormStarIcon } from "@/components/forms";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui";
import { useFormHook } from "@/hooks";
import { useForm } from "@/contexts/form-context";
import { useSurveyList } from "../../../context/survey-list-context";
import { SurveyDto } from "@/types";

// Form data types
export interface SurveyEvaluationFormValues {
  [questionId: string]: number; // Question ID to rating (1-5) mapping
}

/**
 * Survey Evaluation Form Content - Brand pattern'ını takip eder
 * Context'ten survey verilerini alır
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

  // RATING_STAR tipindeki soruları filtrele - questionResponses'dan al
  const ratingStarQuestions =
    survey.questionResponses?.filter(
      (qr) => qr.questionType === "RATING_STAR"
    ) || [];

  if (!survey.questionResponses?.length) {
    return (
      <div className="text-center py-8">
        <div className="mb-4">
          <Icon
            icon="ph-question"
            className="text-neutral-400"
            style={{ fontSize: "4rem" }}
          />
        </div>
        <h5 className="text-neutral-700 fw-semibold mb-2">
          Henüz Soru Response&apos;u Yok
        </h5>
        <p
          className="text-neutral-500 mb-0"
          style={{ maxWidth: "400px", margin: "0 auto" }}
        >
          Bu ankette henüz soru response&apos;u bulunmamaktadır.
        </p>
      </div>
    );
  }

  if (!ratingStarQuestions.length) {
    return (
      <div className="text-center py-8">
        <div className="mb-4">
          <Icon
            icon="ph-star"
            className="text-neutral-400"
            style={{ fontSize: "4rem" }}
          />
        </div>
        <h5 className="text-neutral-700 fw-semibold mb-2">
          Değerlendirilebilir Soru Yok
        </h5>
        <p
          className="text-neutral-500 mb-0"
          style={{ maxWidth: "400px", margin: "0 auto" }}
        >
          Bu ankette değerlendirilebilir soru bulunmamaktadır. Sadece yıldız
          değerlendirme tipindeki sorular desteklenmektedir.
        </p>
      </div>
    );
  }

  return (
    <div className="survey-evaluation-content">
      {/* SURVEY HEADER */}
      <div className="bg-main-25 border border-neutral-30 rounded-12 p-md-24 p-16 mb-md-20 mb-16">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
          <div>
            <h2 className="text-neutral-800 fw-bold fs-md-20 fs-16 mb-md-8 mb-6">
              {survey.surveyTitle || "Anket Değerlendirmesi"}
            </h2>
            <p className="text-neutral-600 mb-0 fs-md-14 fs-12">
              Lütfen aşağıdaki soruları değerlendirerek görüşlerinizi paylaşın
            </p>
          </div>
        </div>
      </div>

      {/* EVALUATION FORM */}
      <Form onSubmit={handleSubmit}>
        {/* <FormValues /> */}

        {/* RATING QUESTIONS */}
        <div className="questions-container">
          {ratingStarQuestions
            .sort((a, b) => (a.responseOrder || 0) - (b.responseOrder || 0))
            .map((question, index) => {
              if (!question.questionId) return null;

              const fieldName = `question_${question.questionId}`;

              return (
                <div
                  key={question.questionId}
                  className="question-item mb-md-16 mb-12"
                  data-aos="fade-up"
                  data-aos-duration="400"
                >
                  <div className="bg-white border border-neutral-30 rounded-12 p-md-24 p-16">
                    {/* Question Header */}
                    <div className="d-flex align-items-start gap-md-12 gap-10 mb-md-16 mb-12">
                      <div
                        className="question-number d-flex align-items-center justify-content-center bg-main-600 text-white rounded-circle flex-shrink-0"
                        style={{
                          width: "28px",
                          height: "28px",
                          fontSize: "13px",
                          fontWeight: "600",
                        }}
                      >
                        {index + 1}
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="text-neutral-700 mb-md-4 mb-2 fw-semibold fs-md-14 fs-13 lh-sm">
                          {question.questionText}
                        </h5>
                        {question.ratingCategory && (
                          <p className="text-neutral-500 fs-md-12 fs-11 mb-0 lh-base">
                            {question.ratingCategory ===
                              "OVERALL_SATISFACTION" && "Genel memnuniyet"}
                            {question.ratingCategory === "STAFF_FRIENDLINESS" &&
                              "Personel hizmeti"}
                            {question.ratingCategory === "CLEANLINESS" &&
                              "Temizlik"}
                            {question.ratingCategory === "FACILITIES" &&
                              "Tesis kalitesi"}
                            {question.ratingCategory === "COMMUNICATION" &&
                              "İletişim"}
                          </p>
                        )}
                      </div>
                    </div>

                    <span className="d-block border border-neutral-30 mb-md-16 mb-12 border-dashed" />

                    {/* Rating Section */}
                    <div className="rating-section py-md-4 py-2">
                      <div className="d-flex justify-content-center">
                        <FormStarIcon
                          name={fieldName}
                          max={5}
                          size="lg"
                          required={true}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        {/* FORM ACTIONS */}
        <div className="mt-md-24 mt-20">
          <div className="bg-white border border-neutral-30 rounded-12 p-md-20 p-16 mb-md-16 mb-12">
            <div className="d-flex flex-column flex-md-row align-items-stretch align-items-md-center justify-content-between gap-md-16 gap-20">
              {/* Info Section - Sol taraf */}
              <div className="d-flex align-items-center gap-md-12 gap-10 flex-shrink-0">
                <div
                  className="d-flex align-items-center justify-content-center bg-main-50 rounded-circle flex-shrink-0"
                  style={{ width: "40px", height: "40px" }}
                >
                  <i className="ph ph-clipboard-text text-main-600 fs-20" />
                </div>
                <div style={{ whiteSpace: "nowrap" }}>
                  <p className="text-neutral-700 fw-semibold mb-4 fs-md-14 fs-13 lh-sm">
                    {ratingStarQuestions.length} soru değerlendirilecek
                  </p>
                  <p className="text-neutral-500 mb-0 fs-md-12 fs-11 lh-sm">
                    Tüm soruları yanıtladığınızdan emin olun
                  </p>
                </div>
              </div>

              {/* Buttons Section - Sağ taraf (Desktop) / Full width (Mobile) */}
              <div className="d-flex flex-row gap-md-10 gap-10 w-100 w-md-auto justify-content-md-end">
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={handleCancel}
                  disabled={submissionLoading}
                  className="flex-grow-1 flex-md-grow-0"
                >
                  İptal
                </Button>
                <Button
                  type="submit"
                  variant="inline"
                  size="md"
                  disabled={hasErrors || submissionLoading}
                  loading={submissionLoading}
                  leftIcon="ph-paper-plane-tilt"
                  className="flex-grow-1 flex-md-grow-0"
                >
                  Gönder
                </Button>
              </div>
            </div>
          </div>

          {/* THANK YOU MESSAGE */}
          <div className="bg-main-25 border border-neutral-30 rounded-12 p-md-20 p-14">
            <div className="d-flex align-items-center gap-md-10 gap-8">
              <div
                className="d-flex align-items-center justify-content-center bg-main-50 rounded-circle flex-shrink-0"
                style={{ width: "36px", height: "36px" }}
              >
                <i className="ph-fill ph-heart text-main-600 fs-18" />
              </div>
              <div>
                <p className="text-neutral-700 fw-semibold mb-0 fs-md-13 fs-12">
                  Teşekkür Ederiz!
                </p>
                <p className="text-neutral-500 mb-0 fs-md-11 fs-10">
                  Görüşleriniz bizim için çok değerli ve hizmet kalitemizi
                  geliştirmemize yardımcı oluyor
                </p>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};
