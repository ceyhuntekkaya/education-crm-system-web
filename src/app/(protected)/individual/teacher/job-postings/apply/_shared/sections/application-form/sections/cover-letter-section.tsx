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
      <div className="p-20 d-flex flex-column gap-24">
        <FormTextarea
          label=""
          name="coverLetter"
          rows={24}
          placeholder="Kendinizi tanıtın ve bu pozisyon için neden uygun olduğunuzu açıklayın...&#10;&#10;• Deneyimleriniz ve yetkinlikleriniz&#10;• Bu pozisyona olan ilginiz&#10;• Ekibe katabileceğiniz değer&#10;&#10;(En az 50 karakter gereklidir)"
          disabled={submitting}
          helperText="İyi bir ön yazı, başvurunuzun öne çıkmasına yardımcı olur."
          variant="inline"
        />

        <FileInput
          label="Destekleyici Belgeler (Opsiyonel)"
          type="all"
          variant="outline"
          placeholder="Dosyaları yüklemek için tıklayın veya sürükleyin (Çoklu seçim yapabilirsiniz)"
          maxSize={100}
          maxFiles={20}
          uploadButtonText="Dosyaları Yükle"
          name="documents"
          multiple
        />

        {/* İpuçları */}
        <div className="p-16 bg-info-50 rounded-12">
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
                <li className="mb-0">Profesyonel ve içten bir dil kullanın</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
