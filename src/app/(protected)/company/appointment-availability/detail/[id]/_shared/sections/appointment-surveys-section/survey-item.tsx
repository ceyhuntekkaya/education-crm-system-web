import React from "react";
import { SurveyTemplateDto } from "@/types";
import { Badge } from "@/components";
import {
  getSurveyTypeIcon,
  getSurveyTypeVariant,
  getSurveyTypeLabel,
} from "../../utils";

interface SurveyItemProps {
  survey: SurveyTemplateDto;
  isSelected: boolean;
  onSelect: (surveyId: number) => void;
}

export const SurveyItem: React.FC<SurveyItemProps> = ({
  survey,
  isSelected,
  onSelect,
}) => {
  const handleSelect = () => {
    onSelect(survey.id);
  };

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
              {survey.isRecommended && (
                <Badge variant="warning" className="fw-semibold">
                  <i className="ph ph-star-fill me-1 fs-8"></i>
                  Önerilen
                </Badge>
              )}
            </div>
            <h6 className="survey-title mb-2 mt-8">{survey.templateName}</h6>
            {survey.templateDescription && (
              <p className="survey-description text-muted mb-0">
                {survey.templateDescription}
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
          {survey.usageCount > 0 && (
            <div className="stat-item">
              <i className="ph ph-users"></i>
              <span>{survey.usageCount} Kullanım</span>
            </div>
          )}
          {survey.averageRating > 0 && (
            <div className="stat-item">
              <i className="ph-fill ph-star text-warning"></i>
              <span>{survey.averageRating.toFixed(1)}</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="survey-footer">
          <div className="d-flex align-items-center gap-2">
            {survey.category && (
              <span className="survey-tag">{survey.category}</span>
            )}
            {survey.industry && (
              <span className="survey-tag">{survey.industry}</span>
            )}
          </div>
          <div className="survey-author">
            <i className="ph ph-user-circle me-1"></i>
            {survey.createdByUserName}
          </div>
        </div>
      </div>
    </div>
  );
};
