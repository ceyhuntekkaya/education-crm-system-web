"use client";

import { Results } from "../../search/_shared";
import { transformListItemsToSchoolResults, useMyList } from "./_shared";

/**
 * My List Page Component
 * Displays schools in a specific parent list
 * Uses centralized context for state management
 */
export default function MyListPage() {
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

  // Transform list items to school results format
  const institutions = transformListItemsToSchoolResults(listItems);

  // Empty list state
  if (!loading && institutions.length === 0) {
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

  return <Results institutions={institutions} loading={loading} />;
}
