import React from "react";

export interface LoadingSpinnerProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  variant?: "spinner" | "dots" | "pulse";
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = "Yükleniyor...",
  size = "md",
  variant = "dots",
  className = "",
}) => {
  const sizeClasses = {
    sm: "spinner-grow-sm",
    md: "",
    lg: "spinner-grow-lg",
  };

  const renderSpinner = () => {
    switch (variant) {
      case "spinner":
        return (
          <div
            className={`spinner-border text-primary ${sizeClasses[size]}`}
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        );

      case "pulse":
        return (
          <div className="loading-pulse">
            <div className="pulse-dot bg-primary"></div>
            <div className="pulse-dot bg-primary"></div>
            <div className="pulse-dot bg-primary"></div>
          </div>
        );

      case "dots":
      default:
        return (
          <div className="loading-dots">
            <div
              className={`spinner-grow text-primary ${sizeClasses[size]} me-1`}
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
            <div
              className={`spinner-grow text-primary ${sizeClasses[size]} me-1`}
              role="status"
              style={{ animationDelay: "0.1s" }}
            >
              <span className="visually-hidden">Loading...</span>
            </div>
            <div
              className={`spinner-grow text-primary ${sizeClasses[size]}`}
              role="status"
              style={{ animationDelay: "0.2s" }}
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        );
    }
  };

  return (
    <div
      className={`loading-container d-flex flex-column align-items-center justify-content-center py-3 ${className}`}
    >
      <div className="loading-spinner mb-2">{renderSpinner()}</div>
      {message && <small className="text-muted fw-light">{message}</small>}
    </div>
  );
};

export default LoadingSpinner;
