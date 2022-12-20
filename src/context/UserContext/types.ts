import { UserCommunicationChannelsQuery } from './operations.generated';
import { PreferenceCategory, UserPreference } from 'context/UserContext/useChannelPreferences';

export type Notification = {
  title: string;
  timestamp: Date;
  message: string;
  appName: string;
  appAddress: string;
  image?: string;
  senderLogo?: string;
  url?: string;
  cta?: string;
};

export type UserContext = {
  notifications: Notification[];
  userCommsChannels?: UserCommunicationChannelsQuery['userCommunicationChannels'];
  setUserCommsChannelsPollInterval: (interval: number) => void;
  isLoggedIn: boolean;
  isLoading: boolean;
  userAddress?: string;
  feedOpen: boolean;
  setFeedOpen: (isOpen: boolean) => void;
  preferenceCategories: PreferenceCategory[];
  userPreferences: UserPreference;
  handleUpdateUserPreferences: (id: string, key: string) => void;
  userPreferencesCount?: number;
  userPreferencesLoading?: boolean;
  fetchUserPreferences: () => Promise<any>;
};

export type EpnsNotificationRawResp = {
  payload_id: number;
  sender: string;
  epoch: string;
  payload: EpnsNotifRawPayload;
  source: string;
  etime: any;
};

type EpnsNotifRawPayload = {
  data: EpnsNotifRawData;
  notification: EpnsNotifRawNotification;
};

type EpnsNotifRawData = {
  app: string;
  sid: string;
  url: string;
  acta: string;
  aimg: string;
  amsg: string;
  asub: string;
  icon: string;
  type: number;
  epoch: string;
  etime: any;
  hidden: string;
  sectype: any;
};

type EpnsNotifRawNotification = {
  body: string;
  title: string;
};
