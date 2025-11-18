import { useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { useForm } from "@/contexts/form-context";
import { transformSubscriptionPlan } from "@/app/(public)/memberships/_shared/utils";
import type { SubscriptionPlanDto } from "@/types";

/**
 * URL'den stepId parametresi geldiğinde form değerlerini
 * useAuth'dan gelen user bilgileriyle otomatik doldurur
 *
 * @description
 * Backend'den gelen user objesi yapısı:
 * - user: { id, email, phone, firstName, lastName, fullName, userType, ... }
 * - user.country: { id, name, isoCode2, flagEmoji, phoneCode, ... }
 * - user.province: { id, name, code, plateCode, isMetropolitan, ... }
 * - user.district: { id, name, code, districtType, isCentral, ... }
 * - user.neighborhood: { id, name, code, neighborhoodType, ... }
 * - user.addressLine1, user.addressLine2, user.postalCode
 * - user.brand: { id, name, slug, logoUrl, ratingAverage, campusCount, schoolCount }
 * - user.campus: { id, name, slug, logoUrl, province, district, ratingAverage, schoolCount }
 * - user.subscription: { id, campusName, planName, status, price, currency, ... }
 */
export const useFormPrefill = (
  subscriptionPlans?: SubscriptionPlanDto[],
  plansLoading?: boolean
) => {
  const searchParams = useSearchParams();
  const stepIdParam = searchParams.get("stepId");
  const { user } = useAuth();
  const { setValue, getValue } = useForm();

  /**
   * Belirli bir form field'ı doluysa doldurma işlemini atla
   * Boş string ("") ve null değerler de boş kabul edilir
   */
  const setIfEmpty = useCallback(
    (field: string, value: any) => {
      const currentValue = getValue(field);
      // Eğer mevcut değer yok, null, undefined veya boş string ise yeni değeri set et
      if (
        !currentValue ||
        currentValue === "" ||
        currentValue === null ||
        currentValue === undefined
      ) {
        console.log(`📝 Prefilling ${field}:`, value);
        setValue(field, value);
      } else {
        console.log(`⏭️ Skipping ${field} (already has value):`, currentValue);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  /**
   * Login Credentials - Kullanıcı giriş bilgileri
   */
  const prefillLoginCredentials = useCallback(() => {
    if (!user) return;

    setIfEmpty("loginCredentials.username", user.email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  /**
   * Personal Info - Kişisel bilgiler (top-level user objesi)
   */
  const prefillPersonalInfo = useCallback(() => {
    if (!user) return;

    console.log("🔍 Prefilling Personal Info from user:", {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
    });

    setIfEmpty("personalInfo.firstName", user.firstName);
    setIfEmpty("personalInfo.lastName", user.lastName);
    setIfEmpty("personalInfo.email", user.email);
    setIfEmpty("personalInfo.phone", user.phone);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  /**
   * User Address - Kullanıcı adres bilgileri (top-level user objesi)
   */
  const prefillUserAddress = useCallback(() => {
    if (!user) return;

    setIfEmpty("userAddress.countryId", user.country?.id?.toString());
    setIfEmpty("userAddress.provinceId", user.province?.id?.toString());
    setIfEmpty("userAddress.districtId", user.district?.id?.toString());
    setIfEmpty("userAddress.neighborhoodId", user.neighborhood?.id?.toString());
    setIfEmpty("userAddress.addressLine1", user.addressLine1);
    setIfEmpty("userAddress.addressLine2", user.addressLine2);
    setIfEmpty("userAddress.postalCode", user.postalCode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  /**
   * Campus Info - Kampüs bilgileri (user.brand ve user.campus)
   */
  const prefillCampusInfo = useCallback(async () => {
    if (!user) return;

    setIfEmpty("campusInfo.brandId", user.brand?.id?.toString());

    if (!user.campus) {
      console.warn("⚠️ User.campus objesi bulunamadı");
      return;
    }

    setIfEmpty("campusInfo.campusName", user.campus.name);

    // Campus lokasyon bilgileri - cascade select için sıralı doldurma
    // Country: user.country'den al (campus'ta country bilgisi yok)
    await setValue("campusInfo.countryId", user.country?.id?.toString());

    // Province, District, Neighborhood için cascade loading
    setTimeout(() => {
      setIfEmpty(
        "campusInfo.provinceId",
        user.campus?.province?.id?.toString()
      );

      setTimeout(() => {
        setIfEmpty(
          "campusInfo.districtId",
          user.campus?.district?.id?.toString()
        );

        setTimeout(() => {
          setIfEmpty(
            "campusInfo.neighborhoodId",
            user.campus?.neighborhood?.id?.toString()
          );
        }, 100);
      }, 100);
    }, 100);

    // Adres satırları ve posta kodu (user'dan campusInfo'ya)
    setIfEmpty("campusInfo.addressLine1", user.addressLine1);
    setIfEmpty("campusInfo.addressLine2", user.addressLine2);
    setIfEmpty("campusInfo.postalCode", user.postalCode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  /**
   * Package Selection - Paket seçimi (user.subscription + API'den gelen plan detayları)
   */
  const prefillPackageSelection = useCallback(() => {
    if (!user?.subscription || plansLoading || !subscriptionPlans) return;

    const userSubscriptionId = user.subscription.id?.toString();
    if (!userSubscriptionId) return;

    // API'den gelen planları transform et
    const transformedPlans = subscriptionPlans
      .filter((plan) => plan.isActive && plan.isVisible)
      .map(transformSubscriptionPlan);

    // User'ın subscription ID'si ile eşleşen planı bul
    const matchedPlan = transformedPlans.find(
      (plan) => plan.id === userSubscriptionId
    );

    if (!matchedPlan) {
      console.warn(
        `⚠️ User subscription ID (${userSubscriptionId}) ile eşleşen plan bulunamadı`
      );
      return;
    }

    // Billing period'a göre doğru fiyatı al
    const price =
      matchedPlan.billingPeriod === "yearly"
        ? matchedPlan.price.yearly
        : matchedPlan.billingPeriod === "quarterly"
        ? matchedPlan.price.quarterly
        : matchedPlan.price.monthly;

    // Package selection bilgilerini API'den gelen plan detayları ile doldur
    setValue("packageSelection", {
      selectedPlanId: matchedPlan.id,
      planName: matchedPlan.name,
      planDisplayName: matchedPlan.displayName,
      billingPeriod: matchedPlan.billingPeriod || "monthly",
      price: price,
      discountPercentage: matchedPlan.discountPercentage,
      trialDays: matchedPlan.trialDays,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, subscriptionPlans, plansLoading]);

  /**
   * Tüm form bölümlerini doldur
   */
  const prefillFormFromUser = useCallback(async () => {
    if (!user) {
      console.log("⚠️ User bulunamadı, form prefill yapılmayacak");
      return;
    }

    console.log("🚀 Form prefill başlıyor, user:", user);

    prefillLoginCredentials();
    prefillPersonalInfo();
    prefillUserAddress();
    await prefillCampusInfo();
    prefillPackageSelection();

    console.log("✅ Form prefill tamamlandı");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, subscriptionPlans, plansLoading]);

  /**
   * stepId parametresi ve user varsa formu otomatik doldur
   */
  useEffect(() => {
    if (stepIdParam && user && !plansLoading) {
      console.log("🔄 stepId parametresi ile form prefill tetikleniyor:", {
        stepIdParam,
        user,
        plansLoading,
      });
      prefillFormFromUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepIdParam, user, plansLoading]);

  return {
    prefillFormFromUser,
    hasStepId: !!stepIdParam,
    hasUser: !!user,
  };
};
