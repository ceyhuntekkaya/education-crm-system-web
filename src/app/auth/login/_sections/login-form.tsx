"use client";
import * as yup from "yup";
import Image from "next/image";
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
  username: "admin@egitimara.com",
  password: "genixo123",
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

                <div className="text-end">
                  <a
                    href="javascript:void(0)"
                    className="text-warning-600 hover-text-decoration-underline"
                  >
                    Şifremi Unuttum
                  </a>
                </div>
                <div>
                  <p className="text-neutral-500 d-flex gap-4">
                    Hesabınız yok mu?
                    <a
                      href="sign-up.html"
                      className="fw-semibold text-main-600 hover-text-decoration-underline"
                    >
                      Kayıt Ol
                    </a>
                  </p>
                </div>

                <div>
                  <Button type="submit" rightIcon="ph-arrow-up-right">
                    Giriş Yap
                  </Button>
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
