import { useRouter } from "next/navigation";
import type { UserDto } from "@/types/dto/user/UserDto";
import { Role } from "@/enums/Role";

/**
 * Login sonrası kullanıcı bilgilerine göre yönlendirme yapar
 *
 * @description
 * Login başarılı olduktan sonra sadece bir kez çalışır.
 * Kullanıcı eksik bilgilerini tamamlamak için ilgili step'e yönlendirilir.
 *
 * Kontrol sırası:
 * - firstName, lastName, phone boşsa → /auth/register/institution?stepId=2
 * - isEmailVerified false ise → /auth/register/institution?stepId=3
 * - campus boşsa → /auth/register/institution?stepId=4
 * - subscription boşsa → /auth/register/institution?stepId=5
 *
 * Tüm bilgiler doluysa yönlendirme yapılmaz.
 */
export const usePostLoginRedirect = () => {
  const router = useRouter();

  /**
   * Login sonrası kullanıcı kontrolü ve yönlendirme
   */
  const checkAndRedirect = (user: UserDto | null) => {
    // console.log("🔍 checkAndRedirect çağrıldı:", user);

    // User yoksa yönlendirme yapma
    if (!user) {
      // console.log("❌ User bulunamadı, yönlendirme yapılmadı");
      return false;
    }

    // SUPPLY rolü için direkt ana sayfaya yönlendir
    const userRole = user.userRoles?.[0]?.role;
    if (userRole === Role.SUPPLY) {
      setTimeout(() => {
        router.push("/");
      }, 100);
      return true;
    }

    // INSTITUTION_USER kontrolü
    if (user.userType !== "INSTITUTION_USER") {
      // console.log(
      //   `ℹ️ User type ${user.userType}, INSTITUTION_USER değil, yönlendirme yapılmadı`
      // );
      return false;
    }

    // Eksik bilgileri kontrol et ve ilgili step'e yönlendir
    let targetStep: number | null = null;

    // 1. Kişisel bilgiler kontrolü (firstName, lastName, phone)
    const isPersonalInfoMissing =
      !user.firstName ||
      user.firstName === "" ||
      !user.lastName ||
      user.lastName === "" ||
      !user.phone ||
      user.phone === "";

    if (isPersonalInfoMissing) {
      targetStep = 2;
      // console.log("📝 Kişisel bilgiler eksik (firstName, lastName, phone)");
    }
    // 2. Email doğrulama kontrolü
    else if (!user.isEmailVerified) {
      targetStep = 3;
      // console.log("✉️ Email doğrulanmamış");
    }
    // 3. Campus bilgisi kontrolü
    else if (!user.campus) {
      targetStep = 4;
      // console.log("🏢 Campus bilgisi yok");
    }
    // 4. Subscription kontrolü
    //  ** sonradan açılacak
    // else if (!user.subscription) {
    //   targetStep = 5;
    //   console.log("💳 Subscription bilgisi yok");
    // }

    // Yönlendirme yap
    if (targetStep !== null) {
      const targetUrl = `/auth/register/institution?stepId=${targetStep}`;
      // console.log(`🔄 Login sonrası yönlendirme yapılıyor: ${targetUrl}`);

      // setTimeout ile bir sonraki tick'te yönlendir
      setTimeout(() => {
        // console.log(`🚀 Router.push çalıştırılıyor: ${targetUrl}`);
        router.push(targetUrl);
      }, 100);

      return true; // Yönlendirme yapıldı
    }

    // console.log("✅ Tüm bilgiler tam, yönlendirme yapılmadı");
    return false; // Yönlendirme yapılmadı
  };

  return {
    checkAndRedirect,
  };
};
