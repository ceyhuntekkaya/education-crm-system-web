import { useMemo } from "react";
import { useInstitutionDetail } from "../../../contexts";
import { formatViewCount } from "../../../utils";
import { SocialMediaLink, QuickInfoStat } from "../types";

/**
 * URL'ye protokol ekler (eğer yoksa)
 */
const ensureProtocol = (url: string | undefined): string | undefined => {
  if (!url) return url;
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  return `https://${url}`;
};

export const useInstitutionSidebarData = () => {
  const { school, campus, renderStars } = useInstitutionDetail();

  const socialMediaLinks: SocialMediaLink[] = useMemo(() => {
    const links = [
      {
        url: ensureProtocol(school?.facebookUrl),
        icon: "ph-facebook-logo",
        platform: "Facebook",
      },
      {
        url: ensureProtocol(school?.twitterUrl),
        icon: "ph-twitter-logo",
        platform: "Twitter",
      },
      {
        url: ensureProtocol(school?.instagramUrl),
        icon: "ph-instagram-logo",
        platform: "Instagram",
      },
      {
        url: ensureProtocol(school?.linkedinUrl),
        icon: "ph-linkedin-logo",
        platform: "LinkedIn",
      },
      {
        url: ensureProtocol(school?.youtubeUrl),
        icon: "ph-youtube-logo",
        platform: "Youtube",
      },
    ];
    // Sadece URL'si olan linkleri döndür
    return links.filter((link) => link.url) as SocialMediaLink[];
  }, [
    school?.facebookUrl,
    school?.twitterUrl,
    school?.instagramUrl,
    school?.linkedinUrl,
    school?.youtubeUrl,
  ]);

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
