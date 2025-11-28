"use client";

import { Results } from "../../search/_shared";
import { useMyList } from "./_shared";
import { usePageTitle } from "@/hooks";

/**
 * My List Page Component
 * Displays schools in a specific parent list
 * Uses centralized context for state management
 * Directly passes school data from API to card component
 */
export default function MyListPage() {
  usePageTitle("Listelerim");
  // Get data from context (similar to useInstitutionDetail)
  const { listItems, listDetail, loading, error } = useMyList();

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Bir hata oluştu
          </h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  // Empty list state
  if (!loading && listItems.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {listDetail?.listName || "Bu listede"} henüz kurum yok
          </h2>
          <p className="text-gray-600">
            Arama sayfasından okul ekleyerek listeyi oluşturabilirsiniz.
          </p>
        </div>
      </div>
    );
  }

  // Directly pass school data from API to Results component
  return <Results institutions={listItems} loading={loading} />;
}
