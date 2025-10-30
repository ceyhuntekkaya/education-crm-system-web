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

  // RATING_STAR tipindeki soruları filtrele
  const ratingStarQuestions =
    survey.questions?.filter(
      (q) => q.isActive !== false && q.questionType === "RATING_STAR"
    ) || [];

  if (!survey.questions?.length) {
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
        <h6 className="text-neutral-600 mb-8">Henüz Soru Yok</h6>
        <p className="text-neutral-500 text-sm">
          Bu ankette henüz soru bulunmamaktadır.
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
        <h6 className="text-neutral-600 mb-8">Değerlendirilebilir Soru Yok</h6>
        <p className="text-neutral-500 text-sm">
          Bu ankette değerlendirilebilir soru bulunmamaktadır.
          <br />
          Sadece yıldız değerlendirme tipindeki sorular desteklenmektedir.
        </p>
      </div>
    );
  }

  return (
    <div className="survey-evaluation-content">
      {/* SURVEY HEADER */}
      <div className="mb-32" data-aos="fade-down" data-aos-duration="400">
        <div className="text-center mb-24">
          <h4 className="text-neutral-800 mb-8">{survey.title}</h4>
          {survey.description && (
            <p className="text-neutral-600 mb-0">{survey.description}</p>
          )}
        </div>

        {survey.welcomeMessage && (
          <div className="bg-primary-50 border border-neutral-30 rounded-12 p-16">
            <div className="d-flex align-items-center gap-12">
              <Icon
                icon="ph-info"
                className="text-primary-600 mt-2 flex-shrink-0"
              />
              <p className="text-primary-800 mb-0 text-sm">
                {survey.welcomeMessage}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* EVALUATION FORM */}
      <Form onSubmit={handleSubmit}>
        <FormValues />

        {/* RATING QUESTIONS */}
        <div className="questions-container">
          {ratingStarQuestions
            .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
            .map((question, index) => {
              if (!question.id) return null;

              const fieldName = `question_${question.id}`;

              return (
                <div key={question.id} className="question-item mb-24">
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
                              {question.questionText}
                            </h6>
                            {question.description && (
                              <p className="text-neutral-500 text-sm mb-0">
                                {question.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Sağ taraf - Rating */}
                      <div className="col-4">
                        <div className="rating-section d-flex justify-content-end">
                          <FormStarIcon
                            name={fieldName}
                            max={5}
                            size="lg"
                            required={question.isRequired}
                          />
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
            <div className="d-flex align-items-center gap-8">
              <Icon icon="ph-star-four" className="text-warning-500" />
              <span className="text-sm text-neutral-600">
                {ratingStarQuestions.length} soru değerlendirilecek
              </span>
            </div>

            <div className="d-flex gap-12">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={submissionLoading}
              >
                İptal
              </Button>
              <Button
                type="submit"
                disabled={hasErrors || submissionLoading}
                loading={submissionLoading}
                leftIcon="ph-paper-plane-tilt"
              >
                Değerlendirmeyi Gönder
              </Button>
            </div>
          </div>

          {/* THANK YOU MESSAGE */}
          <div className="text-center mt-24 pt-20 border-t border-neutral-30">
            <p className="text-neutral-700 text-lg fw-medium mb-0">
              Anketimize katıldığınız için teşekkür ederiz!
            </p>
            <p className="text-neutral-500 text-sm mt-8">
              Değerlendirmeniz bizim için çok değerli
            </p>
          </div>
        </div>
      </Form>
    </div>
  );
};
