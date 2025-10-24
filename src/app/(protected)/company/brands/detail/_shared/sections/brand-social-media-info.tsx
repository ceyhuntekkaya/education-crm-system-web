import { useBrandDetail } from "../context/brand-detail-context";
import { CustomCard } from "@/components/ui";

export default function BrandSocialMediaInfo() {
  const { currentBrand } = useBrandDetail();

  if (!currentBrand) {
    return null;
  }

  const brand = currentBrand;

  const socialMediaLinks = [
    {
      platform: "Facebook",
      url: brand.facebookUrl,
      icon: "ph-facebook-logo",
      color: "#1877F2",
    },
    {
      platform: "Twitter",
      url: brand.twitterUrl,
      icon: "ph-twitter-logo",
      color: "#1DA1F2",
    },
    {
      platform: "Instagram",
      url: brand.instagramUrl,
      icon: "ph-instagram-logo",
      color: "#E4405F",
    },
    {
      platform: "LinkedIn",
      url: brand.linkedinUrl,
      icon: "ph-linkedin-logo",
      color: "#0A66C2",
    },
    {
      platform: "YouTube",
      url: brand.youtubeUrl,
      icon: "ph-youtube-logo",
      color: "#FF0000",
    },
  ];

  const availableSocialMedia = socialMediaLinks.filter((link) => link.url);

  if (availableSocialMedia.length === 0) {
    return (
      <CustomCard title="Sosyal Medya">
        <div className="text-center py-24">
          <i
            className="ph ph-share-network text-neutral-400"
            style={{ fontSize: "48px" }}
          />
          <p className="text-neutral-500 mb-0 mt-12">
            Sosyal medya hesapları mevcut değil
          </p>
        </div>
      </CustomCard>
    );
  }

  return (
    <CustomCard title="Sosyal Medya">
      <div className="row g-3">
        {availableSocialMedia.map((social, index) => (
          <div key={index} className="col-12">
            <a
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="d-flex align-items-center gap-12 p-12 rounded-8 bg-white border border-neutral-100 hover-bg-main-50 hover-border-main-200 text-decoration-none transition-all"
            >
              <div
                className="d-flex align-items-center justify-content-center rounded-circle"
                style={{
                  width: "32px",
                  height: "32px",
                  backgroundColor: `${social.color}15`,
                  color: social.color,
                }}
              >
                <i className={social.icon} style={{ fontSize: "16px" }} />
              </div>
              <div className="flex-grow-1">
                <span className="fw-medium text-neutral-800">
                  {social.platform}
                </span>
                <p className="text-sm text-neutral-600 mb-0">
                  {social.url?.replace(/^https?:\/\/(www\.)?/, "") || ""}
                </p>
              </div>
              <i className="ph ph-arrow-square-out text-neutral-500" />
            </a>
          </div>
        ))}
      </div>
    </CustomCard>
  );
}
