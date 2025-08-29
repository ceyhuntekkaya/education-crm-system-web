"use client";
import { useState } from "react";
import Image from "next/image";
import { FormProvider, useAuth, FormValues } from "@/contexts";
import * as yup from "yup";
import { Button, Form, FormInput } from "@/components";
import { useFormHook } from "@/hooks";
import { useRouter } from "next/navigation";
import { Role } from "@/enums/Role";
import { PATHS } from "@/routes/paths";

// Yup validation schema
const validationSchema = yup.object({
  email: yup.string().required("Email adresi zorunludur"),
  password: yup.string().required("Parola zorunludur"),
});

// İlk değerler
const initialValues: FormValues = {
  email: "",
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
    const res = await login(String(values.email), String(values.password));
    if (res.success) {
      switch (res.role) {
        case Role.ADMIN:
          router.push(PATHS.PROTECTED.ADMIN.HOME);
          break;
        case Role.USER:
          router.push(PATHS.PROTECTED.USER.HOME);
          break;
        case Role.CANDIDATE:
          router.push(PATHS.PROTECTED.CANDIDATE.HOME);
          break;
        case Role.COMPANY:
          router.push(PATHS.PROTECTED.COMPANY.HOME);
          break;
        default:
          router.push(PATHS.PUBLIC.HOME);
      }
    }
  };

  return (
    <div className="account py-120 position-relative">
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
                  name="email"
                  label="E-posta"
                  placeholder="E-posta adresinizi giriniz"
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
            <div className="account-img">
              <Image
                src="/assets/images/thumbs/account-img.png"
                alt="Account"
                width={500} // adjust to your image's actual width
                height={400} // adjust to your image's actual height
                priority // ensures faster LCP for above-the-fold images
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
