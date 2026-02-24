"use client";

import React from "react";
import { FormTextarea } from "@/components/forms";
import { useEventRegistrationAdd } from "../../../context";

/**
 * Kayıt notu bölümü
 */
export const RegistrationNoteSection: React.FC = () => {
  const { submitting } = useEventRegistrationAdd();

  return (
    <div className="bg-white rounded-12 shadow-sm mb-20">
      <div className="p-20 border-bottom border-neutral-100">
        <div className="d-flex align-items-center gap-10">
          <i
            className="ph ph-note-pencil text-primary-600"
            style={{ fontSize: "18px" }}
          />
          <div>
            <h6 className="mb-0 fw-semibold text-neutral-900">Kayıt Notu</h6>
          </div>
          <span className="badge bg-neutral-100 text-neutral-600 text-xs fw-normal ms-auto">
            İsteğe Bağlı
          </span>
        </div>
      </div>
      <div className="p-20">
        <FormTextarea
          label=""
          name="registrationNote"
          rows={8}
          placeholder="Kendiniz hakkında kısa bir not ekleyebilirsiniz...&#10;&#10;• Motivasyonunuz ve beklentileriniz&#10;• Konu hakkındaki deneyiminiz&#10;• Sormak istediğiniz sorular"
          disabled={submitting}
          helperText="En fazla 1000 karakter"
          variant="inline"
        />

        {/* İpuçları */}
        <div className="p-16 bg-info-50 rounded-12 mt-20">
          <div className="d-flex align-items-start gap-12">
            <i
              className="ph ph-lightbulb text-info-600 flex-shrink-0"
              style={{ fontSize: "18px" }}
            />
            <div>
              <p className="mb-8 text-sm text-neutral-900 fw-semibold">
                İpuçları:
              </p>
              <ul className="mb-0 ps-16 text-sm text-neutral-700">
                <li className="mb-4">
                  Etkinliğe katılım amacınızı kısaca belirtin
                </li>
                <li className="mb-4">
                  Konuyla ilgili mevcut deneyiminizi paylaşın
                </li>
                <li className="mb-0">
                  Merak ettiğiniz konuları önceden belirtebilirsiniz
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
