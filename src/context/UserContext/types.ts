import { UserCommunicationChannelsQuery, GetUserQuery } from './operations.generated';

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
  user?: GetUserQuery['user'];
  userCommsChannels?: UserCommunicationChannelsQuery['userCommunicationChannels'];
  setUserCommsChannelsPollInterval: (interval: number) => void;
  userCommsChannelsPollInterval: number;
  isLoading: boolean;
  userAddress?: string;
  feedOpen: boolean;
  setFeedOpen: (isOpen: boolean) => void;
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
