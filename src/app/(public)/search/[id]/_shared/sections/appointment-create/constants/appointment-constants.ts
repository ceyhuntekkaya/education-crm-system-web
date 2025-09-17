/**
 * Backward compatibility file for appointment-constants.ts
 * Bu dosya eski appointment-constants.ts dosyasının import'larını yeni dosyalara yönlendirir
 *
 * @deprecated Bu dosya eski import'lar için geçici olarak oluşturulmuştur.
 * Lütfen yeni modüler import'ları kullanın:
 * - step-constants.ts
 * - student-constants.ts
 * - grade-constants.ts
 * - appointment-type-constants.ts
 * - communication-constants.ts
 * - form-options-constants.ts
 * - validation-constants.ts
 */

// Re-export everything from the new modular files
export * from "./step-constants";
export * from "./student-constants";
export * from "./grade-constants";
export * from "./appointment-type-constants";
export * from "./communication-constants";
export * from "./form-options-constants";
export * from "./validation-constants";
