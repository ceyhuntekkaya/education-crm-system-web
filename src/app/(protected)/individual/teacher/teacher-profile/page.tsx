"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePageTitle } from "@/hooks";
import { CustomCard, Badge, Button, CustomImage } from "@/components";
import { useTeacherProfileContext } from "./_shared/contexts";
import {
  getProfileStatusBadgeVariant,
  getProfileStatusDisplay,
  getEducationLevelDisplay,
  formatExperienceYears,
} from "./_shared/utils";

const TeacherProfilePage: React.FC = () => {
  usePageTitle("Profilim");
  const router = useRouter();

  // Context'ten kullanıcının profilini al
  const { myProfile, profileLoading, refetch } = useTeacherProfileContext();

  // Loading state
  if (profileLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-50">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Yükleniyor...</span>
        </div>
      </div>
    );
  }

  // Profil yoksa - Oluşturma ekranı
  if (!myProfile) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <CustomCard className="text-center p-5">
              <div className="mb-4">
                <i
                  className="ph ph-user-circle text-muted"
                  style={{ fontSize: "80px" }}
                ></i>
              </div>
              <h3 className="mb-3">Henüz Profiliniz Yok</h3>
              <p className="text-muted mb-4">
                Öğretmen profilinizi oluşturarak iş ilanlarına başvurabilir ve
                okullarla iletişime geçebilirsiniz.
              </p>
              <Button
                onClick={() =>
                  router.push(
                    "/individual/teacher/teacher-profile/add-edit/new",
                  )
                }
                variant="inline"
                leftIcon="ph ph-plus"
              >
                Profil Oluştur
              </Button>
            </CustomCard>
          </div>
        </div>
      </div>
    );
  }

  // Profil varsa - Detay göster
  return (
    <div className="container py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Profilim</h2>
          <p className="text-muted mb-0">
            Öğretmen profil bilgilerinizi görüntüleyin ve düzenleyin
          </p>
        </div>
        <Button
          onClick={() =>
            router.push(
              `/individual/teacher/teacher-profile/add-edit/${myProfile.id}`,
            )
          }
          variant="inline"
          leftIcon="ph ph-pencil-simple"
        >
          Profili Düzenle
        </Button>
      </div>

      {/* Profil Kartı */}
      <CustomCard className="mb-4">
        <div className="p-4">
          {/* Header - Profil Fotoğrafı ve Temel Bilgiler */}
          <div className="d-flex align-items-start gap-4 mb-4">
            <CustomImage
              src={myProfile.profilePhotoUrl}
              tempImage={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                myProfile.fullName || "Teacher",
              )}&background=random&color=fff&size=200`}
              alt={myProfile.fullName}
              width={120}
              height={120}
              variant="circle"
            />
            <div className="flex-grow-1">
              <div className="d-flex align-items-center gap-3 mb-2">
                <h3 className="mb-0">{myProfile.fullName}</h3>
                <Badge
                  variant={getProfileStatusBadgeVariant(myProfile.isActive)}
                  size="md"
                >
                  {getProfileStatusDisplay(myProfile.isActive)}
                </Badge>
              </div>

              {myProfile.branch && (
                <p className="text-muted mb-3">
                  <i className="ph ph-book-bookmark me-2"></i>
                  {myProfile.branch}
                </p>
              )}

              {/* İletişim Bilgileri */}
              <div className="d-flex flex-wrap gap-4">
                {myProfile.email && (
                  <div className="text-sm">
                    <i className="ph ph-envelope me-2 text-muted"></i>
                    <span>{myProfile.email}</span>
                  </div>
                )}
                {myProfile.phone && (
                  <div className="text-sm">
                    <i className="ph ph-phone me-2 text-muted"></i>
                    <span>{myProfile.phone}</span>
                  </div>
                )}
                {myProfile.city && (
                  <div className="text-sm">
                    <i className="ph ph-map-pin me-2 text-muted"></i>
                    <span>{myProfile.city}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Eğitim ve Tecrübe */}
          <div className="row g-3 mb-4">
            <div className="col-md-6">
              <div className="p-3 bg-light rounded">
                <div className="text-muted text-xs mb-1">Eğitim Seviyesi</div>
                <div className="fw-semibold">
                  {getEducationLevelDisplay(myProfile.educationLevel)}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="p-3 bg-light rounded">
                <div className="text-muted text-xs mb-1">Deneyim</div>
                <div className="fw-semibold">
                  {formatExperienceYears(myProfile.experienceYears)}
                </div>
              </div>
            </div>
          </div>

          {/* Biyografi */}
          {myProfile.bio && (
            <div className="mb-4">
              <h5 className="mb-2">Hakkımda</h5>
              <p className="text-muted mb-0">{myProfile.bio}</p>
            </div>
          )}

          {/* Video ve CV Linkleri */}
          <div className="d-flex gap-3 pt-3 border-top">
            {myProfile.videoUrl && (
              <Button
                onClick={() => window.open(myProfile.videoUrl, "_blank")}
                variant="outline"
                size="sm"
                leftIcon="ph ph-video"
              >
                Tanıtım Videosu
              </Button>
            )}
            {myProfile.cvUrl && (
              <Button
                onClick={() => window.open(myProfile.cvUrl, "_blank")}
                variant="outline"
                size="sm"
                leftIcon="ph ph-file-pdf"
              >
                CV İndir
              </Button>
            )}
          </div>
        </div>
      </CustomCard>

      {/* İller */}
      {myProfile.provinces && myProfile.provinces.length > 0 && (
        <CustomCard>
          <div className="p-4">
            <h5 className="mb-3">Çalışmak İstediğim İller</h5>
            <div className="d-flex flex-wrap gap-2">
              {myProfile.provinces.map((province) => (
                <Badge key={province.id} variant="info" size="sm">
                  <i className="ph ph-map-pin me-1"></i>
                  {province.name}
                </Badge>
              ))}
            </div>
          </div>
        </CustomCard>
      )}
    </div>
  );
};

export default TeacherProfilePage;
