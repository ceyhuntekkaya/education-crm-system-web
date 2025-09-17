/**
 * UI and timing configuration for appointment creation
 * Bu dosya UI görünümü ve zamanlama ayarlarını içerir
 */

import { UITimingConfig } from "../types/config-types";

// =============================================================================
// UI AND TIMING CONFIGURATION
// =============================================================================

export const DEFAULT_UI_TIMING_CONFIG: UITimingConfig = {
  showProgressBar: true,
  showStepNumbers: true,
  compactMode: false,
  sessionTimeoutMinutes: 30,
  autosaveIntervalSeconds: 60,
};
