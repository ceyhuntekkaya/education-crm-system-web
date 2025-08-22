// Birim formatlama fonksiyonu
export function formatUnit(value: number, unit: string, locale: string = 'tr-TR') {
  return `${formatNumber(value, locale)} ${unit}`;
}

import { formatNumber } from './formatNumber';
