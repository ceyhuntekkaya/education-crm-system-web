"use client";

import React from "react";
import { FormInput, FormAutocomplete } from "@/components/forms";
import CustomCard from "@/components/ui/custom-card";
import { useForm } from "@/contexts/form-context";
import { useRegister } from "../context";

/**
 * Step 4: Campus Info
 * Kampüs bilgileri - Brand form benzeri tasarım
 */
export const CampusInfoStep: React.FC = () => {
  const { values } = useForm();
  const { locationData, brandData } = useRegister();

  const campusInfo = values?.campusInfo || {};

  return (
    <div className="register-step-content">
      <CustomCard
        title="Kampüs Bilgileri"
        subtitle="Kampüsünüzün marka ve temel bilgilerini giriniz"
      >
        <div className="row row-gap-24">
          <div className="col-12">
            <FormAutocomplete
              name="campusInfo.brandId"
              label="Marka"
              options={brandData.brands.data}
              placeholder="Marka seçiniz..."
              isRequired
              disabled={brandData.brands.loading}
              isLoading={brandData.brands.loading}
            />
          </div>

          <div className="col-12">
            <FormInput
              name="campusInfo.campusName"
              label="Kampüs Adı"
              placeholder="Kampüs adını giriniz..."
              isRequired
            />
          </div>
        </div>
      </CustomCard>

      <CustomCard title="Lokasyon Bilgileri" mt="mt-24">
        <div className="row row-gap-24">
          {/* <div className="col-md-6">
            <FormAutocomplete
              name="campusInfo.countryId"
              label="Ülke"
              options={locationData.countries.data}
              placeholder="Ülke seçiniz..."
              isRequired
              disabled={locationData.countries.loading}
              isLoading={locationData.countries.loading}
            />
          </div> */}

          <div className="col-md-6">
            <FormAutocomplete
              name="campusInfo.provinceId"
              label="İl"
              options={locationData.provinces.data}
              placeholder={
                !campusInfo.countryId ? "Önce ülke seçiniz..." : "İl seçiniz..."
              }
              isRequired
              disabled={
                locationData.provinces.disabled ||
                locationData.provinces.loading
              }
              isLoading={locationData.provinces.loading}
            />
          </div>

          <div className="col-md-6">
            <FormAutocomplete
              key={`district-${campusInfo.provinceId || "empty"}`}
              name="campusInfo.districtId"
              label="İlçe"
              options={locationData.districts.data}
              placeholder={
                !campusInfo.provinceId
                  ? "Önce il seçiniz..."
                  : "İlçe seçiniz..."
              }
              isRequired
              disabled={
                locationData.districts.disabled ||
                locationData.districts.loading
              }
              isLoading={locationData.districts.loading}
            />
          </div>

          <div className="col-md-6">
            <FormAutocomplete
              key={`neighborhood-${campusInfo.districtId || "empty"}`}
              name="campusInfo.neighborhoodId"
              label="Mahalle"
              options={locationData.neighborhoods.data}
              placeholder={
                !campusInfo.districtId
                  ? "Önce ilçe seçiniz..."
                  : "Mahalle seçiniz..."
              }
              isRequired
              disabled={
                locationData.neighborhoods.disabled ||
                locationData.neighborhoods.loading
              }
              isLoading={locationData.neighborhoods.loading}
            />
          </div>

          <div className="col-12">
            <FormInput
              name="campusInfo.addressLine1"
              label="Adres Detayı (1. Satır)"
              placeholder="Cadde, sokak, bina no..."
              isRequired
            />
          </div>

          <div className="col-12">
            <FormInput
              name="campusInfo.addressLine2"
              label="Adres Detayı (2. Satır)"
              placeholder="Daire no, blok, kat..."
              isRequired
            />
          </div>

          <div className="col-md-6">
            <FormInput
              name="campusInfo.postalCode"
              label="Posta Kodu"
              placeholder="Posta kodunu giriniz..."
              isRequired
            />
          </div>
        </div>
      </CustomCard>
    </div>
  );
};
