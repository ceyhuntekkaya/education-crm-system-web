import React from "react";
import { CustomCard } from "@/components/ui";

export default function BrandLoadingSection() {
  return (
    <div className="d-flex flex-column gap-24">
      {/* Cover Image Loading */}
      <CustomCard className="p-0 overflow-hidden">
        <div
          className="w-100 bg-neutral-100 animate-pulse"
          style={{ height: "200px" }}
        />
      </CustomCard>

      {/* General Info Loading */}
      <CustomCard title="Marka Bilgileri">
        <div className="d-flex flex-column gap-16">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="d-flex justify-content-between">
              <div
                className="bg-neutral-100 animate-pulse rounded-4"
                style={{ width: "120px", height: "20px" }}
              />
              <div
                className="bg-neutral-100 animate-pulse rounded-4"
                style={{ width: "200px", height: "20px" }}
              />
            </div>
          ))}
        </div>
      </CustomCard>

      {/* Campus Loading */}
      <CustomCard title="Kampüsler">
        <div className="d-flex flex-column gap-12">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="bg-neutral-100 animate-pulse rounded-8"
              style={{ height: "60px" }}
            />
          ))}
        </div>
      </CustomCard>
    </div>
  );
}
