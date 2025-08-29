export interface VisitorLogDto {
  id?: number;
  sessionId?: string;
  visitorId?: string;
  ipAddress?: string;
  userAgent?: string;
  pageUrl?: string;
  pageTitle?: string;
  referrerUrl?: string;
  visitTime?: string;
  timeOnPageSeconds?: number;
  deviceType?: string;
  browserName?: string;
  browserVersion?: string;
  operatingSystem?: string;
  screenResolution?: string;
  language?: string;
  country?: string;
  city?: string;
  region?: string;
  latitude?: number;
  longitude?: number;
  timezone?: string;
  trafficSource?: string;
  utmSource?: string;
}
