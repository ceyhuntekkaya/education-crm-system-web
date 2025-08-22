"use client";

import React from "react";
import Link from "next/link";
import {
  FormProviderWrapper,
  FormContent,
  FormDebugValues,
  FormDebugErrors,
} from "./_sections/index";
import { FormValues } from "@/contexts";

export default function FormExamplePage() {
  const handleSubmit = async (values: FormValues) => {
    console.log("Form gönderildi:", values);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert("Form başarıyla gönderildi!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
              >
                EduCRM
              </Link>
              <span className="text-gray-300">|</span>
              <h1 className="text-lg font-semibold text-gray-800">
                Form Sistemi Örneği
              </h1>
            </div>
            <div className="flex gap-3">
              <Link
                href="/examples"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                ← Örneklere Dön
              </Link>
              <Link
                href="/"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                🏠 Ana Sayfa
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <FormProviderWrapper>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Sol taraf - Form (yarısı) */}
              <div className="lg:col-span-1">
                <div className="bg-white shadow-md rounded-lg p-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                    📝 Gelişmiş Form Sistemi
                  </h1>
                  <FormContent onSubmit={handleSubmit} />
                </div>
                {/* ...Açıklama panelleri... */}
              </div>
              {/* Sağ taraf - Debug bilgileri (diğer yarısı, yan yana) */}
              <div className="lg:col-span-1">
                <div className="sticky top-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormDebugValues />
                    <FormDebugErrors />
                  </div>
                </div>
              </div>
            </div>
          </FormProviderWrapper>
        </div>
      </div>
    </div>
  );
}
