"use client";

import React from "react";
import { Form } from "@/components/forms";
import { useForm } from "@/contexts/form-context";
import { Button } from "@/components/ui";
import { FileInput } from "@/components/file-input";
import { useApplicationDetailContext } from "../../../context";
import type { ApplicationDocumentFormValues } from "../schemas";
import { extractFileName, convertMediaTypeToDocumentType } from "../utils";

interface ApplicationDocumentFormContentProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

/**
 * Belge ekleme formu içeriği
 */
export const ApplicationDocumentFormContent: React.FC<
  ApplicationDocumentFormContentProps
> = ({ onSuccess, onCancel }) => {
  const { addDocument, isAddingDocument } = useApplicationDetailContext();
  const { setValue } = useForm();

  // FileInput'tan dönen backend response'unu yakala
  const handleFileUploadSuccess = React.useCallback(
    (response: any) => {
      if (response && Array.isArray(response) && response.length > 0) {
        // Backend response'unun ilk dosyasını metadata olarak kaydet
        setValue("documentMetadata", response[0]);
      }
    },
    [setValue],
  );

  const handleSubmit = async (values: any) => {
    const metadata = values.documentMetadata;

    // Dosya adını metadata'dan veya URL'den al
    const documentName = extractFileName(metadata, values.documentUrl);

    // DocumentType'ı metadata'dan al
    const documentType =
      metadata?.documentType ||
      convertMediaTypeToDocumentType(metadata?.mediaType || metadata?.itemType);

    // FileSize'ı metadata'dan al (bytes cinsinden)
    const fileSize = metadata?.fileSizeBytes || metadata?.fileSize;

    await addDocument({
      documentName,
      documentUrl: values.documentUrl,
      documentType,
      fileSize,
    });

    onSuccess?.();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="d-flex flex-column gap-20">
        {/* Belge Yükleme */}
        <FileInput
          label="Belge Dosyası"
          type="all"
          variant="outline"
          placeholder="Dosyanızı seçin veya sürükleyip bırakın"
          maxSize={10}
          multiple={false}
          name="documentUrl"
          disabled={isAddingDocument}
          isAutoUpload={true}
          onUploadSuccess={handleFileUploadSuccess}
          required
        />

        <div className="text-neutral-600 text-sm">
          <i className="ph-info me-2"></i>
          Belge adı, türü ve boyutu otomatik olarak algılanacaktır.
        </div>

        {/* Form Actions */}
        <div className="d-flex justify-content-end gap-12">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onCancel}
              disabled={isAddingDocument}
            >
              <i className="ph-x me-2"></i>
              İptal
            </Button>
          )}
          <Button
            type="submit"
            size="sm"
            loading={isAddingDocument}
            disabled={isAddingDocument}
          >
            <i className="ph-check me-2"></i>
            Kaydet
          </Button>
        </div>
      </div>
    </Form>
  );
};
