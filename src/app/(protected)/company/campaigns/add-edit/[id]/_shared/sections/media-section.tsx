"use client";

import React from "react";
import { FormInput, FormTextarea } from "@/components/forms";

interface MediaSectionProps {}

const MediaSection: React.FC<MediaSectionProps> = () => {
  return (
    <div className="bg-white rounded-8 p-24 mb-24">
      <h4 className="mb-16">Medya ve Görsel İçerik</h4>

      <div className="d-flex flex-column gap-3">
        <FormInput
          name="bannerImageUrl"
          type="url"
          label="Banner Resmi URL"
          placeholder="https://example.com/banner.jpg"
          variant="inline"
        />

        <FormInput
          name="thumbnailImageUrl"
          type="url"
          label="Küçük Resim URL"
          placeholder="https://example.com/thumbnail.jpg"
          variant="inline"
        />

        <FormInput
          name="videoUrl"
          type="url"
          label="Video URL"
          placeholder="https://youtube.com/watch?v=..."
          variant="inline"
        />

        <FormInput
          name="ctaUrl"
          type="url"
          label="CTA Link URL"
          placeholder="https://example.com/register"
          variant="inline"
        />

        <FormInput
          name="ctaText"
          type="text"
          label="CTA Buton Metni"
          placeholder="Hemen Kayıt Ol"
          variant="inline"
        />

        <FormInput
          name="badgeText"
          type="text"
          label="Rozet Metni"
          placeholder="YENİ, POPÜLER, vb."
          variant="inline"
        />

        <FormInput
          name="badgeColor"
          type="color"
          label="Rozet Rengi"
          variant="inline"
        />
      </div>
    </div>
  );
};

export default MediaSection;
