/**
 * YouTube video URL'sinden video ID'sini çıkarır
 * Desteklenen formatlar:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://www.youtube.com/v/VIDEO_ID
 * - VIDEO_ID (direkt 11 karakterlik ID)
 */
export const getYouTubeVideoId = (url: string): string | null => {
  // Farklı YouTube URL formatları için regex pattern'leri
  const patterns = [
    // youtube.com/watch?v=
    /(?:youtube\.com\/watch\?v=)([^&\n?#]+)/,
    // youtu.be/
    /(?:youtu\.be\/)([^&\n?#]+)/,
    // youtube.com/embed/
    /(?:youtube\.com\/embed\/)([^&\n?#]+)/,
    // youtube.com/v/
    /(?:youtube\.com\/v\/)([^&\n?#]+)/,
    // youtube.com/shorts/
    /(?:youtube\.com\/shorts\/)([^&\n?#]+)/,
    // Direkt video ID (11 karakter)
    /^([a-zA-Z0-9_-]{11})$/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
};

/**
 * Saniye cinsinden süreyi okunabilir formata çevirir
 * @param seconds - Toplam saniye
 * @returns Formatlanmış süre (örn: "5 dakika", "1 saat 30 dakika")
 */
export const formatDuration = (seconds: number): string => {
  if (!seconds || seconds <= 0) return "Yükleniyor...";

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const parts: string[] = [];

  if (hours > 0) {
    parts.push(`${hours} saat`);
  }

  if (minutes > 0) {
    parts.push(`${minutes} dakika`);
  }

  if (secs > 0 && hours === 0) {
    parts.push(`${secs} saniye`);
  }

  return parts.join(" ") || "Yükleniyor...";
};

/**
 * YouTube Data API ile video bilgilerini getirir
 * Not: API key gerektirir
 */
export const fetchYouTubeVideoInfo = async (
  videoId: string,
  apiKey?: string
): Promise<{
  duration: string;
  title: string;
  thumbnailUrl: string;
} | null> => {
  if (!apiKey) {
    console.warn("YouTube API key bulunamadı");
    return null;
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=contentDetails,snippet&key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error("Video bilgileri alınamadı");
    }

    const data = await response.json();

    if (data.items && data.items.length > 0) {
      const video = data.items[0];
      const duration = parseISO8601Duration(video.contentDetails.duration);

      return {
        duration: formatDuration(duration),
        title: video.snippet.title,
        thumbnailUrl:
          video.snippet.thumbnails.maxres?.url ||
          video.snippet.thumbnails.high?.url ||
          video.snippet.thumbnails.default?.url,
      };
    }

    return null;
  } catch (error) {
    console.error("Video bilgisi çekilirken hata:", error);
    return null;
  }
};

/**
 * ISO 8601 duration formatını saniyeye çevirir
 * Örnek: PT1H30M15S -> 5415 saniye
 */
export const parseISO8601Duration = (duration: string): number => {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

  if (!match) return 0;

  const hours = parseInt(match[1]) || 0;
  const minutes = parseInt(match[2]) || 0;
  const seconds = parseInt(match[3]) || 0;

  return hours * 3600 + minutes * 60 + seconds;
};

/**
 * YouTube video için embed URL oluşturur
 */
export const createYouTubeEmbedUrl = (
  videoId: string,
  options?: {
    autoplay?: boolean;
    controls?: boolean;
    loop?: boolean;
    mute?: boolean;
    startTime?: number;
  }
): string => {
  const params = new URLSearchParams();

  if (options?.autoplay) params.append("autoplay", "1");
  if (options?.controls === false) params.append("controls", "0");
  if (options?.loop) params.append("loop", "1");
  if (options?.mute) params.append("mute", "1");
  if (options?.startTime) params.append("start", options.startTime.toString());

  // enablejsapi her zaman ekle (duration almak için)
  params.append("enablejsapi", "1");

  const queryString = params.toString();
  return `https://www.youtube.com/embed/${videoId}${queryString ? `?${queryString}` : ""}`;
};

/**
 * Video URL'sinin geçerli olup olmadığını kontrol eder
 */
export const isValidYouTubeUrl = (url: string): boolean => {
  return getYouTubeVideoId(url) !== null;
};

/**
 * URL'nin direkt video dosyası olup olmadığını kontrol eder (MP4, WebM, OGG)
 */
export const isDirectVideoUrl = (url: string): boolean => {
  const videoExtensions = [".mp4", ".webm", ".ogg", ".mov", ".avi", ".mkv"];
  const lowerUrl = url.toLowerCase();

  return videoExtensions.some((ext) => lowerUrl.includes(ext));
};

/**
 * Video tipini belirler
 */
export const getVideoType = (
  url: string
): "youtube" | "direct" | "unknown" => {
  if (isValidYouTubeUrl(url)) {
    return "youtube";
  }
  if (isDirectVideoUrl(url)) {
    return "direct";
  }
  return "unknown";
};

/**
 * Direkt video URL'sinin MIME type'ını belirler
 */
export const getVideoMimeType = (url: string): string => {
  const lowerUrl = url.toLowerCase();

  if (lowerUrl.includes(".mp4")) return "video/mp4";
  if (lowerUrl.includes(".webm")) return "video/webm";
  if (lowerUrl.includes(".ogg")) return "video/ogg";
  if (lowerUrl.includes(".mov")) return "video/quicktime";
  if (lowerUrl.includes(".avi")) return "video/x-msvideo";
  if (lowerUrl.includes(".mkv")) return "video/x-matroska";

  return "video/mp4"; // Default
};

