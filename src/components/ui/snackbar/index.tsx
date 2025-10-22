"use client";

import React, { useEffect, useState } from "react";
import { useSnackbar, SnackbarMessage } from "@/contexts/snackbar-context";

const SnackbarContainer: React.FC = () => {
  const { snackbars, hideSnackbar } = useSnackbar();

  return (
    <div className="snackbar-container">
      {snackbars.map((snackbar) => (
        <SnackbarItem
          key={snackbar.id}
          snackbar={snackbar}
          onClose={() => hideSnackbar(snackbar.id)}
        />
      ))}
    </div>
  );
};

interface SnackbarItemProps {
  snackbar: SnackbarMessage;
  onClose: () => void;
}

const SnackbarItem: React.FC<SnackbarItemProps> = ({ snackbar, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 300); // Match with animation duration
  };

  const getIcon = () => {
    switch (snackbar.type) {
      case "success":
        return (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"
              fill="currentColor"
            />
          </svg>
        );
      case "error":
        return (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z"
              fill="currentColor"
            />
          </svg>
        );
      case "warning":
        return (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 21H23L12 2L1 21ZM13 18H11V16H13V18ZM13 14H11V10H13V14Z"
              fill="currentColor"
            />
          </svg>
        );
      case "info":
        return (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V11H13V17ZM13 9H11V7H13V9Z"
              fill="currentColor"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`snackbar snackbar--${snackbar.type} ${
        isVisible && !isExiting ? "snackbar--visible" : ""
      } ${isExiting ? "snackbar--exiting" : ""}`}
      data-aos="fade-left"
      data-aos-duration="300"
    >
      <div className="snackbar__icon">{getIcon()}</div>
      <div className="snackbar__content">
        <p className="snackbar__message">{snackbar.message}</p>
      </div>
      <button className="snackbar__close" onClick={handleClose} aria-label="Close">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 5L5 15M5 5L15 15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default SnackbarContainer;
