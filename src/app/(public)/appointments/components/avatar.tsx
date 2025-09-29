"use client";

import React from "react";
import Image from "next/image";

export interface AvatarProps {
  src?: string;
  alt?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = "",
  className = "",
  size = "sm",
}) => {
  const sizeClasses = {
    sm: "w-32 h-32",
    md: "w-40 h-40",
    lg: "w-48 h-48",
  };

  // Check if src is a valid URL (starts with http:// or https:// or /)
  const isValidImageUrl =
    src &&
    (src.startsWith("http://") ||
      src.startsWith("https://") ||
      src.startsWith("/"));

  return (
    <div
      className={`rounded-circle bg-light flex-center ${sizeClasses[size]} ${className}`}
    >
      {isValidImageUrl ? (
        <Image
          src={src}
          alt={alt}
          width={32}
          height={32}
          className="rounded-circle w-100 h-100 object-fit-cover"
        />
      ) : (
        <i className="ph ph-user text-muted"></i>
      )}
    </div>
  );
};

export default Avatar;
