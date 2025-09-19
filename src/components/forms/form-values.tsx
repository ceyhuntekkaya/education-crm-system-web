"use client";

import React, { useState } from "react";
import { useFormHook } from "@/hooks";

interface FormValuesProps {
  className?: string;
  title?: string;
  showOnlyFilledValues?: boolean;
  showAsJson?: boolean;
  debugMode?: boolean;
}

const FormValues: React.FC<FormValuesProps> = ({
  className = "",
  title = "Form Debug",
  showOnlyFilledValues = false,
  showAsJson = false,
  debugMode = true,
}) => {
  const { values, getFormDataAsJson } = useFormHook();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isJsonMode, setIsJsonMode] = useState(showAsJson);

  // Sadece dolu değerleri göstermek için filtreleme
  const filteredValues = showOnlyFilledValues
    ? Object.entries(values).filter(([_, value]) => {
        if (value === null || value === undefined || value === "") {
          return false;
        }
        if (Array.isArray(value) && value.length === 0) {
          return false;
        }
        return true;
      })
    : Object.entries(values);

  // Debug mode için floating panel
  if (debugMode) {
    return (
      <>
        {/* Debug Toggle Button */}
        <div
          style={{
            position: "fixed",
            top: "120px",
            right: "20px",
            zIndex: 9999,
          }}
        >
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            style={{
              background: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              fontSize: "14px",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            title="Form Debug Panel"
          >
            🐛
          </button>
        </div>

        {/* Debug Panel */}
        {isOpen && (
          <div
            style={{
              position: "fixed",
              top: "170px",
              right: "20px",
              width: isMinimized ? "200px" : "280px",
              maxHeight: isMinimized ? "35px" : "40vh",
              background: "white",
              border: "1px solid #ddd",
              borderRadius: "6px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
              zIndex: 9998,
              overflow: "hidden",
              transition: "all 0.2s ease",
              fontSize: "11px",
            }}
          >
            {/* Panel Header */}
            <div
              style={{
                background: "#f1f3f5",
                padding: "6px 10px",
                borderBottom: isMinimized ? "none" : "1px solid #e9ecef",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => setIsMinimized(!isMinimized)}
            >
              <span style={{ fontSize: "11px", fontWeight: "600" }}>
                {title} ({filteredValues.length})
              </span>
              <div style={{ display: "flex", gap: "2px" }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMinimized(!isMinimized);
                  }}
                  type="button"
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "10px",
                    cursor: "pointer",
                    padding: "1px 3px",
                  }}
                  title={isMinimized ? "Genişlet" : "Küçült"}
                >
                  {isMinimized ? "📈" : "📉"}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                  type="button"
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "10px",
                    cursor: "pointer",
                    padding: "1px 3px",
                  }}
                  title="Kapat"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Panel Content */}
            {!isMinimized && (
              <div
                style={{
                  padding: "8px",
                  maxHeight: "calc(40vh - 35px)",
                  overflowY: "auto",
                }}
              >
                {/* Mode Toggle */}
                <div style={{ marginBottom: "8px" }}>
                  <label
                    style={{
                      fontSize: "10px",
                      display: "flex",
                      gap: "4px",
                      alignItems: "center",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={isJsonMode}
                      onChange={(e) => {
                        setIsJsonMode(e.target.checked);
                      }}
                      style={{ transform: "scale(0.8)" }}
                    />
                    JSON
                  </label>
                </div>

                {/* Content */}
                {filteredValues.length === 0 ? (
                  <p style={{ color: "#6c757d", fontSize: "10px", margin: 0 }}>
                    {showOnlyFilledValues
                      ? "Henüz doldurulmuş alan yok"
                      : "Form boş"}
                  </p>
                ) : isJsonMode ? (
                  <pre
                    style={{
                      background: "#f8f9fa",
                      padding: "6px",
                      borderRadius: "3px",
                      fontSize: "9px",
                      overflow: "auto",
                      margin: 0,
                      maxHeight: "250px",
                      lineHeight: "1.2",
                    }}
                  >
                    {getFormDataAsJson()}
                  </pre>
                ) : (
                  <div>
                    {filteredValues.map(([key, value]) => (
                      <div
                        key={key}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          marginBottom: "4px",
                          padding: "4px",
                          background: "#f8f9fa",
                          borderRadius: "3px",
                          fontSize: "9px",
                        }}
                      >
                        <div
                          style={{
                            fontWeight: "600",
                            color: "#007bff",
                            minWidth: "50px",
                            fontSize: "9px",
                          }}
                        >
                          {key}:
                        </div>
                        <div
                          style={{
                            flexGrow: 1,
                            marginLeft: "4px",
                            wordBreak: "break-word",
                            fontSize: "9px",
                          }}
                        >
                          {Array.isArray(value)
                            ? `[${value.join(", ")}]`
                            : typeof value === "object" && value !== null
                            ? JSON.stringify(value)
                            : String(value)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </>
    );
  }

  // JSON formatında gösterme
  if (showAsJson) {
    return (
      <div className={`form-values ${className}`}>
        <h6 className="mb-3">{title}</h6>
        <pre className="bg-light p-3 rounded text-sm overflow-auto">
          {getFormDataAsJson()}
        </pre>
      </div>
    );
  }

  // Liste formatında gösterme
  return (
    <div className={`form-values ${className}`}>
      <h6 className="mb-3">{title}</h6>

      {filteredValues.length === 0 ? (
        <p className="text-muted text-sm">
          {showOnlyFilledValues ? "Henüz doldurulmuş alan yok" : "Form boş"}
        </p>
      ) : (
        <div className="form-values-list">
          {filteredValues.map(([key, value]) => (
            <div
              key={key}
              className="form-value-item d-flex justify-content-between align-items-start mb-2 p-2 bg-light rounded"
            >
              <div className="form-value-key">
                <strong className="text-sm text-primary">{key}:</strong>
              </div>
              <div className="form-value-content flex-grow-1 ms-2">
                <span className="text-sm">
                  {Array.isArray(value)
                    ? `[${value.join(", ")}]`
                    : typeof value === "object" && value !== null
                    ? JSON.stringify(value)
                    : String(value)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-3 text-end">
        <small className="text-muted">
          Toplam {filteredValues.length} alan
        </small>
      </div>
    </div>
  );
};

export default FormValues;
