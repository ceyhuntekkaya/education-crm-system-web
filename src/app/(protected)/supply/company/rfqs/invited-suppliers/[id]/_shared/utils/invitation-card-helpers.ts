import type { RFQInvitationDto } from "@/types";

// ================== CARD INFO HELPERS ==================

/**
 * RFQ Invitation kartı için özet bilgileri döndürür
 */
export function getInvitationCardSummary(invitation: RFQInvitationDto) {
  return {
    id: invitation.id,
    supplierCompanyName: invitation.supplierCompanyName || "Tedarikçi Adı Yok",
    rfqTitle: invitation.rfqTitle || "RFQ Başlığı Yok",
    supplierId: invitation.supplierId,
    invitedAt: invitation.invitedAt,
  };
}

/**
 * Davet tarihini formatlar
 */
export function formatInvitationDate(invitedAt?: string): string {
  if (!invitedAt) return "Tarih Yok";
  const date = new Date(invitedAt);
  const dateStr = date.toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const timeStr = date.toLocaleTimeString("tr-TR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${dateStr} ${timeStr}`;
}

/**
 * Tedarikçi rengi döndürür (sabit renk)
 */
export function getSupplierColor(supplierCompanyName?: string): string {
  if (!supplierCompanyName) return "#6B7280"; // neutral-500

  // Simple hash function to generate consistent colors
  const hash = supplierCompanyName.split("").reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);

  const colors = [
    "#3B82F6", // blue
    "#10B981", // green
    "#F59E0B", // amber
    "#EF4444", // red
    "#8B5CF6", // violet
    "#EC4899", // pink
    "#06B6D4", // cyan
  ];

  return colors[Math.abs(hash) % colors.length];
}
