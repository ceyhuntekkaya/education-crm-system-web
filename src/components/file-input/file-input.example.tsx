"use client";

import React from "react";
import { FileInput } from "./";

const FileInputExamples: React.FC = () => {
  return (
    <div className="container py-5">
      <hr />
      <hr />

      <FileInput
        label="Tanıtım Videosu"
        type="video"
        variant="outline"
        multiple={true}
        placeholder="Video dosyanızı seçin (MP4, AVI, MOV)"
        uploadButtonText="Videoyu Yükle"
      />
      <hr />
      <hr />
      <hr />
      {/* Ana Başlık */}
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold text-primary mb-3">
          📁 FileInput Örnekleri
        </h1>
        <p className="lead text-muted">
          Modern ve context-tabanlı dosya yükleme component&apos;i örnekleri
        </p>
        <hr className="my-4" />
      </div>

      <div className="row g-4">
        {/* 1. Profil Fotoğrafı Yükleme */}
        <div className="col-12">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-primary text-white">
              <h3 className="card-title mb-0">
                <i className="bi bi-person-circle me-2"></i>
                Profil Fotoğrafı Yükleme
              </h3>
            </div>
            <div className="card-body">
              <p className="text-muted mb-3">
                Kullanıcı profil fotoğrafları için optimize edilmiş, çoklu resim
                yükleme desteği
              </p>
              <FileInput
                label="Profil Fotoğrafları"
                type="img"
                variant="outline"
                multiple={true}
                maxFiles={3}
                maxSize={5}
                placeholder="Profil fotoğraflarınızı seçin veya sürükleyip bırakın"
                uploadButtonText="Fotoğrafları Yükle"
                required={true}
              />
            </div>
          </div>
        </div>

        {/* 2. Tek Dosya Yükleme */}
        <div className="col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-success text-white">
              <h3 className="card-title mb-0">
                <i className="bi bi-file-earmark-text me-2"></i>
                Belge Yükleme
              </h3>
            </div>
            <div className="card-body">
              <p className="text-muted mb-3">
                Tek belge yükleme, PDF/Word dosyaları için uygun
              </p>
              <FileInput
                label="CV/Özgeçmiş"
                type="file"
                variant="inline"
                multiple={false}
                maxSize={10}
                placeholder="CV dosyanızı seçin (PDF, DOC, DOCX)"
                uploadButtonText="CV'yi Yükle"
              />
            </div>
          </div>
        </div>

        {/* 3. Video Yükleme */}
        <div className="col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-danger text-white">
              <h3 className="card-title mb-0">
                <i className="bi bi-camera-video me-2"></i>
                Video Yükleme
              </h3>
            </div>
            <div className="card-body">
              <p className="text-muted mb-3">
                Sunum videoları ve eğitim içerikleri için
              </p>
              <FileInput
                label="Tanıtım Videosu"
                type="video"
                variant="outline"
                multiple={true}
                placeholder="Video dosyanızı seçin (MP4, AVI, MOV)"
                uploadButtonText="Videoyu Yükle"
              />
            </div>
          </div>
        </div>

        {/* 4. Çoklu Belge Yükleme */}
        <div className="col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-warning text-dark">
              <h3 className="card-title mb-0">
                <i className="bi bi-files me-2"></i>
                Çoklu Belge Yükleme
              </h3>
            </div>
            <div className="card-body">
              <p className="text-muted mb-3">
                Proje dosyaları, belgeler ve dökümanlar için
              </p>
              <FileInput
                label="Proje Dosyaları"
                type="file"
                variant="outline"
                multiple={true}
                maxFiles={10}
                maxSize={25}
                placeholder="Proje dosyalarınızı seçin (PDF, DOC, XLS, PPT)"
                uploadButtonText="Dosyaları Yükle"
              />
            </div>
          </div>
        </div>

        {/* 5. Her Tür Dosya */}
        <div className="col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-info text-white">
              <h3 className="card-title mb-0">
                <i className="bi bi-cloud-upload me-2"></i>
                Genel Dosya Yükleme
              </h3>
            </div>
            <div className="card-body">
              <p className="text-muted mb-3">
                Tüm dosya türlerini destekleyen genel amaçlı yükleme
              </p>
              <FileInput
                label="Herhangi Bir Dosya"
                type="all"
                variant="outline"
                multiple={true}
                maxFiles={5}
                maxSize={50}
                placeholder="Herhangi bir dosya türünü yükleyebilirsiniz"
                uploadButtonText="Dosyaları Yükle"
              />
            </div>
          </div>
        </div>

        {/* 6. Minimal Görünüm */}
        <div className="col-12">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-secondary text-white">
              <h3 className="card-title mb-0">
                <i className="bi bi-layout-text-sidebar-reverse me-2"></i>
                Minimal Görünüm (Upload Butonu Yok)
              </h3>
            </div>
            <div className="card-body">
              <p className="text-muted mb-3">
                Upload butonu olmadan, sadece dosya seçimi ve önizleme
              </p>
              <FileInput
                label="Basit Dosya Seçici"
                type="img"
                variant="inline"
                multiple={true}
                maxFiles={3}
                maxSize={5}
                placeholder="Resimleri seçin, otomatik yüklenecek"
              />
            </div>
          </div>
        </div>

        {/* 7. Hata Durumu Örneği */}
        <div className="col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-danger text-white">
              <h3 className="card-title mb-0">
                <i className="bi bi-exclamation-triangle me-2"></i>
                Hata Durumu Örneği
              </h3>
            </div>
            <div className="card-body">
              <p className="text-muted mb-3">
                Validation hatası olan dosya yükleme örneği
              </p>
              <FileInput
                label="Hatalı Dosya Yükleme"
                type="img"
                variant="outline"
                multiple={false}
                maxFiles={1}
                maxSize={1}
                placeholder="Küçük bir resim seçin (Max 1MB)"
                error="Dosya boyutu çok büyük! Maksimum 1MB olmalı."
                uploadButtonText="Resmi Yükle"
              />
            </div>
          </div>
        </div>

        {/* 8. Devre Dışı Örneği */}
        <div className="col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-dark text-white">
              <h3 className="card-title mb-0">
                <i className="bi bi-slash-circle me-2"></i>
                Devre Dışı Durum
              </h3>
            </div>
            <div className="card-body">
              <p className="text-muted mb-3">
                Kullanıcının yetki durumuna göre devre dışı bırakılmış
              </p>
              <FileInput
                label="Yetki Gereken Dosya Yükleme"
                type="file"
                variant="outline"
                multiple={false}
                maxSize={10}
                placeholder="Bu alan şu anda kullanılamaz"
                disabled={true}
                uploadButtonText="Yükle (Devre Dışı)"
              />
            </div>
          </div>
        </div>

        {/* 9. Zorunlu Alan Örneği */}
        <div className="col-12">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-primary text-white">
              <h3 className="card-title mb-0">
                <i className="bi bi-asterisk me-2"></i>
                Zorunlu Alan Örneği
              </h3>
            </div>
            <div className="card-body">
              <p className="text-muted mb-3">
                Form validasyonları için zorunlu dosya yükleme alanı
              </p>
              <FileInput
                label="Kimlik Belgesi"
                type="img"
                variant="outline"
                multiple={false}
                maxFiles={1}
                maxSize={5}
                placeholder="Kimlik belgenizin fotoğrafını yükleyin (PNG, JPG)"
                uploadButtonText="Belgeyi Yükle"
                required={true}
                className="border-2"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Alt Bilgi */}
      <div className="text-center mt-5">
        <div className="alert alert-info">
          <h5 className="alert-heading">
            <i className="bi bi-info-circle me-2"></i>
            Kullanım Notları
          </h5>
          <hr />
          <p className="mb-2">
            <strong>Context Tabanlı:</strong> Tüm component&apos;ler context
            üzerinden iletişim kurar
          </p>
          <p className="mb-2">
            <strong>Type Güvenliği:</strong> TypeScript ile tam tip desteği
          </p>
          <p className="mb-2">
            <strong>Responsive:</strong> Tüm cihazlarda uyumlu çalışır
          </p>
          <p className="mb-0">
            <strong>Özelleştirilebilir:</strong> Variant, boyut ve davranış
            seçenekleri
          </p>
        </div>
      </div>
    </div>
  );
};

export default FileInputExamples;
