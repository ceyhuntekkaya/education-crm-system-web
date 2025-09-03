"use client";

import useInstitutionSearch from "../_hooks/use-institution-search-hook";
import { InstitutionCard } from "./institution-card";
import Pagination from "./pagination";

// Örnek veri - API'den gelecek

const Results = () => {
  const { institutions } = useInstitutionSearch();

  return (
    <div>
      <div className="row gy-24">
        {institutions.map((institution) => (
          <InstitutionCard key={institution.id} institution={institution} />
        ))}
      </div>

      <Pagination />
    </div>
  );
};

export default Results;
