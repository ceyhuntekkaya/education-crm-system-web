import { SurveyType } from '../../enums/SurveyType';
import { SurveyTriggerEvent } from '../../enums/SurveyTriggerEvent';
import { SurveyQuestionCreateDto } from './SurveyQuestionCreateDto';

export interface SurveyUpdateDto {
  title: string;
  description: string;
  surveyType: SurveyType;
  triggerEvent: SurveyTriggerEvent;
  isActive: boolean;
  isAnonymous: boolean;
  isMandatory: boolean;
  showResultsToPublic: boolean;
  sendDelayHours: number;
  reminderDelayHours: number;
  maxReminders: number;
  expiresAfterDays: number;
  primaryColor: string;
  logoUrl: string;
  headerImageUrl: string;
  customCss: string;
  welcomeMessage: string;
  thankYouMessage: string;
  completionRedirectUrl: string;
  emailSubject: string;
  emailBody: string;
  emailTemplateId: string;
  questions: SurveyQuestionCreateDto[];
}
