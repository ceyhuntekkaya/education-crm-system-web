import { useMemo } from "react";
import { SurveyResponseDto } from "@/types";
import { SurveyStats } from "../types";
import { calculateSurveyStats } from "../utils/survey-utils";

/**
 * Hook to calculate survey statistics
 * @param surveys - Array of survey data
 * @returns Survey statistics
 */
export const useSurveyStatistics = (
  surveys: SurveyResponseDto[]
): SurveyStats => {
  const stats = useMemo(() => {
    if (!surveys || surveys.length === 0) {
      return {
        totalSurveys: 0,
        activeSurveys: 0,
        totalSent: 0,
        totalCompleted: 0,
        averageCompletionRate: 0,
        averageRating: 0,
        averageStaffRating: 0,
        averageCommunicationRating: 0,
        mandatorySurveys: 0,
        anonymousSurveys: 0,
      };
    }

    return calculateSurveyStats(surveys);
  }, [surveys]);

  return stats;
};
