import React from "react";
import { FormStep } from "../types";

interface FormStepConfig {
  key: FormStep;
  title: string;
  icon: string;
}

interface ProgressBarProps {
  steps: readonly FormStepConfig[];
  currentStep: FormStep;
  onStepClick?: (step: FormStep) => void;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  steps,
  currentStep,
  onStepClick,
  className = "",
}) => {
  const currentIndex = steps.findIndex((step) => step.key === currentStep);

  return (
    <div className={`progress-bar-container ${className}`}>
      <div className="progress-bar-steps">
        {steps.map((step, index) => {
          const isActive = step.key === currentStep;
          const isCompleted = currentIndex > index;
          const isClickable = !!onStepClick;

          const handleStepClick = () => {
            if (onStepClick) {
              onStepClick(step.key);
            }
          };

          return (
            <div
              key={step.key}
              className={`progress-bar-step ${isActive ? "active" : ""} ${
                isCompleted ? "completed" : ""
              } ${isClickable ? "clickable" : ""}`}
              onClick={handleStepClick}
            >
              <div className="progress-bar-step-icon">
                {isCompleted ? (
                  <span className="step-number">{index + 1}</span>
                ) : (
                  <span className="step-number">{index + 1}</span>
                )}
              </div>
              <div className="progress-bar-step-title">{step.title}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
