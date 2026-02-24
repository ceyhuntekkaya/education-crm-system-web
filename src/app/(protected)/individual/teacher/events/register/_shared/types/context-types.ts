import type { EventDto } from "@/types";

export interface EventRegistrationAddContextValue {
  /** Etkinlik verisi */
  event: EventDto | null;
  /** Etkinlik yükleniyor mu? */
  eventLoading: boolean;
  /** Kayıt işlemi gönderme fonksiyonu */
  submitRegistration: (data: {
    eventId: number;
    teacherId: number;
    registrationNote?: string;
  }) => Promise<boolean>;
  /** Kayıt işlemi gönderiliyor mu? */
  submitting: boolean;
}
