"use client";
import * as yup from "yup";
import Image from "next/image";
import Link from "next/link";
import { Button, Form, FormInput } from "@/components";
import { useRouter } from "next/navigation";
import { Role } from "@/enums/Role";
import { PATHS } from "@/routes/paths";
import { AuthenticationResponse, FormValues } from "@/types";
import { FormProvider, useAuth } from "@/contexts";
import "./login-form.scss";
import { HEADER_CONFIG } from "@/components/layouts/header/config";

const validationSchema = yup.object({
  username: yup.string().required("Kullanıcı adı zorunludur"),
  password: yup.string().required("Parola zorunludur"),
});

const initialValues: FormValues = {
  username: "",
  password: "",
};

const LoginForm: React.FC = () => {
  return (
    <FormProvider
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      <LoginFormContent />
    </FormProvider>
  );
};

const LoginFormContent: React.FC = () => {
  const router = useRouter();
  const { login } = useAuth();

  const onSubmit = async (values: FormValues) => {
    const loginRequest = {
      username: String(values.username ?? ""),
      password: String(values.password ?? ""),
    };
    const res = await (
      login as (
        formData: typeof loginRequest
      ) => Promise<AuthenticationResponse>
    )(loginRequest);

    console.log("Login response:", res);

    // ** dashboard yönlendirme işlemi role göre yapılacak
    // if (res?.accessToken) {
    //   const userRoles = res.user?.userRoles;
    //   const role =
    //     Array.isArray(userRoles) && userRoles.length > 0
    //       ? userRoles[0]?.role
    //       : undefined;
    //   switch (role) {
    //     case Role.ADMIN:
    //       router.push(PATHS.PROTECTED.ADMIN.HOME);
    //       break;
    //     case Role.USER:
    //       router.push(PATHS.PROTECTED.USER.HOME);
    //       break;
    //     case Role.CANDIDATE:
    //       router.push(PATHS.PROTECTED.CANDIDATE.HOME);
    //       break;
    //     case Role.COMPANY:
    //       router.push(PATHS.PROTECTED.COMPANY.HOME);
    //       break;
    //     default:
    //       router.push(PATHS.PUBLIC.HOME);
    //   }
    // }

    // Login başarılı ise önceki sayfaya yönlendir
    if (res?.accessToken) {
      // Eğer registration'a yönlendirme yapıldıysa, başka yönlendirme yapma
      if ((res as any).wasRedirectedToRegistration) {
        console.log(
          "✅ Kullanıcı registration'a yönlendirildi, başka yönlendirme yapılmayacak"
        );
        return;
      }

      // URL parametrelerinden returnUrl'i al
      const urlParams = new URLSearchParams(window.location.search);
      const returnUrl = urlParams.get("returnUrl");

      if (returnUrl && returnUrl !== "/auth/login") {
        // ReturnUrl varsa ve login sayfası değilse oraya yönlendir
        router.push(decodeURIComponent(returnUrl));
      } else {
        // ReturnUrl yoksa browser history'den bir önceki sayfaya git
        router.back();
      }
    }
  };

  return (
    <div className="account py-40 position-relative">
      <div className="container">
        <div className="row gy-4 align-items-center">
          <div className="col-lg-6">
            <div className="bg-main-25 border border-neutral-30 rounded-8 p-32">
              <div className="mb-32">
                <h3 className="mb-16 text-neutral-500">Tekrar Hoşgeldiniz!</h3>
                <p className="text-neutral-500">
                  Hesabınıza giriş yapın ve bize katılın
                </p>
              </div>
              <Form onSubmit={onSubmit} className="d-flex flex-column gap-16">
                <FormInput
                  name="username"
                  label="Kullanıcı Adı"
                  placeholder="Kullanıcı adınızı giriniz"
                />

                <FormInput
                  type="password"
                  name="password"
                  label="Şifre"
                  placeholder="Şifrenizi giriniz"
                />
                <div className="mt-n3 mb-3 text-end">
                  <a
                    href="javascript:void(0)"
                    className="text-warning-600 hover-text-decoration-underline text-sm"
                  >
                    Şifremi Unuttum
                  </a>
                </div>

                <Button
                  type="submit"
                  rightIcon="ph-arrow-up-right"
                  className="w-100"
                >
                  Giriş Yap
                </Button>

                <div className="text-center">
                  <p className="text-neutral-500 mb-0">
                    Hesabınız yok mu?{" "}
                    <Link
                      href="/auth/register"
                      className="fw-semibold text-main-600 hover-text-decoration-underline"
                    >
                      Kayıt Ol
                    </Link>
                  </p>
                </div>

                {/* Sosyal Medya Girişleri */}
                <div className="social-login-divider">
                  <span>veya</span>
                </div>

                <div className="social-login-buttons">
                  <button
                    type="button"
                    className="social-login-btn google"
                    onClick={() => {
                      // Google OAuth işlemi buraya eklenecek
                      console.log("Google ile giriş yapılıyor...");
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.1713 8.36791H17.5001V8.33333H10.0001V11.6667H14.7096C14.0225 13.6071 12.1763 15 10.0001 15C7.23882 15 5.00008 12.7613 5.00008 9.99999C5.00008 7.23874 7.23882 4.99999 10.0001 4.99999C11.2746 4.99999 12.4342 5.48124 13.3171 6.26624L15.6742 3.90916C14.1859 2.52207 12.1951 1.66666 10.0001 1.66666C5.39799 1.66666 1.66675 5.39791 1.66675 9.99999C1.66675 14.6021 5.39799 18.3333 10.0001 18.3333C14.6022 18.3333 18.3334 14.6021 18.3334 9.99999C18.3334 9.44124 18.2759 8.89582 18.1713 8.36791Z"
                        fill="#FFC107"
                      />
                      <path
                        d="M2.62744 6.12124L5.36536 8.12916C6.10619 6.29499 7.90036 4.99999 9.99994 4.99999C11.2744 4.99999 12.434 5.48124 13.3169 6.26624L15.674 3.90916C14.1857 2.52207 12.1949 1.66666 9.99994 1.66666C6.79911 1.66666 4.02328 3.47374 2.62744 6.12124Z"
                        fill="#FF3D00"
                      />
                      <path
                        d="M10.0001 18.3333C12.1526 18.3333 14.1092 17.5096 15.5871 16.17L13.0079 13.9875C12.1429 14.6479 11.0862 15.0009 10.0001 15C7.83257 15 5.99215 13.618 5.29882 11.6892L2.5834 13.7829C3.96007 16.4817 6.76132 18.3333 10.0001 18.3333Z"
                        fill="#4CAF50"
                      />
                      <path
                        d="M18.1713 8.36791H17.5001V8.33333H10.0001V11.6667H14.7096C14.3809 12.5902 13.7889 13.3972 13.0067 13.9879L13.0079 13.9871L15.5871 16.1696C15.4046 16.3354 18.3334 14.1667 18.3334 9.99999C18.3334 9.44124 18.2759 8.89582 18.1713 8.36791Z"
                        fill="#1976D2"
                      />
                    </svg>
                    <span>Google ile Giriş Yap</span>
                  </button>

                  <button
                    type="button"
                    className="social-login-btn apple"
                    onClick={() => {
                      // Apple OAuth işlemi buraya eklenecek
                      console.log("Apple ile giriş yapılıyor...");
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.8334 17.5C14.9167 18.3333 13.9167 18.3333 13 17.9167C12.0834 17.5 11.25 17.5 10.25 17.9167C8.91675 18.5 8.25008 18.4167 7.50008 17.5C3.75008 13.5833 4.25008 7.58333 8.50008 7.41667C9.50008 7.5 10.1667 8 10.9167 8.08333C12.0834 7.83333 13.1667 7.25 14.4167 7.33333C15.8334 7.5 16.9167 8.08333 17.5834 9.16667C14.6667 10.9167 15.3334 14.8333 18.0834 15.8333C17.5 17.1667 16.75 18.4167 15.8334 17.5ZM10.8334 7.33333C10.6667 5.41667 12.1667 3.83333 14.0001 3.66667C14.3334 5.91667 12.0834 7.58333 10.8334 7.33333Z"
                        fill="currentColor"
                      />
                    </svg>
                    <span>Apple ile Giriş Yap</span>
                  </button>
                </div>
              </Form>
            </div>
          </div>
          <div className="col-lg-6 d-lg-block d-none">
            <div className="login-illustration">
              {/* Ana Logo Alanı */}
              <div className="logo-section">
                <div className="logo-container">
                  <div className="logo-wrapper">
                    <Image
                      src={HEADER_CONFIG.LOGO_PATH}
                      alt="Eğitim İşte Logo"
                      width={180}
                      height={60}
                      priority
                    />
                  </div>
                  <p className="brand-tagline">Eğitim Yönetim Sistemi</p>
                </div>
              </div>

              {/* Özellikler Kartları */}
              <div className="features-grid">
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="ph-fill ph-buildings"></i>
                  </div>
                  <h3>Okul Yönetimi</h3>
                  <p>
                    Eğitim kurumlarınızın detaylı yönetim işlemlerini
                    gerçekleştirin
                  </p>
                </div>

                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="ph-fill ph-calendar"></i>
                  </div>
                  <h3>Randevu Sistemi</h3>
                  <p>
                    Toplantılar ve görüşmeleri online randevu sistemiyle
                    koordine edin
                  </p>
                </div>

                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="ph-fill ph-chart-bar"></i>
                  </div>
                  <h3>Analitik Raporlar</h3>
                  <p>
                    Performans metriklerini analiz ederek strateji geliştirin
                  </p>
                </div>

                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="ph-fill ph-megaphone"></i>
                  </div>
                  <h3>Kampanyalar</h3>
                  <p>
                    İndirim kampanyaları ve pazarlama stratejilerinizi planlayın
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
