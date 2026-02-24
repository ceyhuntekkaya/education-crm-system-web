"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { usePageTitle, useModal } from "@/hooks";
import { DetailLayout } from "@/components/layouts";
import { useTeacherProfileContext } from "./_shared/contexts";
import { createTeacherProfileDetailColumns } from "./_shared";
import { useSnackbar } from "@/contexts";
import { DeleteProfileModal, EmptyProfileState } from "./_shared/sections";

/**
 * Modern Teacher Profile detay sayfası - DetailLayout kullanarak
 * Öğretmen profil bilgilerini görüntüler
 */
const TeacherProfilePage: React.FC = () => {
  usePageTitle("Profilim");
  const router = useRouter();
  const { showSnackbar } = useSnackbar();
  const { isOpen, open: openDeleteModal, close: closeDeleteModal } = useModal();

  // Context'ten kullanıcının profilini al
  const { myProfile, profileLoading, deleteProfile, isDeleting } =
    useTeacherProfileContext();

  // Silme işlemi
  const handleDelete = async () => {
    const success = await deleteProfile();
    if (success) {
      showSnackbar("Profil başarıyla silindi", "success");
      closeDeleteModal();
      router.push("/individual/teacher");
      router.refresh();
    } else {
      showSnackbar("Profil silinirken bir hata oluştu", "error");
    }
  };

  // Profil yoksa - Oluşturma ekranı (DetailLayout kullanmadan)
  if (!profileLoading && !myProfile) {
    return (
      <EmptyProfileState
        onCreateProfile={() =>
          router.push("/individual/teacher/teacher-profile/add-edit/new")
        }
      />
    );
  }

  // Profil varsa - DetailLayout ile göster
  return (
    <>
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
            {
              id: "delete",
              label: "Profili Sil",
              icon: "ph ph-trash",
              variant: "danger",
              disabled: !myProfile || isDeleting,
              onClick: openDeleteModal,
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

      {/* Delete Confirmation Modal */}
      <DeleteProfileModal
        isOpen={isOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default TeacherProfilePage;
