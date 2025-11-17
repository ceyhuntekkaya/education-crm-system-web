import React from "react";
import { PostDto } from "@/types/dto/content";
import { CustomImage } from "@/components/ui";
import { getFileServeUrl } from "@/lib/api/constants";

interface PostDetailContentColumnProps {
  post: PostDto;
  variant?: "inPage" | "modal";
}

const PostDetailContentColumn: React.FC<PostDetailContentColumnProps> = ({
  post,
  variant = "modal",
}) => {
  if (!post) return null;

  // URL helper
  const getFullUrl = (url: string | undefined): string => {
    if (!url) return "";
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }
    return getFileServeUrl(url);
  };

  // Post type formatter
  const formatPostType = (type: string) => {
    const types: { [key: string]: string } = {
      TEXT: "Metin",
      IMAGE: "Görsel",
      VIDEO: "Video",
      GALLERY: "Galeri",
      LINK: "Bağlantı",
      EVENT: "Etkinlik",
      ANNOUNCEMENT: "Duyuru",
      NEWS: "Haber",
      ACHIEVEMENT: "Başarı",
      CELEBRATION: "Kutlama",
      POLL: "Anket",
      QUOTE: "Alıntı",
      TESTIMONIAL: "Referans",
      BEHIND_SCENES: "Kuliste",
      LIVE_STREAM: "Canlı Yayın",
    };
    return types[type] || type;
  };

  // Date formatter
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Post type icon
  const getPostTypeIcon = (type: string) => {
    const icons: { [key: string]: string } = {
      TEXT: "ph-text-aa",
      IMAGE: "ph-image",
      VIDEO: "ph-video",
      GALLERY: "ph-images",
      LINK: "ph-link",
      EVENT: "ph-calendar-check",
      ANNOUNCEMENT: "ph-megaphone",
      NEWS: "ph-newspaper",
      ACHIEVEMENT: "ph-trophy",
      CELEBRATION: "ph-confetti",
      POLL: "ph-chart-bar",
      QUOTE: "ph-quotes",
      TESTIMONIAL: "ph-chat-centered-text",
      BEHIND_SCENES: "ph-eye",
      LIVE_STREAM: "ph-broadcast",
    };
    return icons[type] || "ph-note";
  };

  const hasItems = post.items && post.items.length > 0;

  return (
    <div className="gallery-info-column p-24">
      {/* Post Header */}
      <div className="gallery-header">
        <div className="d-flex justify-content-between align-items-start mb-12">
          <div className="gallery-badge">
            <i className={`ph ${getPostTypeIcon(post.postType)}`}></i>
            <span>{formatPostType(post.postType)}</span>
          </div>
          {post.isFeatured && (
            <span className="badge bg-success-100 text-success-600 rounded-pill px-12 py-6">
              <i className="ph ph-star-fill me-4"></i>
              Öne Çıkarıldı
            </span>
          )}
        </div>
        <h2 className="gallery-title">{post.title}</h2>
      </div>

      {/* School Card */}
      {post.school && (
        <div className="institution-card">
          <div className="institution-avatar">
            {post.school.logoUrl ? (
              <CustomImage
                src={getFullUrl(post.school.logoUrl)}
                alt={post.school.name || "School logo"}
                width={40}
                height={40}
                className="rounded-circle"
              />
            ) : (
              <div
                className="bg-neutral-100 rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: 40, height: 40 }}
              >
                <i className="ph ph-building text-neutral-400"></i>
              </div>
            )}
          </div>
          <div className="institution-info">
            <h4>{post.school.name}</h4>
            <p>{post.school.institutionTypeName}</p>
          </div>
          <div className="verified-badge">
            <i className="ph ph-check-circle"></i>
          </div>
        </div>
      )}

      {/* Author Card */}
      {post.author && (
        <div className="institution-card">
          <div className="institution-avatar">
            {post.author.profileImageUrl ? (
              <CustomImage
                src={getFullUrl(post.author.profileImageUrl)}
                alt={post.author.fullName || "Author"}
                width={40}
                height={40}
                className="rounded-circle"
              />
            ) : (
              <div
                className="bg-neutral-100 rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: 40, height: 40 }}
              >
                <i className="ph ph-user text-neutral-400"></i>
              </div>
            )}
          </div>
          <div className="institution-info">
            <h4>{post.author.fullName}</h4>
            <p>Yazar</p>
          </div>
          <div className="verified-badge">
            <i className="ph ph-user-check"></i>
          </div>
        </div>
      )}

      {/* Post Stats */}
      <div className="gallery-stats-grid">
        <div className="stat-item">
          <i className="ph ph-eye"></i>
          <div>
            <span className="stat-value">{post.viewCount || 0}</span>
            <span className="stat-label">Görüntülenme</span>
          </div>
        </div>
        <div className="stat-item">
          <i className="ph ph-heart"></i>
          <div>
            <span className="stat-value">{post.likeCount || 0}</span>
            <span className="stat-label">Beğeni</span>
          </div>
        </div>
        {hasItems && (
          <div className="stat-item">
            <i className="ph ph-files"></i>
            <div>
              <span className="stat-value">{post.items?.length || 0}</span>
              <span className="stat-label">Medya</span>
            </div>
          </div>
        )}
        <div className="stat-item">
          <i className="ph ph-calendar"></i>
          <div>
            <span className="stat-value">{formatDate(post.publishedAt)}</span>
            <span className="stat-label">Tarih</span>
          </div>
        </div>
      </div>

      {/* Post Content */}
      {post.content && (
        <div className="gallery-description">
          <h4>
            <i className="ph ph-text-align-left me-12"></i>
            İçerik
          </h4>
          <p>{post.content}</p>
        </div>
      )}

      {/* Hashtags */}
      {post.hashtags && (
        <div className="gallery-description">
          <h4>
            <i className="ph ph-hash me-12"></i>
            Etiketler
          </h4>
          <div className="d-flex flex-wrap gap-8">
            {post.hashtags.split(",").map((tag, index) => (
              <span
                key={index}
                className="badge bg-primary-100 text-primary-600 rounded-pill px-12 py-6"
              >
                #{tag.trim()}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Call to Action */}
      {post.callToAction && post.ctaUrl && (
        <div className="gallery-description">
          <h4>
            <i className="ph ph-cursor-click me-12"></i>
            Harekete Geçirici Mesaj
          </h4>
          <a
            href={post.ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-main rounded-pill flex-align gap-8 w-100"
          >
            <span>{post.callToAction}</span>
            <i className="ph ph-arrow-right"></i>
          </a>
        </div>
      )}
    </div>
  );
};

export default PostDetailContentColumn;
