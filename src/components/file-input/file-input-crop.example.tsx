/**
 * FileInput Component - Crop (Kirpma) Ozelligi Kullanim Ornegi
 *
 * Bu ornek, resim yuklerken crop (kirpma) ozelliginin nasil kullanilacagini gosterir.
 * LinkedIn kapak fotografi gibi belirli boyutlarda resim yukleme senaryolari icin idealdir.
 *
 * NOT: Form entegrasyonu ile kullanildiginda sadece 3 prop yeterlidir:
 * - isCropPreview={true}
 * - cropWidth={1584}
 * - cropHeight={396}
 *
 * name prop'u ile otomatik olarak form'a entegre olur.
 */

"use client";

import React from "react";
import { FileInput } from "@/components/file-input";

export const FileInputCropExample: React.FC = () => {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h2 className="mb-4">Resim Kirpma Ornegi - Form Entegrasyonu</h2>

          {/* Ornek 1: LinkedIn Kapak Fotografi Boyutlari (1584 x 396) */}
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title mb-3">
                LinkedIn Kapak Fotografi (1584 x 396)
              </h5>
              <FileInput
                label="Kapak Fotografi"
                type="img"
                name="coverImage"
                isCropPreview={true}
                cropWidth={1584}
                cropHeight={396}
                placeholder="Kapak fotografi yukleyin (1584 x 396 px)"
                multiple={false}
                maxSize={5}
              />
              <p className="text-muted mt-2 mb-0">
                Sadece 3 prop gerekli: isCropPreview, cropWidth, cropHeight
              </p>
            </div>
          </div>

          {/* Ornek 2: Profil Fotografi - Kare (400 x 400) */}
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title mb-3">Profil Fotografi (400 x 400)</h5>
              <FileInput
                label="Profil Fotografi"
                type="img"
                name="profileImage"
                isCropPreview={true}
                cropWidth={400}
                cropHeight={400}
                placeholder="Profil fotografi yukleyin (400 x 400 px)"
                multiple={false}
                maxSize={2}
              />
            </div>
          </div>

          {/* Ornek 3: Aspect Ratio ile Kirpma (16:9) */}
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title mb-3">
                Video Thumbnail (16:9 Aspect Ratio)
              </h5>
              <FileInput
                label="Video Thumbnail"
                type="img"
                name="videoThumbnail"
                isCropPreview={true}
                cropAspectRatio={16 / 9}
                placeholder="Thumbnail yukleyin (16:9 oraninda)"
                multiple={false}
                maxSize={3}
              />
              <p className="text-muted mt-2 mb-0">
                Bu ornekte sabit piksel boyutu yerine aspect ratio kullaniliyor.
              </p>
            </div>
          </div>

          {/* Ornek 4: Banner Resmi */}
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title mb-3">Banner Resmi (1200 x 300)</h5>
              <FileInput
                label="Banner"
                type="img"
                name="banner"
                isCropPreview={true}
                cropWidth={1200}
                cropHeight={300}
                placeholder="Banner yukleyin (1200 x 300 px)"
                multiple={false}
                maxSize={5}
              />
            </div>
          </div>

          {/* Bilgilendirme */}
          <div className="alert alert-info">
            <h6 className="alert-heading">
              <i className="ph ph-info me-2"></i>
              Form Entegrasyonu
            </h6>
            <p className="mb-0">
              FileInput componenti otomatik olarak form yapiniza entegre olur.
              name prop&apos;u ile belirtilen alana kirpilmis resim kaydedilir.
              onUpload, onUploadSuccess gibi callback&apos;lere gerek yoktur.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * KULLANIM KILAVUZU - Form Entegrasyonu
 *
 * TEMEL KULLANIM (Sadece 3 prop gerekli):
 *
 * <FileInput
 *   name="coverImage"
 *   isCropPreview={true}
 *   cropWidth={1584}
 *   cropHeight={396}
 * />
 *
 * PROPS ACIKLAMALARI:
 *
 * 1. name - Form field name (ZORUNLU)
 *    Form yapinizla entegre olmak icin gerekli
 *
 * 2. isCropPreview - Crop ozelligini aktif eder (ZORUNLU)
 *    true oldugunda kullanici resmi kirpabilir
 *
 * 3. cropWidth & cropHeight - Kirpma alani boyutlari (ZORUNLU)
 *    Piksel cinsinden kirpma alani genisligi ve yuksekligi
 *    Ornek: cropWidth={1584} cropHeight={396}
 *
 * 4. cropAspectRatio - Alternatif aspect ratio (OPSIYONEL)
 *    cropWidth/cropHeight yerine aspect ratio kullanabilirsiniz
 *    Ornek: cropAspectRatio={16/9} veya cropAspectRatio={1} (kare)
 *
 * KULLANICI DENEYIMI:
 * 1. Kullanici resim secer
 * 2. Onizleme alaninda resim gorunur
 * 3. Crop ikonuna tiklar (buyutec yerine crop ikonu gosterilir)
 * 4. Modal acilir ve resmi istedigi gibi kirpabilir
 * 5. Zoom yapabilir (slider ile)
 * 6. "Degisiklikleri Kaydet" butonuna basar
 * 7. Kirpilmis resim HEMEN API'ye gonderilir (otomatik upload)
 * 8. "API'ye Yukleniyor..." mesaji gosterilir
 * 9. Basarili olursa modal kapanir
 * 10. Resim otomatik olarak form'a kaydedilir
 *
 * NOT:
 * - onUpload, onUploadSuccess, onUploadError gibi callback'ler OPSIYONELDIR
 * - name prop'u ile otomatik form entegrasyonu saglanir
 * - Kirpilmis resim otomatik olarak files listesine eklenir
 * - Form submit'te kirpilmis resim kullanilir
 */

export default FileInputCropExample;
