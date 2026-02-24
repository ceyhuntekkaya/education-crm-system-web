/**
 * HTML İçerik Render Fonksiyonları
 * FormTextEditor'dan gelen HTML çıktısını güvenli şekilde div içinde göstermek için kullanılır.
 *
 * Temel Kullanım:
 *   <div className="tiptap-content" {...renderHtml(content)} />
 *
 * Boşluk Kontrolü:
 *   {!isHtmlEmpty(content) && <div {...renderHtml(content)} />}
 *
 * Kısaltılmış Önizleme:
 *   <p>{truncateHtml(content, 120)}</p>
 *
 * Düz Metin:
 *   <span>{stripHtml(content)}</span>
 */

/**
 * FormTextEditor'dan gelen HTML'i div içine basmak için kullanılır.
 * Zararlı kodları (script, event handler, javascript: protocol) temizleyerek
 * dangerouslySetInnerHTML formatında döndürür.
 *
 * @example
 * <div className="tiptap-content" {...renderHtml(data.description)} />
 *
 * @param html - FormTextEditor'dan gelen HTML string
 * @returns React dangerouslySetInnerHTML prop objesi
 */
export const renderHtml = (
  html: string | null | undefined,
): { dangerouslySetInnerHTML: { __html: string } } => {
  return {
    dangerouslySetInnerHTML: {
      __html: sanitizeHtml(html),
    },
  };
};

/**
 * HTML içeriğin boş olup olmadığını kontrol eder.
 * Tiptap boş editörde "<p></p>" döndürür — bunu da boş sayar.
 *
 * @example
 * {!isHtmlEmpty(data.content) && <div {...renderHtml(data.content)} />}
 */
export const isHtmlEmpty = (html: string | null | undefined): boolean => {
  if (!html) return true;
  return stripHtml(html).length === 0;
};

/**
 * HTML string'den tüm tag'ları kaldırarak düz metin döndürür.
 *
 * @example
 * <span>{stripHtml(data.description)}</span>
 */
export const stripHtml = (html: string | null | undefined): string => {
  if (!html) return "";
  return html
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/p>\s*<p[^>]*>/gi, " ")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
};

/**
 * HTML içeriği belirli karakter limitinde keserek düz metin döndürür.
 * Tablo/kart başlıklarında kısa önizleme göstermek için idealdir.
 *
 * @example
 * <p>{truncateHtml(data.content, 100)}</p>
 */
export const truncateHtml = (
  html: string | null | undefined,
  maxLength: number,
  suffix: string = "...",
): string => {
  const text = stripHtml(html);
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + suffix;
};

// ========================
// Internal
// ========================

/**
 * HTML'den zararlı içerikleri temizler.
 * Script, style taglarını, event handler'ları ve javascript: protocol'ünü kaldırır.
 */
const sanitizeHtml = (html: string | null | undefined): string => {
  if (!html) return "";

  return (
    html
      // <script> ve <style> taglarını tamamen kaldır
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      // on* event handler'ları kaldır (onclick, onerror vb.)
      .replace(/\s+on\w+\s*=\s*["'][^"']*["']/gi, "")
      .replace(/\s+on\w+\s*=\s*[^\s>]*/gi, "")
      // javascript: protocol'ünü etkisiz hale getir
      .replace(/href\s*=\s*["']javascript:[^"']*["']/gi, 'href="#"')
      .replace(/src\s*=\s*["']javascript:[^"']*["']/gi, 'src=""')
  );
};
