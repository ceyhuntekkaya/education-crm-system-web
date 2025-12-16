"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useMyList } from "../contexts";

/**
 * Mobile List Header Component
 * Shows current list name and allows switching between lists on mobile
 * Only visible on mobile devices (hidden on lg and up)
 */
export const MobileListHeader: React.FC = () => {
  const router = useRouter();
  const { parentLists, listDetail, listsLoading } = useMyList();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Get current list name
  const currentListName = useMemo(() => {
    if (listDetail?.listName) {
      return listDetail.listName;
    }
    return "Liste";
  }, [listDetail]);

  // Handle list selection
  const handleListSelect = (listId: string) => {
    setIsDropdownOpen(false);
    router.push(`/my-lists/${listId}`);
  };

  if (listsLoading) {
    return (
      <div className="d-lg-none mb-36">
        <div className="rounded-12 bg-white p-16 box-shadow-md">
          <div className="d-flex align-items-center justify-content-center">
            <span className="text-neutral-500">Yükleniyor...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="d-lg-none mb-36">
      <div className="rounded-12 bg-white p-16 box-shadow-md">
        {/* Header with current list name */}
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-12">
            <i className="ph-bold ph-list-bullets text-main-600 text-xl" />
            <div>
              <span className="text-xs text-neutral-500 d-block">
                Seçili Liste
              </span>
              <h6 className="mb-0 text-neutral-900">{currentListName}</h6>
            </div>
          </div>

          {/* Dropdown toggle button */}
          {parentLists.length > 1 && (
            <button
              type="button"
              className="btn btn-outline-main-600 btn-sm d-flex align-items-center gap-8"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>Değiştir</span>
              <i
                className={`ph-bold ph-caret-${isDropdownOpen ? "up" : "down"}`}
              />
            </button>
          )}
        </div>

        {/* Dropdown list */}
        {isDropdownOpen && parentLists.length > 1 && (
          <div className="mt-16 pt-16 border-top border-neutral-30">
            <span className="text-xs text-neutral-500 d-block mb-12">
              Diğer Listeler
            </span>
            <div className="d-flex flex-column gap-8">
              {parentLists.map((list) => {
                const isActive = listDetail?.id === list.id;
                return (
                  <button
                    key={list.id}
                    type="button"
                    className={`btn text-start p-12 rounded-8 ${
                      isActive
                        ? "bg-main-50 text-main-600"
                        : "bg-neutral-50 text-neutral-700 hover-bg-main-50"
                    }`}
                    onClick={() => handleListSelect(list.id?.toString() || "")}
                    disabled={isActive}
                  >
                    <div className="d-flex align-items-center gap-12">
                      <i
                        className={`ph-bold ${
                          isActive ? "ph-check-circle" : "ph-circle"
                        }`}
                      />
                      <span>{list.listName || "İsimsiz Liste"}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* List count info */}
        {/* <div className="mt-12 pt-12 border-top border-neutral-30">
          <p className="text-xs text-neutral-500 mb-0 text-center">
            Toplam {parentLists.length} liste
          </p>
        </div> */}
      </div>
    </div>
  );
};
