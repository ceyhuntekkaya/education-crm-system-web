"use client";

import React, { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";

export interface ToastData {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastProps extends ToastData {
  onRemove: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({
  id,
  type,
  title,
  message,
  duration = 5000,
  action,
  onRemove,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const handleRemove = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      onRemove(id);
    }, 300);
  }, [id, onRemove]);

  useEffect(() => {
    setIsVisible(true);

    if (duration > 0) {
      const timer = setTimeout(() => {
        handleRemove();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, handleRemove]);

  const typeStyles = {
    success: {
      bg: "bg-green-50 border-green-200",
      icon: "text-green-400",
      title: "text-green-800",
      message: "text-green-700",
    },
    error: {
      bg: "bg-red-50 border-red-200",
      icon: "text-red-400",
      title: "text-red-800",
      message: "text-red-700",
    },
    warning: {
      bg: "bg-yellow-50 border-yellow-200",
      icon: "text-yellow-400",
      title: "text-yellow-800",
      message: "text-yellow-700",
    },
    info: {
      bg: "bg-blue-50 border-blue-200",
      icon: "text-blue-400",
      title: "text-blue-800",
      message: "text-blue-700",
    },
  };

  const icons = {
    success: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
          clipRule="evenodd"
        />
      </svg>
    ),
    warning: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
    ),
    info: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clipRule="evenodd"
        />
      </svg>
    ),
  };

  const styles = typeStyles[type];

  return (
    <div
      className={`
        min-w-2xs max-w-xl w-full shadow-lg rounded-lg pointer-events-auto border
        transform transition-all duration-300 ease-in-out
        ${styles.bg}
        ${
          isVisible && !isExiting
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        }
      `}
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <div className={styles.icon}>{icons[type]}</div>
          </div>
          <div className="ml-3 w-0 flex-1">
            <p className={`text-sm font-medium ${styles.title}`}>{title}</p>
            {message && (
              <p className={`mt-1 text-sm ${styles.message}`}>{message}</p>
            )}
            {action && (
              <div className="mt-3">
                <button
                  onClick={action.onClick}
                  className={`text-sm font-medium ${styles.title} hover:underline`}
                >
                  {action.label}
                </button>
              </div>
            )}
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              onClick={handleRemove}
              className={`cursor-pointer rounded-md inline-flex ${styles.title} hover:opacity-75 focus:outline-none`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Toast Container
interface ToastContainerProps {
  toasts: ToastData[];
  onRemove: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  onRemove,
}) => {
  if (toasts.length === 0) return null;

  const containerElement = (
    <div className="fixed top-4 right-4 z-50 space-y-3">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onRemove={onRemove} />
      ))}
    </div>
  );

  return createPortal(containerElement, document.body);
};

export default Toast;
