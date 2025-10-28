import { useMemo } from "react";
import { useInstitutionDetail } from "../../../contexts";
import { formatViewCount } from "../../../utils";
import { SocialMediaLink, QuickInfoStat } from "../types";

export const useInstitutionSidebarData = () => {
  const { school, campus, renderStars } = useInstitutionDetail();

  const socialMediaLinks: SocialMediaLink[] = useMemo(
    () => [
      {
        url: campus?.facebookUrl,
        icon: "ph-facebook-logo",
        platform: "Facebook",
      },
      {
        url: campus?.twitterUrl,
        icon: "ph-twitter-logo",
        platform: "Twitter",
      },
      {
        url: campus?.instagramUrl,
        icon: "ph-instagram-logo",
        platform: "Instagram",
      },
      {
        url: campus?.linkedinUrl,
        icon: "ph-linkedin-logo",
        platform: "LinkedIn",
      },
    ],
    [
      campus?.facebookUrl,
      campus?.twitterUrl,
      campus?.instagramUrl,
      campus?.linkedinUrl,
    ]
  );

  const quickInfoStats: QuickInfoStat[] = useMemo(
    () => [
      {
        value: school?.currentStudentCount,
        label: "Öğrenci",
        colorClass: "text-main-600",
      },
      {
        value: school?.classSizeAverage,
        label: "Sınıf Ort.",
        colorClass: "text-success-600",
      },
      {
        value: `${school?.capacity || 0}`,
        label: "Kapasite",
        colorClass: "text-info-600",
      },
      {
        value: formatViewCount(school?.viewCount || 0),
        label: "Görüntülenme",
        colorClass: "text-warning-600",
      },
      {
        value: school?.likeCount,
        label: "Beğeni",
        colorClass: "text-danger-600",
      },
      {
        value: school?.postCount,
        label: "Gönderi",
        colorClass: "text-purple-600",
      },
    ],
    [
      school?.currentStudentCount,
      school?.classSizeAverage,
      school?.capacity,
      school?.viewCount,
      school?.likeCount,
      school?.postCount,
    ]
  );

  return {
    school,
    campus,
    renderStars,
    socialMediaLinks,
    quickInfoStats,
  };
};
