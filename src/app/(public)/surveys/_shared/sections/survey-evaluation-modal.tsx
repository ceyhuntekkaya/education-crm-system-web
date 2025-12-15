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
      className="max-w-3xl mx-md-16 mx-12"
    >
      <ModalHeader
        title="Anket Değerlendirmesi"
        onClose={closeEvaluationModal}
        className="py-md-16 py-12 px-md-20 px-16"
      />
      <ModalBody className="max-h-[75vh] overflow-y-auto p-md-20 p-12">
        <SurveyEvaluationForm />
      </ModalBody>
    </Modal>
  );
};
