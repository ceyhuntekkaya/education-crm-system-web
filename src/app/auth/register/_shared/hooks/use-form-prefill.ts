import { useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { useForm } from "@/contexts/form-context";

/**
 * URL'den stepId parametresi geldiğinde form değerlerini
 * useAuth'dan gelen user bilgileriyle doldurur
 */
export const useFormPrefill = () => {
  const searchParams = useSearchParams();
  const stepIdParam = searchParams.get("stepId");
  const { user } = useAuth();
  console.log("user => ", user);
  const { setValue, getValue } = useForm();

  /**
   * User bilgilerinden form değerlerini doldurur
   */
  const prefillFormFromUser = useCallback(async () => {
    if (!user) return;

    // Login Credentials - Email'i username olarak kullan
    if (user.email && !getValue("loginCredentials.username")) {
      setValue("loginCredentials.username", user.email);
    }

    // Personal Info - Kişisel Bilgiler
    if (user.firstName && !getValue("personalInfo.firstName")) {
      setValue("personalInfo.firstName", user.firstName);
    }
    if (user.lastName && !getValue("personalInfo.lastName")) {
      setValue("personalInfo.lastName", user.lastName);
    }
    if (user.email && !getValue("personalInfo.email")) {
      setValue("personalInfo.email", user.email);
    }
    if (user.phone && !getValue("personalInfo.phone")) {
      setValue("personalInfo.phone", user.phone);
    }

    // Campus Info - Brand Bilgisi (sadece user.brand'dan al)
    // user.brand object: { id, name, slug, logoUrl, ratingAverage, campusCount, schoolCount }
    if (user.brand?.id && !getValue("campusInfo.brandId")) {
      setValue("campusInfo.brandId", user.brand.id.toString());
    }

    // Campus Info - Tüm kampüs bilgileri SADECE user.campus objesinden alınmalı
    if (!user.campus) {
      console.warn(
        "⚠️ User.campus objesi bulunamadı, kampüs bilgileri doldurulamadı"
      );
      return;
    }

    // Campus Info - Campus Adı (sadece campus objesinden)
    // user.campus object: { id, name, slug, logoUrl, province, district, ... }
    if (user.campus.name && !getValue("campusInfo.campusName")) {
      setValue("campusInfo.campusName", user.campus.name);
    }

    // Campus Info - Lokasyon Bilgileri (SADECE campus objesinden)

    // Country - user.country'den al (campus'ta country bilgisi yok)
    if (user.country?.id && !getValue("campusInfo.countryId")) {
      await setValue("campusInfo.countryId", user.country.id.toString());
    }

    // province, district için küçük bir gecikme ekle
    // useLocationData hook'unun reset işleminden sonra doldurmak için
    setTimeout(() => {
      // province - SADECE campus'tan
      // user.campus.province object: { id, name, code, plateCode, isMetropolitan, schoolCount }
      if (user.campus?.province?.id && !getValue("campusInfo.provinceId")) {
        setValue("campusInfo.provinceId", user.campus.province.id.toString());
      }

      // Bir sonraki tick'te district'i doldur
      setTimeout(() => {
        // district - SADECE campus'tan
        // user.campus.district object: { id, name, code, districtType, isCentral, schoolCount, socioeconomicLevel }
        if (user.campus?.district?.id && !getValue("campusInfo.districtId")) {
          setValue("campusInfo.districtId", user.campus.district.id.toString());
        }

        // Bir sonraki tick'te neighborhood'u doldur
        setTimeout(() => {
          // neighborhood - SADECE campus'tan (eğer varsa)
          // user.campus.neighborhood object: { id, name, code, ... }
          if (
            user.campus?.neighborhood?.id &&
            !getValue("campusInfo.neighborhoodId")
          ) {
            setValue(
              "campusInfo.neighborhoodId",
              user.campus.neighborhood.id.toString()
            );
          }
        }, 100);
      }, 100);
    }, 100);

    // Package Selection - Abonelik planı bilgilerini doldur
    // user.subscription object: { id, campusName, planName, status, price, currency, nextBillingDate, endDate, autoRenew, daysRemaining, usagePercentage }
    if (user.subscription) {
      // selectedPlanId - subscription.id'yi kullan
      if (
        user.subscription.id &&
        !getValue("packageSelection.selectedPlanId")
      ) {
        setValue(
          "packageSelection.selectedPlanId",
          user.subscription.id.toString()
        );
      }

      // planName - subscription.planName'i kullan
      if (
        user.subscription.planName &&
        !getValue("packageSelection.planName")
      ) {
        setValue("packageSelection.planName", user.subscription.planName);
      }

      // planDisplayName - planName ile aynı olabilir
      if (
        user.subscription.planName &&
        !getValue("packageSelection.planDisplayName")
      ) {
        setValue(
          "packageSelection.planDisplayName",
          user.subscription.planName
        );
      }

      // billingPeriod - planName'den çıkar (Aylık/Üç Aylık/Yıllık)
      if (!getValue("packageSelection.billingPeriod")) {
        let billingPeriod: "monthly" | "quarterly" | "yearly" = "monthly";
        const planNameLower = user.subscription.planName?.toLowerCase() || "";

        if (
          planNameLower.includes("yıllık") ||
          planNameLower.includes("annual")
        ) {
          billingPeriod = "yearly";
        } else if (
          planNameLower.includes("üç aylık") ||
          planNameLower.includes("quarterly")
        ) {
          billingPeriod = "quarterly";
        } else if (
          planNameLower.includes("aylık") ||
          planNameLower.includes("monthly")
        ) {
          billingPeriod = "monthly";
        }

        setValue("packageSelection.billingPeriod", billingPeriod);
      }

      // price - subscription.price'ı kullan
      if (
        user.subscription.price !== undefined &&
        !getValue("packageSelection.price")
      ) {
        setValue("packageSelection.price", user.subscription.price);
      }
    }

    // Subscription Info - Abonelik bilgilerini paymentInfo formuna doldur
    // user.subscription object: { id, campusName, planName, status, price, currency, nextBillingDate, endDate, autoRenew, daysRemaining, usagePercentage }
    if (user.subscription) {
      if (user.subscription.planName && !getValue("paymentInfo.planName")) {
        setValue("paymentInfo.planName", user.subscription.planName);
      }
      if (user.subscription.status && !getValue("paymentInfo.status")) {
        setValue("paymentInfo.status", user.subscription.status);
      }
      if (user.subscription.campusName && !getValue("paymentInfo.campusName")) {
        setValue("paymentInfo.campusName", user.subscription.campusName);
      }
      if (
        user.subscription.price !== undefined &&
        !getValue("paymentInfo.price")
      ) {
        setValue("paymentInfo.price", user.subscription.price);
      }
      if (user.subscription.currency && !getValue("paymentInfo.currency")) {
        setValue("paymentInfo.currency", user.subscription.currency);
      }
      if (
        user.subscription.daysRemaining !== undefined &&
        !getValue("paymentInfo.daysRemaining")
      ) {
        setValue("paymentInfo.daysRemaining", user.subscription.daysRemaining);
      }

      // NOT: Kart bilgileri (cardHolderName, cardNumber, cvv, expiryMonth, expiryYear)
      // güvenlik nedeniyle API'dan gelmez ve doldurulmaz.
      // Kullanıcı bu bilgileri manuel olarak girmelidir.
    }

    // Address bilgileri - campus'ta yok, doldurmuyoruz
    // Sadece campus objesindeki bilgileri (name, province, district) dolduruyoruz
    // brandId user.brand'dan alınıyor (yukarıda)
  }, [user, getValue, setValue]);

  /**
   * stepId varsa ve user giriş yapmışsa formu doldur
   */
  useEffect(() => {
    // stepId parametresi varsa ve user mevcutsa
    if (stepIdParam && user) {
      prefillFormFromUser();
    }
  }, [stepIdParam, user, prefillFormFromUser]);

  return {
    prefillFormFromUser,
    hasStepId: !!stepIdParam,
    hasUser: !!user,
  };
};
