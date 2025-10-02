// Mock data kullanım örneği
import { schoolDetailMockData } from "./school-detail-mock-data";

// Örnek kullanım:
export function useSchoolDetailMockData() {
  return {
    data: schoolDetailMockData,
    isLoading: false,
    error: null,
  };
}

// Mock data'dan belirli parçaları almak için yardımcı fonksiyonlar:
export const getMockSchoolInfo = () => schoolDetailMockData.school;
export const getMockCampusInfo = () => schoolDetailMockData.campus;
export const getMockBrandInfo = () => schoolDetailMockData.brand;
export const getMockPricingInfo = () => schoolDetailMockData.pricings;
export const getMockCampaigns = () => schoolDetailMockData.activeCampaigns;
export const getMockStatistics = () => schoolDetailMockData.statistics;
export const getMockProperties = () => schoolDetailMockData.allProperties;
