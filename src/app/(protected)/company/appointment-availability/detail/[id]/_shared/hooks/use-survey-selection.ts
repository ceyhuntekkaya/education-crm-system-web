import { useState, useCallback } from "react";

interface UseSurveySelectionReturn {
  selectedSurveyId: number | null;
  selectSurvey: (surveyId: number) => void;
  clearSelection: () => void;
}

/**
 * Anket seçimi için hook
 */
export const useSurveySelection = (): UseSurveySelectionReturn => {
  const [selectedSurveyId, setSelectedSurveyId] = useState<number | null>(null);

  const selectSurvey = useCallback((surveyId: number) => {
    setSelectedSurveyId(surveyId);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedSurveyId(null);
  }, []);

  return {
    selectedSurveyId,
    selectSurvey,
    clearSelection,
  };
};
