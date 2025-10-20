"use client";

import React, { useState } from "react";
import { FileInput } from "@/components/file-input";

export default function FileInputExample() {
  // Çoklu yükleme
  const [imageFiles, setImageFiles] = useState<File[] | File | null>(null);
  const [videoFiles, setVideoFiles] = useState<File[] | File | null>(null);
  const [documentFiles, setDocumentFiles] = useState<File[] | File | null>(
    null
  );

  // Tüm dosya türleri için (mixed content)
  const [allFiles, setAllFiles] = useState<File[] | File | null>(null);

  // Tekli yükleme
  const [singleImage, setSingleImage] = useState<File[] | File | null>(null);
  const [singleVideo, setSingleVideo] = useState<File[] | File | null>(null);
  const [singleDocument, setSingleDocument] = useState<File[] | File | null>(
    null
  );

  const [error, setError] = useState<string>("");
  const [isUploading, setIsUploading] = useState<string | null>(null);

  const handleSubmit = async () => {
    console.log("Image Files (Multiple):", imageFiles);
    console.log("Video Files (Multiple):", videoFiles);
    console.log("Document Files (Multiple):", documentFiles);
    console.log("All Files (Mixed Content):", allFiles);
    console.log("Single Image:", singleImage);
    console.log("Single Video:", singleVideo);
    console.log("Single Document:", singleDocument);

    // Simüle edilmiş yükleme işlemi
    setIsUploading("upload");
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000)); // 3 saniye bekle
      console.log("Dosyalar başarıyla yüklendi!");
    } catch (error) {
      console.error("Yükleme hatası:", error);
    } finally {
      setIsUploading(null);
    }
  };

  // Upload handlers
  const handleImageUpload = async (files: File[]) => {
    console.log("Resimler yükleniyor:", files);
    // Simüle edilmiş API çağrısı
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log("Resimler başarıyla yüklendi!");
  };

  const handleVideoUpload = async (files: File[]) => {
    console.log("Videolar yükleniyor:", files);
    await new Promise(resolve => setTimeout(resolve, 3000));
    console.log("Videolar başarıyla yüklendi!");
  };

  const handleDocumentUpload = async (files: File[]) => {
    console.log("Dökümanlar yükleniyor:", files);
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Dökümanlar başarıyla yüklendi!");
  };

  const handleUploadProgress = (progress: number) => {
    console.log(`Upload progress: ${progress}%`);
  };

  const handleUploadComplete = (uploadedFiles: File[]) => {
    console.log("Upload tamamlandı:", uploadedFiles);
  };

  // Loading durumu değişikliğini handle et
  const handleLoadingChange = (loading: boolean, type: string) => {
    if (loading) {
      setIsUploading(type);
    } else {
      setIsUploading(null);
    }
  };

  return (
    <div className="container py-5 mt-32">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="bg-white rounded-12 p-4 shadow-sm">
            <h2 className="h4 mb-4">File Input Component</h2>

            <div className="row g-4">
              {/* Resim Yükleme */}
              <div className="col-12">
                <FileInput
                  value={imageFiles}
                  onChange={setImageFiles}
                  onError={setError}
                  onLoadingChange={(loading) =>
                    handleLoadingChange(loading, "images")
                  }
                  onUpload={handleImageUpload}
                  onUploadProgress={handleUploadProgress}
                  onUploadComplete={handleUploadComplete}
                  label="Resim Yükle (Upload Button İle)"
                  type="img"
                  multiple={true}
                  maxFiles={3}
                  maxSize={5}
                  variant="inline"
                  placeholder="Resimlerinizi buraya yükleyin"
                  showUploadButton={true}
                  uploadButtonText="Resimleri Yükle"
                  error={error}
                />
              </div>

              {/* Video Yükleme (Çoklu) */}
              <div className="col-12">
                <FileInput
                  value={videoFiles}
                  onChange={setVideoFiles}
                  onLoadingChange={(loading) =>
                    handleLoadingChange(loading, "videos")
                  }
                  onUpload={handleVideoUpload}
                  onUploadProgress={handleUploadProgress}
                  onUploadComplete={handleUploadComplete}
                  label="Video Yükle (Çoklu - Upload Button İle)"
                  type="video"
                  multiple={true}
                  maxFiles={3}
                  maxSize={50}
                  variant="outline"
                  placeholder="Video dosyalarınızı seçin"
                  showUploadButton={true}
                  uploadButtonText="Videoları Yükle"
                />
              </div>

              {/* Doküman Yükleme */}
              <div className="col-12">
                <FileInput
                  value={documentFiles}
                  onChange={setDocumentFiles}
                  onLoadingChange={(loading) =>
                    handleLoadingChange(loading, "documents")
                  }
                  onUpload={handleDocumentUpload}
                  onUploadProgress={handleUploadProgress}
                  onUploadComplete={handleUploadComplete}
                  label="Doküman Yükle (PDF, DOC, TXT - Upload Button İle)"
                  type="file"
                  multiple={true}
                  maxFiles={5}
                  maxSize={10}
                  required={true}
                  placeholder="PDF, DOC, TXT dosyalarını yükleyin"
                  showUploadButton={true}
                  uploadButtonText="Dökümanları Yükle"
                />
              </div>

              {/* Tüm Dosya Türleri - Gruplama ile */}
              <div className="col-12">
                <FileInput
                  value={allFiles}
                  onChange={setAllFiles}
                  onLoadingChange={(loading) =>
                    handleLoadingChange(loading, "all")
                  }
                  label="Tüm Dosya Türleri (Karışık İçerik - Gruplandırmalı)"
                  type="all"
                  multiple={true}
                  maxFiles={15}
                  maxSize={25}
                  variant="outline"
                  placeholder="Resim, video, doküman - her türlü dosyayı yükleyin. Çoklu dosya seçimi yapabilirsiniz."
                  error={error}
                />
                <div className="mt-12">
                  <small className="text-neutral-600 fst-italic">
                    💡 Bu örnekte farklı dosya türlerini aynı anda
                    yüklediğinizde otomatik olarak gruplandırılacak ve hizalı
                    şekilde gösterilecektir.
                  </small>
                </div>
              </div>

              {/* Ayırıcı */}
              <div className="col-12">
                <hr className="my-4" />
                <h3 className="h5 mb-3 text-neutral-700">
                  Tekli Yükleme Örnekleri
                </h3>
              </div>

              {/* Tekli Resim Yükleme */}
              <div className="col-md-6">
                <FileInput
                  value={singleImage}
                  onChange={setSingleImage}
                  label="Tek Resim Yükle"
                  type="img"
                  multiple={false}
                  maxSize={5}
                  variant="outline"
                  placeholder="Bir resim seçin"
                />
              </div>

              {/* Tekli Video Yükleme */}
              <div className="col-md-6">
                <FileInput
                  value={singleVideo}
                  onChange={setSingleVideo}
                  label="Tek Video Yükle"
                  type="video"
                  multiple={false}
                  maxSize={100}
                  variant="inline"
                  placeholder="Bir video seçin"
                />
              </div>

              {/* Tekli Doküman Yükleme */}
              <div className="col-12">
                <FileInput
                  value={singleDocument}
                  onChange={setSingleDocument}
                  label="Tek Doküman Yükle (PDF, DOC, TXT)"
                  type="file"
                  multiple={false}
                  maxSize={20}
                  variant="outline"
                  placeholder="Bir doküman seçin"
                  required={false}
                />
              </div>

              {/* Durum Gösterimi */}
              <div className="col-12">
                <div className="bg-neutral-50 p-3 rounded-8">
                  <h6 className="mb-3">Yüklenen Dosyalar:</h6>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="small text-neutral-600">
                        <div className="fw-medium mb-2">Çoklu Yükleme:</div>
                        <div>
                          Resimler:{" "}
                          {Array.isArray(imageFiles)
                            ? imageFiles.length
                            : imageFiles
                            ? 1
                            : 0}{" "}
                          dosya
                        </div>
                        <div>
                          Videolar:{" "}
                          {Array.isArray(videoFiles)
                            ? videoFiles.length
                            : videoFiles
                            ? 1
                            : 0}{" "}
                          dosya
                        </div>
                        <div>
                          Dokümanlar:{" "}
                          {Array.isArray(documentFiles)
                            ? documentFiles.length
                            : documentFiles
                            ? 1
                            : 0}{" "}
                          dosya
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="small text-neutral-600">
                        <div className="fw-medium mb-2">Tekli Yükleme:</div>
                        <div>Tek Resim: {singleImage ? 1 : 0} dosya</div>
                        <div>Tek Video: {singleVideo ? 1 : 0} dosya</div>
                        <div>Tek Doküman: {singleDocument ? 1 : 0} dosya</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Loading Durumu */}
              {isUploading && (
                <div className="col-12">
                  <div className="alert alert-info">
                    <strong>
                      {isUploading === "upload"
                        ? "Dosyalar sunucuya yükleniyor..."
                        : `${isUploading} işleniyor...`}
                    </strong>
                  </div>
                </div>
              )}

              {/* Submit Butonu */}
              <div className="col-12">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!!isUploading}
                  className="btn btn-main-600 text-white px-4 py-2 rounded-8"
                >
                  {isUploading === "upload"
                    ? "Yükleniyor..."
                    : "Dosyaları Gönder"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
