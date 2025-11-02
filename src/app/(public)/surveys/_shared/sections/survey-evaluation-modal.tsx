"use client";

import React from "react";
import { Modal, ModalHeader, ModalBody } from "@/components/ui/modal";
import { SurveyEvaluationForm } from "./survey-evaluation-form";
import { useSurveyList } from "../context/survey-list-context";

/**
 * Survey Evaluation Modal - Brand pattern'ını takip eder
 * Context'ten kendi verilerini alır
 */
export const SurveyEvaluationModal: React.FC = () => {
  const { selectedSurvey, evaluationModalOpen, closeEvaluationModal } =
    useSurveyList();

  if (!selectedSurvey) return null;

  return (
    <Modal
      isOpen={evaluationModalOpen}
      onClose={closeEvaluationModal}
      size="lg"
      className="max-w-3xl"
    >
      <ModalHeader
        title="Anket Değerlendirmesi"
        onClose={closeEvaluationModal}
      />
      <ModalBody className="max-h-[70vh] overflow-y-auto">
        <SurveyEvaluationForm />
      </ModalBody>
    </Modal>
  );
};
