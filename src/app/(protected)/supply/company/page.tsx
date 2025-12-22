"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const SupplyCompanyPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/supply/company/dashboard");
  }, [router]);

  return null;
};

export default SupplyCompanyPage;
