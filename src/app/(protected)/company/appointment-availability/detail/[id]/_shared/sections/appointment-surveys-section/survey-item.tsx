import React from "react";
import { SurveyDto } from "@/types";
import { Badge } from "@/components";
import {
  getSurveyTypeIcon,
  getSurveyTypeVariant,
  getSurveyTypeLabel,
} from "../../utils";

interface SurveyItemProps {
  survey: SurveyDto;
  isSelected: boolean;
  onSelect: (surveyId: number) => void;
}

export const SurveyItem: React.FC<SurveyItemProps> = ({
  survey,
  isSelected,
  onSelect,
}) => {
  const handleSelect = () => {
    if (survey.id) {
      onSelect(survey.id);
    }
  };

  if (!survey.surveyType) return null;

  return (
    <div
      className={`survey-item ${isSelected ? "selected" : ""}`}
      onClick={handleSelect}
    >
      <div className="survey-item-content">
        {/* Header */}
        <div className="d-flex align-items-start justify-content-between mb-3">
          <div className="flex-grow-1">
            <div className="d-flex align-items-center gap-8 mb-2">
              <Badge
                variant={getSurveyTypeVariant(survey.surveyType) as any}
                className="fw-semibold"
              >
                <i
                  className={`${getSurveyTypeIcon(
                    survey.surveyType
                  )} me-1 fs-7`}
                ></i>
                {getSurveyTypeLabel(survey.surveyType)}
              </Badge>
              {survey.isActive && (
                <Badge variant="success" className="fw-semibold">
                  <i className="ph ph-check-circle-fill me-1 fs-8"></i>
                  Aktif
                </Badge>
              )}
            </div>
            <h6 className="survey-title mb-2 mt-8">{survey.title}</h6>
            {survey.description && (
              <p className="survey-description text-muted mb-0">
                {survey.description}
              </p>
            )}
          </div>

          {/* Selection Checkbox */}
          <div className="survey-checkbox">
            <div className={`checkbox-circle ${isSelected ? "checked" : ""}`}>
              {isSelected ? (
                <i className="ph-fill ph-check-circle"></i>
              ) : (
                <i className="ph ph-circle"></i>
              )}
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="survey-stats">
          <div className="stat-item">
            <i className="ph ph-question"></i>
            <span>{survey.questions?.length || 0} Soru</span>
          </div>
          <div className="stat-item">
            <i className="ph ph-clock"></i>
            <span>{survey.estimatedDuration || "Bilinmiyor"}</span>
          </div>
          {survey.totalSent && survey.totalSent > 0 && (
            <div className="stat-item">
              <i className="ph ph-paper-plane"></i>
              <span>{survey.totalSent} Gönderildi</span>
            </div>
          )}
          {survey.averageRating && survey.averageRating > 0 && (
            <div className="stat-item">
              <i className="ph-fill ph-star text-warning"></i>
              <span>{survey.averageRating.toFixed(1)}</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="survey-footer">
          <div className="d-flex align-items-center gap-2">
            {survey.isAnonymous && <span className="survey-tag">Anonim</span>}
            {survey.isMandatory && <span className="survey-tag">Zorunlu</span>}
          </div>
          <div className="survey-author">
            <i className="ph ph-calendar me-1"></i>
            {survey.createdAt &&
              new Date(survey.createdAt).toLocaleDateString("tr-TR")}
          </div>
        </div>
      </div>
    </div>
  );
};
