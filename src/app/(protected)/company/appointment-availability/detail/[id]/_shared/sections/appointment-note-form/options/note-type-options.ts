import { NoteType } from "@/enums";

export interface NoteTypeOption {
  label: string;
  value: NoteType;
}

export const noteTypeOptions: NoteTypeOption[] = [
  { label: "Genel Not", value: NoteType.GENERAL },
  { label: "Hazırlık Notu", value: NoteType.PREPARATION },
  { label: "Takip Notu", value: NoteType.FOLLOW_UP },
  { label: "Sonuç Notu", value: NoteType.OUTCOME },
  { label: "Şikayet", value: NoteType.COMPLAINT },
  { label: "Övgü", value: NoteType.COMPLIMENT },
  { label: "Teknik Sorun", value: NoteType.TECHNICAL_ISSUE },
  { label: "Erteleme", value: NoteType.RESCHEDULING },
  { label: "İptal", value: NoteType.CANCELLATION },
  { label: "Hatırlatma", value: NoteType.REMINDER },
  { label: "Dahili Not", value: NoteType.INTERNAL },
];
