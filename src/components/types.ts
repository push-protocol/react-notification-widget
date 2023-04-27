import { Notification } from 'context/UserContext/types';

export type Margins = {
  m?: string | number;
  mb?: string | number;
  mt?: string | number;
  mr?: string | number;
  ml?: string | number;
};

export type Paddings = {
  p?: string | number;
  pb?: string | number;
  pt?: string | number;
  pr?: string | number;
  pl?: string | number;
};

export type NotificationClickProp = {
  onNotificationClick?: (notification: Notification) => void;
};
