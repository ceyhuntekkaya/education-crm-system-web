"use client";
import { Breadcrumb } from "@/components";
import LoginForm from "./_sections/login-form";

const LoginPage = () => {
  return (
    <div>
      {/* Breadcrumb */}
      <Breadcrumb title={"Giriş Yap"} />
      {/* LoginForm */}
      <LoginForm />
    </div>
  );
};

export default LoginPage;
