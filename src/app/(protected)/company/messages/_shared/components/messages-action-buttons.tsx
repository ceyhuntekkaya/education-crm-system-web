"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components";
import { MessagesActionButtonsProps } from "../types";

export const MessagesActionButtons: React.FC<MessagesActionButtonsProps> = ({
  message,
  onViewDetails,
  onEdit,
  onToggleStatus,
  onDelete,
  onReply,
  onForward,
  onMarkAsRead,
  onMarkAsResolved,
  onAssign,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDropdownItemClick = (action?: () => void) => {
    if (action) {
      action();
    }
    setIsDropdownOpen(false);
  };

  return (
    <div className="d-flex align-items-center gap-1">
      <div title="Mesajı Görüntüle">
        <Button
          variant="outline"
          size="xs"
          rightIcon="ph-eye"
          onClick={() =>
            handleDropdownItemClick(() => onViewDetails?.(message))
          }
        >
          {""}
        </Button>
      </div>

      {/* Quick Reply Button */}
      <div title="Hızlı Yanıt">
        <Button
          variant="inline"
          size="xs"
          rightIcon="ph-chat-circle"
          onClick={() => handleDropdownItemClick(() => onReply?.(message))}
        >
          {""}
        </Button>
      </div>

      {/* Dropdown Menu */}
      <div className="position-relative" ref={dropdownRef}>
        <Button
          variant="outline"
          size="xs"
          rightIcon="ph-dots-three-vertical"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {""}
        </Button>

        {isDropdownOpen && (
          <div
            className="dropdown-menu show position-absolute"
            style={{
              right: 0,
              top: "100%",
              zIndex: 1000,
              minWidth: "200px",
              maxHeight: "300px",
              overflowY: "auto",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              backgroundColor: "white",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
          >
            {/* View Details */}
            <button
              className="dropdown-item d-flex align-items-center gap-2 px-3 py-2 border-0 bg-transparent w-100 text-start"
              onClick={() =>
                handleDropdownItemClick(() => onViewDetails?.(message))
              }
            >
              <i className="ph ph-eye text-neutral-600" />
              <span>Detayları Görüntüle</span>
            </button>

            {/* Reply */}
            <button
              className="dropdown-item d-flex align-items-center gap-2 px-3 py-2 border-0 bg-transparent w-100 text-start"
              onClick={() => handleDropdownItemClick(() => onReply?.(message))}
            >
              <i className="ph ph-chat-circle text-primary" />
              <span>Yanıtla</span>
            </button>

            {/* Forward */}
            <button
              className="dropdown-item d-flex align-items-center gap-2 px-3 py-2 border-0 bg-transparent w-100 text-start"
              onClick={() =>
                handleDropdownItemClick(() => onForward?.(message))
              }
            >
              <i className="ph ph-arrow-bend-up-right text-info" />
              <span>İlet</span>
            </button>

            <hr className="dropdown-divider mx-3 my-1" />

            {/* Mark as Read/Unread */}
            {!message.readAt ? (
              <button
                className="dropdown-item d-flex align-items-center gap-2 px-3 py-2 border-0 bg-transparent w-100 text-start"
                onClick={() =>
                  handleDropdownItemClick(() => onMarkAsRead?.(message))
                }
              >
                <i className="ph ph-check text-success" />
                <span>Okundu Olarak İşaretle</span>
              </button>
            ) : (
              <button
                className="dropdown-item d-flex align-items-center gap-2 px-3 py-2 border-0 bg-transparent w-100 text-start"
                onClick={() =>
                  handleDropdownItemClick(() => onMarkAsRead?.(message))
                }
              >
                <i className="ph ph-eye-slash text-neutral-600" />
                <span>Okunmadı Olarak İşaretle</span>
              </button>
            )}

            {/* Mark as Resolved */}
            {message.status !== "RESOLVED" && message.status !== "CLOSED" && (
              <button
                className="dropdown-item d-flex align-items-center gap-2 px-3 py-2 border-0 bg-transparent w-100 text-start"
                onClick={() =>
                  handleDropdownItemClick(() => onMarkAsResolved?.(message))
                }
              >
                <i className="ph ph-check-circle text-success" />
                <span>Çözüldü Olarak İşaretle</span>
              </button>
            )}

            {/* Assign */}
            <button
              className="dropdown-item d-flex align-items-center gap-2 px-3 py-2 border-0 bg-transparent w-100 text-start"
              onClick={() => handleDropdownItemClick(() => onAssign?.(message))}
            >
              <i className="ph ph-user-plus text-warning" />
              <span>Atama Yap</span>
            </button>

            <hr className="dropdown-divider mx-3 my-1" />

            {/* Edit */}
            <button
              className="dropdown-item d-flex align-items-center gap-2 px-3 py-2 border-0 bg-transparent w-100 text-start"
              onClick={() => handleDropdownItemClick(() => onEdit?.(message))}
            >
              <i className="ph ph-pencil text-warning" />
              <span>Düzenle</span>
            </button>

            {/* Toggle Status */}
            <button
              className="dropdown-item d-flex align-items-center gap-2 px-3 py-2 border-0 bg-transparent w-100 text-start"
              onClick={() =>
                handleDropdownItemClick(() => onToggleStatus?.(message))
              }
            >
              <i className="ph ph-toggle-right text-info" />
              <span>Durumu Değiştir</span>
            </button>

            {/* Delete */}
            <button
              className="dropdown-item d-flex align-items-center gap-2 px-3 py-2 border-0 bg-transparent w-100 text-start text-danger"
              onClick={() => handleDropdownItemClick(() => onDelete?.(message))}
            >
              <i className="ph ph-trash text-danger" />
              <span>Sil</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
