"use client";

import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Modal } from "@/components/ui";
import { Area, Point } from "react-easy-crop";

interface ImageCropModalProps {
  isOpen: boolean;
  imageSrc: string;
  fileName: string;
  cropWidth?: number;
  cropHeight?: number;
  aspectRatio?: number;
  isUploading?: boolean;
  onClose: () => void;
  onSave: (croppedFile: File) => Promise<void>;
}

/**
 * Crop alanini piksel koordinatlarina cevirir ve canvas ile kirpar
 */
const createCroppedImage = async (
  imageSrc: string,
  pixelCrop: Area,
  fileName: string
): Promise<File> => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Canvas context alinamadi");
  }

  // Canvas boyutunu crop alanına göre ayarla
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // Resmi crop alanına göre çiz
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  // Canvas'i blob'a cevir
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error("Canvas to Blob donusumu basarisiz"));
        return;
      }
      // Blob'u File'a cevir
      const file = new File([blob], fileName, { type: "image/jpeg" });
      resolve(file);
    }, "image/jpeg");
  });
};

/**
 * Image element olusturur
 */
const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });

export const ImageCropModal: React.FC<ImageCropModalProps> = ({
  isOpen,
  imageSrc,
  fileName,
  cropWidth,
  cropHeight,
  aspectRatio,
  isUploading = false,
  onClose,
  onSave,
}) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // External loading state (API upload)
  const isProcessing = isSaving || isUploading;

  // Aspect ratio hesaplama
  const calculatedAspectRatio =
    aspectRatio || (cropWidth && cropHeight ? cropWidth / cropHeight : 1);

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const handleSave = async () => {
    if (!croppedAreaPixels) return;

    try {
      setIsSaving(true);
      const croppedImage = await createCroppedImage(
        imageSrc,
        croppedAreaPixels,
        fileName
      );
      // onSave API'ye istek attirir ve modal'i kapatir
      await onSave(croppedImage);
    } catch (error) {
      console.error("Crop islemi basarisiz:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <style jsx>{`
        .crop-modal-header {
          padding: 1.5rem;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .crop-modal-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: #1f2937;
          margin: 0;
        }

        .crop-modal-subtitle {
          font-size: 0.875rem;
          color: #6b7280;
          margin-top: 0.25rem;
        }

        .close-button {
          background: none;
          border: none;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          color: #6b7280;
        }

        .close-button:hover {
          background: #f3f4f6;
          color: #1f2937;
        }

        .close-button i {
          font-size: 20px;
        }

        .crop-container-wrapper {
          position: relative;
          width: 100%;
          height: 500px;
          background: #000;
        }

        .crop-controls {
          padding: 1.5rem;
          background: #f9fafb;
          border-top: 1px solid #e5e7eb;
        }

        .zoom-control {
          margin-bottom: 1.5rem;
        }

        .zoom-label {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.5rem;
          font-size: 0.875rem;
          color: #374151;
          font-weight: 500;
        }

        .zoom-value {
          color: #6b7280;
        }

        .zoom-slider {
          width: 100%;
          height: 6px;
          border-radius: 3px;
          background: #e5e7eb;
          outline: none;
          -webkit-appearance: none;
        }

        .zoom-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #667eea;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .zoom-slider::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #667eea;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .crop-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          background: white;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
          margin-bottom: 1rem;
        }

        .crop-info i {
          color: #667eea;
          font-size: 18px;
        }

        .crop-info-text {
          font-size: 0.8125rem;
          color: #6b7280;
        }

        .crop-actions {
          display: flex;
          gap: 0.75rem;
          justify-content: flex-end;
        }

        .btn-cancel {
          padding: 0.625rem 1.25rem;
          border: 1px solid #d1d5db;
          background: white;
          color: #374151;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 0.875rem;
        }

        .btn-cancel:hover {
          background: #f9fafb;
          border-color: #9ca3af;
        }

        .btn-save {
          padding: 0.625rem 1.5rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 0.875rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .btn-save:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }

        .btn-save:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-save i {
          font-size: 16px;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .spin {
          animation: spin 1s linear infinite;
        }

        @media (max-width: 768px) {
          .crop-container-wrapper {
            height: 400px;
          }

          .crop-modal-header {
            padding: 1rem;
          }

          .crop-controls {
            padding: 1rem;
          }

          .crop-actions {
            flex-direction: column-reverse;
          }

          .btn-cancel,
          .btn-save {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>

      <div className="crop-modal-header">
        <div>
          <h3 className="crop-modal-title">Resmi Kırp</h3>
          <p className="crop-modal-subtitle">
            {cropWidth && cropHeight
              ? `${cropWidth} x ${cropHeight} px boyutunda kırpın`
              : "Resmi istediğiniz gibi kırpın"}
          </p>
        </div>
        <button
          onClick={onClose}
          className="close-button"
          aria-label="Kapat"
          type="button"
        >
          <i className="ph ph-x"></i>
        </button>
      </div>

      <div className="crop-container-wrapper">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={calculatedAspectRatio}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
          style={{
            containerStyle: {
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            },
          }}
        />
      </div>

      <div className="crop-controls">
        {cropWidth && cropHeight && (
          <div className="crop-info">
            <i className="ph ph-info"></i>
            <span className="crop-info-text">
              Resim {cropWidth} x {cropHeight} piksel boyutunda kırpılacaktır.
            </span>
          </div>
        )}

        <div className="zoom-control">
          <div className="zoom-label">
            <span>Yakınlaştırma</span>
            <span className="zoom-value">{Math.round(zoom * 100)}%</span>
          </div>
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="zoom-slider"
          />
        </div>

        <div className="crop-actions">
          <button
            onClick={onClose}
            className="btn-cancel"
            disabled={isProcessing}
            type="button"
          >
            İptal
          </button>
          <button
            onClick={handleSave}
            className="btn-save"
            disabled={isProcessing || !croppedAreaPixels}
            type="button"
          >
            {isProcessing ? (
              <>
                <i className="ph ph-circle-notch spin"></i>
                <span>
                  {isSaving ? "Kirpiliyor..." : "API'ye Yukleniyor..."}
                </span>
              </>
            ) : (
              <>
                <i className="ph ph-check"></i>
                <span>Degisiklikleri Kaydet</span>
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};
