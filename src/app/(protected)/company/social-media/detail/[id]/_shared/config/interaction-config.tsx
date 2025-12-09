import React from "react";
import type { BasicInfoItemConfig } from "../types";
import { formatBoolean } from "../utils";
import { PostDto } from "@/types";

/**
 * Post etkileşim ayarları konfigürasyonu
 */
export const interactionConfig: BasicInfoItemConfig[] = [
  {
    label: "Yorum Ayarları",
    value: (post) => (
      <div className="d-flex align-items-center gap-3">
        <div
          className={`badge ${
            post?.allowComments
              ? "bg-success-subtle text-success"
              : "bg-danger-subtle text-danger"
          } fw-semibold`}
        >
          <i
            className={`ph ${
              post?.allowComments ? "ph-chat-circle" : "ph-chat-circle-slash"
            } me-4`}
          ></i>
          {formatBoolean(post?.allowComments)}
        </div>
        <small className={post?.allowComments ? "text-success" : "text-danger"}>
          <i
            className={`ph ${post?.allowComments ? "ph-check" : "ph-x"} me-1`}
          ></i>
          {post?.allowComments
            ? "Kullanıcılar yorum yapabilir"
            : "Yorum yapma kapalı"}
        </small>
      </div>
    ),
    isShowing: (post) => post?.allowComments !== undefined,
  },
  {
    label: "Beğeni Ayarları",
    value: (post) => (
      <div className="d-flex align-items-center gap-3">
        <div
          className={`badge ${
            post?.allowLikes
              ? "bg-success-subtle text-success"
              : "bg-danger-subtle text-danger"
          } fw-semibold`}
        >
          <i
            className={`ph ${
              post?.allowLikes ? "ph-heart" : "ph-heart-slash"
            } me-4`}
          ></i>
          {formatBoolean(post?.allowLikes)}
        </div>
        <small className={post?.allowLikes ? "text-success" : "text-danger"}>
          <i
            className={`ph ${post?.allowLikes ? "ph-check" : "ph-x"} me-1`}
          ></i>
          {post?.allowLikes ? "Kullanıcılar beğenebilir" : "Beğenme kapalı"}
        </small>
      </div>
    ),
    isShowing: (post) => post?.allowLikes !== undefined,
  },
];
