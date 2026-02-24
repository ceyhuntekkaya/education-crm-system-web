"use client";

import React from "react";
import { FormTextarea } from "@/components/forms";
import { FileInput } from "@/components/file-input";
import { useApplicationAdd } from "../../../context";

/**
 * Cover letter ve belge yükleme bölümü
 */
export const CoverLetterSection: React.FC = () => {
  const { submitting } = useApplicationAdd();

  return (
    <>
      {/* Ön Yazı Bölümü */}
      <div className="bg-white rounded-12 shadow-sm mb-20">
        <div className="p-20 border-bottom border-neutral-100">
          <div className="d-flex align-items-center gap-10">
            <i
              className="ph ph-file-text text-primary-600"
              style={{ fontSize: "18px" }}
            ></i>
            <h6 className="mb-0 fw-semibold text-neutral-900">
              Ön Yazı (Cover Letter)
            </h6>
          </div>
        </div>
        <div className="p-20">
          <FormTextarea
            label=""
            name="coverLetter"
            rows={24}
            placeholder="Kendinizi tanıtın ve bu pozisyon için neden uygun olduğunuzu açıklayın...&#10;&#10;• Deneyimleriniz ve yetkinlikleriniz&#10;• Bu pozisyona olan ilginiz&#10;• Ekibe katabileceğiniz değer&#10;&#10;(En az 50 karakter gereklidir)"
            disabled={submitting}
            helperText="İyi bir ön yazı, başvurunuzun öne çıkmasına yardımcı olur."
            variant="inline"
          />

          {/* İpuçları */}
          <div className="p-16 bg-info-50 rounded-12 mt-20">
            <div className="d-flex align-items-start gap-12">
              <i
                className="ph ph-lightbulb text-info-600 flex-shrink-0"
                style={{ fontSize: "18px" }}
              ></i>
              <div className="flex-grow-1">
                <p className="mb-8 text-sm text-neutral-900 fw-semibold">
                  İpuçları:
                </p>
                <ul className="mb-0 ps-16 text-sm text-neutral-700">
                  <li className="mb-4">
                    Deneyimlerinizi ve güçlü yönlerinizi vurgulayın
                  </li>
                  <li className="mb-4">İlanla ilgili detayları dikkate alın</li>
                  <li className="mb-0">
                    Profesyonel ve içten bir dil kullanın
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Destekleyici Belgeler Bölümü */}
      <div className="bg-white rounded-12 shadow-sm mb-20">
        <div className="p-20 border-bottom border-neutral-100">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-10">
              <i
                className="ph ph-paperclip text-primary-600"
                style={{ fontSize: "18px" }}
              ></i>
              <h6 className="mb-0 fw-semibold text-neutral-900">
                Destekleyici Belgeler
              </h6>
              <span className="badge bg-neutral-100 text-neutral-600 text-xs fw-normal">
                Opsiyonel
              </span>
            </div>
          </div>
          <p className="text-sm text-neutral-600 mb-0 mt-8">
            Başvurunuzu güçlendirmek için CV, sertifika, referans mektubu gibi
            belgelerinizi ekleyebilirsiniz
          </p>
        </div>
        <div className="p-20">
          <FileInput
            label=""
            type="all"
            variant="outline"
            placeholder="Belgeleri yüklemek için tıklayın veya sürükleyip bırakın&#10;&#10;Desteklenen formatlar: PDF, DOC, DOCX, JPG, PNG&#10;Maksimum dosya boyutu: 10MB"
            maxSize={10}
            maxFiles={5}
            uploadButtonText="Belgeleri Yükle"
            name="documents"
            multiple
            disabled={submitting}
            isAutoUpload
          />

          <div className="p-16 bg-warning-50 rounded-12 mt-20">
            <div className="d-flex align-items-start gap-12">
              <i
                className="ph ph-info text-warning-600 flex-shrink-0"
                style={{ fontSize: "18px" }}
              ></i>
              <div className="flex-grow-1">
                <p className="mb-8 text-sm text-neutral-900 fw-semibold">
                  Belge Yükleme Önerileri
                </p>
                <ul className="mb-0 ps-16 text-sm text-neutral-700">
                  <li className="mb-4">
                    <strong>CV/Özgeçmiş:</strong> Güncel ve profesyonel bir CV
                    ekleyin
                  </li>
                  <li className="mb-4">
                    <strong>Sertifikalar:</strong> İlgili eğitim ve sertifika
                    belgeleriniz
                  </li>
                  <li className="mb-4">
                    <strong>Referans Mektupları:</strong> Önceki
                    çalışmalarınızdan referanslar
                  </li>
                  <li className="mb-0">
                    <strong>Portföy:</strong> Çalışma örnekleri ve projeler
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
