import React from "react";
import { useModal } from "@/hooks";
import { Button } from "@/components/ui";
import { SaveFavoriteSearchModal } from "./save-favorite-search-modal";

interface SearchResultsHeaderProps {
  totalResults?: number;
  currentPage?: number;
  totalPages?: number;
}

export const SearchResultsHeader: React.FC<SearchResultsHeaderProps> = ({
  totalResults = 0,
  currentPage = 1,
  totalPages = 1,
}) => {
  const saveModal = useModal();

  return (
    <>
      <div className="d-flex align-items-center justify-content-between mb-24 p-24 bg-neutral-20 rounded-12">
        <div className="d-flex flex-column">
          <h5 className="mb-8 text-neutral-700">Arama Sonuçları</h5>
          <div className="d-flex align-items-center gap-16 text-sm text-neutral-500">
            <span>{totalResults} Kurum bulundu</span>
            <span className="w-4 h-4 bg-neutral-300 rounded-circle"></span>
            <span>
              Sayfa {currentPage}/{totalPages}
            </span>
          </div>
        </div>

        <div className="d-flex align-items-center gap-12">
          {/* Sıralama Dropdown'u buraya eklenebilir */}
          <Button
            onClick={saveModal.open}
            variant="outline"
            leftIcon="ph-heart"
            size="sm"
            className="text-main-600 border-main-200 hover-bg-main-50 px-16"
          >
            Aramayı Kaydet
          </Button>
        </div>
      </div>

      <SaveFavoriteSearchModal
        isOpen={saveModal.isOpen}
        onClose={saveModal.close}
      />
    </>
  );
};
