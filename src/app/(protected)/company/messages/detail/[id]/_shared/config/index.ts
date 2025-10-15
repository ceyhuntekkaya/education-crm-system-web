export { messageInfoConfig } from "./message-info-config";
export { senderInfoConfig } from "./sender-info-config";
export { messageContentConfig } from "./message-content-config";
export { studentInfoConfig } from "./student-info-config";
export { responseInfoConfig } from "./response-info-config";
export { followUpConfig } from "./follow-up-config";
export { trackingInfoConfig } from "./tracking-info-config";
export { assignmentInfoConfig } from "./assignment-info-config";
export { MESSAGE_SECTIONS } from "./section-definitions";

// Enhanced content display system
export {
  messageContentDisplayConfigs,
  getSortedContentConfigs,
  getContentConfigsByType,
} from "./content-display-configs";

// Content display utilities
export {
  createContentDisplayConfig,
  createMultiFieldContentConfig,
  createConditionalContentConfig,
  commonContentConfigs,
} from "../utils/content-display-utils";

// Content display examples
export {
  contentDisplayExamples,
  themedConfigs,
  exampleSimpleConfigs,
  exampleAdvancedConfigs,
} from "./content-display-examples";
