"use client";

import React from "react";
import { Icon } from "@/components/ui/icon";
import { Popover } from "@/components/ui/popover";
import { CampaignDto } from "@/types/dto/campaign/CampaignDto";
import { CampaignStatus } from "@/enums/CampaignStatus";
import { CampaignActionButtonsProps } from "../types";

export const CampaignActionButtons: React.FC<CampaignActionButtonsProps> = ({
  campaign,
  onViewDetails,
  onEdit,
  onToggleStatus,
  onDelete,
  onDuplicate,
}) => {
  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    onViewDetails?.(campaign);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.(campaign);
  };

  const handleToggleStatus = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleStatus?.(campaign);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.(campaign);
  };

  const handleDuplicate = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDuplicate?.(campaign);
  };

  const isActive = campaign.status === CampaignStatus.ACTIVE;
  const canToggle =
    campaign.status === CampaignStatus.ACTIVE ||
    campaign.status === CampaignStatus.PAUSED;
  const canDelete =
    campaign.status === CampaignStatus.DRAFT ||
    campaign.status === CampaignStatus.EXPIRED;

  return (
    <div className="w-50 d-flex align-items-center justify-content-center">
      <Popover
        content={
          <div className="dropdown-menu-container">
            <div className="dropdown-menu-item" onClick={handleViewDetails}>
              <Icon icon="ph-eye" size="sm" className="text-primary" />
              <span className="text-sm">Detayları Görüntüle</span>
            </div>
          </div>
        }
        trigger="click"
        placement="bottom-end"
      >
        <div className="action-button-wrapper">
          <Icon icon="ph-dots-three-vertical" size="sm" />
        </div>
      </Popover>
    </div>
  );
};

export default CampaignActionButtons;
