import { AppointmentNoteFormData } from "../types/form-data";
import { NoteType } from "@/enums";

export const initialValues: AppointmentNoteFormData = {
  note: "",
  noteType: NoteType.GENERAL,
  isPrivate: false,
  isImportant: false,
  attachmentUrl: "",
  attachmentName: "",
  attachmentSize: undefined,
  attachmentType: "",
  noSaleReason: "",
};
