"use client";

import React from "react";
import { Form, FormTextarea } from "@/components/forms";
import { Button } from "@/components/ui";
import { useApplicationDetailContext } from "../../../context";
import type { ApplicationNoteFormValues } from "../schemas";

interface ApplicationNoteFormContentProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

/**
 * Not ekleme formu içeriği
 */
export const ApplicationNoteFormContent: React.FC<
  ApplicationNoteFormContentProps
> = ({ onSuccess, onCancel }) => {
  const { addNote, isAddingNote } = useApplicationDetailContext();

  const handleSubmit = async (values: any) => {
    await addNote(values.noteText);
    onSuccess?.();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="row g-16 pb-16">
        {/* Not Metni */}
        <div className="col-12">
          <FormTextarea
            name="noteText"
            label="Not Metni"
            placeholder="Başvuru ile ilgili notlarınızı buraya yazabilirsiniz..."
            rows={4}
            disabled={isAddingNote}
            required
            helperText="Not en az 10 karakter içermelidir"
          />
        </div>

        {/* Form Actions */}
        <div className="col-12">
          <div className="d-flex justify-content-end gap-12">
            <Button
              type="submit"
              size="sm"
              loading={isAddingNote}
              disabled={isAddingNote}
            >
              <i className="ph-check me-2"></i>
              Kaydet
            </Button>
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={onCancel}
                disabled={isAddingNote}
              >
                <i className="ph-x me-2"></i>
                İptal
              </Button>
            )}
          </div>
        </div>
      </div>
    </Form>
  );
};
