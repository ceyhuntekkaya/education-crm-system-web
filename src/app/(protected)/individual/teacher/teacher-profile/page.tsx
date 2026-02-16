"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { usePageTitle } from "@/hooks";
import { CustomCard, Button } from "@/components";
import { DetailLayout } from "@/components/layouts";
import { useTeacherProfileContext } from "./_shared/contexts";
import { createTeacherProfileDetailColumns } from "./_shared";

/**
 * Modern Teacher Profile detay sayfası - DetailLayout kullanarak
 * Öğretmen profil bilgilerini görüntüler
 */
const TeacherProfilePage: React.FC = () => {
  usePageTitle("Profilim");
  const router = useRouter();

  // Context'ten kullanıcının profilini al
  const { myProfile, profileLoading } = useTeacherProfileContext();

  // Profil yoksa - Oluşturma ekranı (DetailLayout kullanmadan)
  if (!profileLoading && !myProfile) {
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

  // Profil varsa - DetailLayout ile göster
  return (
    <DetailLayout
      containerClass="teacher-profile-detail-page"
      spacing="lg"
      header={{
        backButton: {
          label: "Geri Dön",
          href: "/individual/teacher",
        },
        actionButtons: [
          {
            id: "edit",
            label: "Profili Düzenle",
            icon: "ph ph-pencil-simple",
            variant: "primary",
            disabled: !myProfile,
            onClick: () => {
              if (myProfile) {
                router.push(
                  `/individual/teacher/teacher-profile/add-edit/${myProfile.id}`,
                );
              }
            },
          },
        ],
      }}
      loading={{
        isLoading: profileLoading,
      }}
      error={{
        error: null, // Error handling can be added if needed
      }}
      empty={{
        isEmpty: false, // Empty state is handled above
      }}
      columns={
        myProfile
          ? {
              data: myProfile,
              columns: createTeacherProfileDetailColumns(),
            }
          : undefined
      }
    />
  );
};

export default TeacherProfilePage;
