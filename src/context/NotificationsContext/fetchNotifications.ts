import * as epns from '@epnsproject/sdk-restapi';
import dayjs from 'dayjs';
import { EpnsNotificationRawResp, Notification } from './types';

const fetchNotifications = async (epnsUserAddress: string, epnsEnv: string) => {
  const rawNotifs: EpnsNotificationRawResp[] = await epns.user
    .getFeeds({
      raw: true,
      user: epnsUserAddress,
      env: epnsEnv,
      page: 1,
      limit: 1000,
    })
    .catch((e) => console.error('Failed to fetch EPNS notifications -', e?.message));

  return rawNotifs?.map(epnsNotifToNotif);
};

const epnsNotifToNotif = ({
  epoch,
  sender,
  payload: { data },
}: EpnsNotificationRawResp): Notification => ({
  title: data.asub,
  message: data.amsg,
  appName: data.app,
  appAddress: sender,
  senderLogo: data.icon,
  url: data.url,
  image: data.aimg,
  cta: data.acta,
  timestamp: dayjs(new Date(epoch)).toDate(),
});

export default fetchNotifications;
