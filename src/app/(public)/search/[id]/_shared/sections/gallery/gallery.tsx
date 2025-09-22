"use client";

import React from "react";
import Image from "next/image";
import { gallerySummaryMockData } from "./mock";

interface GalleryProps {
  institutionId: string;
}

const Gallery: React.FC<GalleryProps> = () => {
  // Institution ID'ye göre filtreleme yapabiliriz (şimdilik tüm data'yı gösteriyoruz)
  const galleryData = gallerySummaryMockData; // Tüm galerileri göster

  const getGalleryTypeIcon = (galleryType?: string) => {
    const iconMap: Record<string, string> = {
      EVENTS: "ph-calendar-check",
      CAMPUS_LIFE: "ph-buildings",
      LABORATORY: "ph-flask",
      SPORTS_FACILITIES: "ph-basketball",
      LIBRARY: "ph-book-open",
      GRADUATION: "ph-graduation-cap",
      CLASSROOMS: "ph-chalkboard-teacher",
      CAFETERIA: "ph-coffee",
      STUDENT_WORK: "ph-palette",
      STAFF: "ph-users",
      SCHOOL_TOUR: "ph-camera",
      ACHIEVEMENTS: "ph-trophy",
      OUTDOOR_AREAS: "ph-tree",
      DAILY_ACTIVITIES: "ph-clock",
      TRANSPORTATION: "ph-bus",
      MIXED: "ph-images",
      PHOTOS: "ph-image",
      VIDEOS: "ph-play-circle",
      FACILITIES: "ph-house",
      CEREMONIES: "ph-star",
    };
    return iconMap[galleryType || "MIXED"] || "ph-images";
  };

  const formatViewCount = (count?: number) => {
    if (!count) return "0";
    if (count < 1000) return count.toString();
    if (count < 1000000) return `${(count / 1000).toFixed(1)}K`;
    return `${(count / 1000000).toFixed(1)}M`;
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatGalleryType = (galleryType?: string) => {
    if (!galleryType) return "";

    const typeMap: Record<string, string> = {
      EVENTS: "Etkinlikler",
      CAMPUS_LIFE: "Kampüs Yaşamı",
      LABORATORY: "Laboratuvarlar",
      SPORTS_FACILITIES: "Spor Tesisleri",
      LIBRARY: "Kütüphane",
      GRADUATION: "Mezuniyet",
      CLASSROOMS: "Sınıflar",
      CAFETERIA: "Kafeterya",
      STUDENT_WORK: "Öğrenci Çalışmaları",
      STAFF: "Personel",
      SCHOOL_TOUR: "Okul Turu",
      ACHIEVEMENTS: "Başarılar",
      OUTDOOR_AREAS: "Açık Alanlar",
      DAILY_ACTIVITIES: "Günlük Aktiviteler",
      TRANSPORTATION: "Ulaşım",
      MIXED: "Karma",
      PHOTOS: "Fotoğraflar",
      VIDEOS: "Videolar",
      FACILITIES: "Tesisler",
      CEREMONIES: "Törenler",
    };

    return (
      typeMap[galleryType] ||
      galleryType
        .replace("_", " ")
        .toLowerCase()
        .replace(/\b\w/g, (l) => l.toUpperCase())
    );
  };

  return (
    <div className="gallery-section">
      {/* Main Gallery Container with consistent styling */}
      <div className="border border-neutral-30 rounded-12 bg-white p-8">
        <div className="border border-neutral-30 rounded-12 bg-main-25 p-32">
          {/* Header Section */}
          <div className="d-flex align-items-center justify-content-between mb-20">
            <h4 className="mb-0">Galeri</h4>
            <div className="d-flex align-items-center gap-8 text-neutral-600">
              <i className="ph ph-images text-main-600"></i>
              <span className="text-sm fw-medium">
                {galleryData.length} Galeri
              </span>
            </div>
          </div>

          <span className="d-block border border-neutral-30 mb-24 border-dashed" />

          {/* Gallery Grid */}
          <div className="gallery-container__grid">
            {galleryData.map((gallery) => (
              <div
                key={gallery.id}
                className={`gallery-card bg-white rounded-16 h-100 box-shadow-md cursor-pointer ${
                  gallery.isFeatured ? "gallery-card--featured" : ""
                }`}
              >
                {/* Gallery Image */}
                <div className="gallery-card__image">
                  {gallery.coverImageUrl ? (
                    <div className="position-relative w-100 h-100">
                      <Image
                        src={gallery.coverImageUrl}
                        alt={gallery.title || ""}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        onError={(e) => {
                          // Görsel yüklenemezse placeholder göster
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                  ) : (
                    <div className="w-100 h-100 bg-main-600 d-flex align-items-center justify-content-center position-relative">
                      <div className="text-center text-white z-2">
                        <i
                          className={`${getGalleryTypeIcon(
                            gallery.galleryType
                          )} mb-8`}
                          style={{ fontSize: "32px" }}
                        ></i>
                        <p className="fw-medium mb-0 text-sm">Görsel Yok</p>
                      </div>
                      <div className="position-absolute inset-0 bg-gradient-to-br from-main-600 to-main-800 opacity-90"></div>
                    </div>
                  )}

                  {/* Gallery Type Badge */}
                  <div className="gallery-card__type-badge">
                    <i className={getGalleryTypeIcon(gallery.galleryType)}></i>
                    <span>{formatGalleryType(gallery.galleryType)}</span>
                  </div>

                  {/* Featured Badge */}
                  {gallery.isFeatured && (
                    <div className="gallery-card__featured-badge">
                      <i className="ph ph-star-fill"></i>
                      <span>Öne Çıkan</span>
                    </div>
                  )}

                  {/* Stats Overlay */}
                  <div className="gallery-card__image-overlay">
                    <div className="gallery-card__stats">
                      <div className="gallery-card__stats-item">
                        <i className="ph ph-images"></i>
                        <span>{gallery.itemCount || 0}</span>
                      </div>
                      <div className="gallery-card__stats-item">
                        <i className="ph ph-eye"></i>
                        <span>{formatViewCount(gallery.viewCount)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Gallery Content */}
                <div className="gallery-card__content">
                  <h5 className="gallery-card__title">{gallery.title}</h5>
                  <p className="gallery-card__institution">
                    {gallery.institutionName}
                  </p>

                  {/* Footer */}
                  <div className="gallery-card__footer">
                    <span className="gallery-card__footer-date">
                      {formatDate(gallery.createdAt)}
                    </span>
                    <i className="ph ph-arrow-right gallery-card__footer-arrow"></i>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {galleryData.length === 0 && (
            <div className="text-center py-80">
              <i
                className="ph ph-images text-neutral-300"
                style={{ fontSize: "64px" }}
              ></i>
              <h4 className="text-neutral-600 mt-16 mb-8">
                Henüz galeri bulunmuyor
              </h4>
              <p className="text-neutral-500">
                Bu kurum için henüz galeri eklenmemiş.
              </p>
            </div>
          )}

          {/* Footer Action */}
          {galleryData.length > 0 && (
            <div className="text-center mt-32 pt-24 border-top border-neutral-100">
              <button className="btn btn-outline-main btn-sm">
                <i className="ph ph-plus me-8"></i>
                Tümünü Gör ({galleryData.length})
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
