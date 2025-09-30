"use client";

import { Results } from "../../search/_shared";
import {
  getInstitutionsByListId,
  parseListIdFromUrl,
  isValidListId,
} from "./_shared/utils";
import { useParams } from "next/navigation";

export default function MyListPage() {
  const params = useParams();
  const listId = parseListIdFromUrl(params?.id as string);

  // Geçersiz ID kontrolü
  if (!isValidListId(listId)) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Geçersiz Liste ID&apos;si
          </h2>
          <p className="text-gray-600">Belirtilen liste bulunamadı.</p>
        </div>
      </div>
    );
  }

  // Liste ID'sine göre filtrelenmiş kurumları al
  const filteredInstitutions = getInstitutionsByListId(listId);

  // Boş liste durumunda bilgi mesajı (artık olmamalı ama yine de kontrol edelim)
  if (filteredInstitutions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Bu listede henüz kurum yok
          </h2>
          <p className="text-gray-600">
            Liste ID: {listId} için kurum bulunamadı.
          </p>
        </div>
      </div>
    );
  }

  return <Results institutions={filteredInstitutions} />;
}
