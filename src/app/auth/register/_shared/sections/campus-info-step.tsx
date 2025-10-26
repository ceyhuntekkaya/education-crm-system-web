"use client";

import React, { useEffect, useState } from "react";
import { FormInput, FormSelect } from "@/components/forms";
import CustomCard from "@/components/ui/custom-card";
import { useForm } from "@/contexts/form-context";
import { apiClient } from "@/lib/api";

/**
 * Step 4: Campus Info
 * Kampüs bilgileri - Brand form benzeri tasarım
 */
export const CampusInfoStep: React.FC = () => {
  const { values, setValue } = useForm();

  const [brands, setBrands] = useState<Array<{ id: number; name: string }>>([]);
  const [countries, setCountries] = useState<
    Array<{ id: number; name: string }>
  >([]);
  const [provinces, setProvinces] = useState<
    Array<{ id: number; name: string }>
  >([]);
  const [districts, setDistricts] = useState<
    Array<{ id: number; name: string }>
  >([]);
  const [neighborhoods, setNeighborhoods] = useState<
    Array<{ id: number; name: string }>
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  const campusInfo = values?.campusInfo || {};

  const handleLocationChange = (field: string, value: any) => {
    if (field === "countryId") {
      setValue("campusInfo.provinceId", null);
      setValue("campusInfo.districtId", null);
      setValue("campusInfo.neighborhoodId", null);
      setProvinces([]);
      setDistricts([]);
      setNeighborhoods([]);
    } else if (field === "provinceId") {
      setValue("campusInfo.districtId", null);
      setValue("campusInfo.neighborhoodId", null);
      setDistricts([]);
      setNeighborhoods([]);
    } else if (field === "districtId") {
      setValue("campusInfo.neighborhoodId", null);
      setNeighborhoods([]);
    }
  };

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await apiClient.get("/institutions/brands/summaries");
        setBrands((response.data as any) || []);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };
    fetchBrands();
  }, []);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await apiClient.get("/locations/countries");
        setCountries((response.data as any) || []);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    if (campusInfo.countryId) {
      const fetchProvinces = async () => {
        setIsLoading(true);
        try {
          const response = await apiClient.get(
            `/locations/countries/${campusInfo.countryId}/provinces`
          );
          setProvinces((response.data as any) || []);
        } catch (error) {
          console.error("Error fetching provinces:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchProvinces();
    }
  }, [campusInfo.countryId]);

  useEffect(() => {
    if (campusInfo.provinceId) {
      const fetchDistricts = async () => {
        setIsLoading(true);
        try {
          const response = await apiClient.get(
            `/locations/provinces/${campusInfo.provinceId}/districts`
          );
          setDistricts((response.data as any) || []);
        } catch (error) {
          console.error("Error fetching districts:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchDistricts();
    }
  }, [campusInfo.provinceId]);

  useEffect(() => {
    if (campusInfo.districtId) {
      const fetchNeighborhoods = async () => {
        setIsLoading(true);
        try {
          const response = await apiClient.get(
            `/locations/districts/${campusInfo.districtId}/neighborhoods`
          );
          setNeighborhoods((response.data as any) || []);
        } catch (error) {
          console.error("Error fetching neighborhoods:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchNeighborhoods();
    }
  }, [campusInfo.districtId]);

  return (
    <div className="register-step-content">
      <CustomCard
        title="Kampüs Bilgileri"
        subtitle="Kampüsünüzün marka ve temel bilgilerini giriniz"
      >
        <div className="row row-gap-24">
          <div className="col-12">
            <FormSelect
              name="campusInfo.brandId"
              label="Marka"
              options={brands.map((brand) => ({
                value: brand.id.toString(),
                label: brand.name,
              }))}
              required
            />
          </div>

          <div className="col-12">
            <FormInput
              name="campusInfo.campusName"
              label="Kampüs Adı"
              placeholder="Kampüs adını giriniz..."
              required
            />
          </div>
        </div>
      </CustomCard>

      <CustomCard title="Lokasyon Bilgileri" mt="mt-24">
        <div className="row row-gap-24">
          <div className="col-md-6">
            <FormSelect
              name="campusInfo.countryId"
              label="Ülke"
              options={countries.map((c) => ({
                value: c.id.toString(),
                label: c.name,
              }))}
              onChange={(e) =>
                handleLocationChange(
                  "countryId",
                  e.target.value ? parseInt(e.target.value) : null
                )
              }
              required
            />
          </div>

          <div className="col-md-6">
            <FormSelect
              name="campusInfo.provinceId"
              label="İl"
              options={provinces.map((p) => ({
                value: p.id.toString(),
                label: p.name,
              }))}
              onChange={(e) =>
                handleLocationChange(
                  "provinceId",
                  e.target.value ? parseInt(e.target.value) : null
                )
              }
              required
              disabled={!campusInfo.countryId || isLoading}
            />
          </div>

          <div className="col-md-6">
            <FormSelect
              name="campusInfo.districtId"
              label="İlçe"
              options={districts.map((d) => ({
                value: d.id.toString(),
                label: d.name,
              }))}
              onChange={(e) =>
                handleLocationChange(
                  "districtId",
                  e.target.value ? parseInt(e.target.value) : null
                )
              }
              required
              disabled={!campusInfo.provinceId || isLoading}
            />
          </div>

          <div className="col-md-6">
            <FormSelect
              name="campusInfo.neighborhoodId"
              label="Mahalle"
              options={neighborhoods.map((n) => ({
                value: n.id.toString(),
                label: n.name,
              }))}
              required
              disabled={!campusInfo.districtId || isLoading}
            />
          </div>

          <div className="col-12">
            <FormInput
              name="campusInfo.address"
              label="Adres Detayı"
              placeholder="Cadde, sokak, bina no, vb..."
              required
            />
          </div>

          <div className="col-md-6">
            <FormInput
              name="campusInfo.postalCode"
              label="Posta Kodu"
              placeholder="Posta kodunu giriniz..."
            />
          </div>
        </div>
      </CustomCard>
    </div>
  );
};
