import { UserCommunicationChannelsQuery } from './operations.generated';

export type Notification = {
  title: string;
  timestamp: Date;
  message: string;
  appName: string;
  appAddress: string;
  image?: string;
  icon?: string;
  url?: string;
  cta?: string;
};

export type NotificationsContext = {
  notifications: Notification[];
  userCommsChannels?: UserCommunicationChannelsQuery['userCommunicationChannels'];
  isLoggedIn: boolean;
  isLoading: boolean;
  userAddress?: string;
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
