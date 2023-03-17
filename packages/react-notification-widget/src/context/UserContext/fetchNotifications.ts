import * as epns from '@epnsproject/sdk-restapi';
import dayjs from 'dayjs';
import { isMainnnet } from '../../global/helpers';
import { EpnsNotificationRawResp, Notification } from './types';

const fetchNotifications = async (epnsUserAddress: string, chainId: number) => {
  const rawNotifs: EpnsNotificationRawResp[] = await epns.user
    .getFeeds({
      raw: true,
      user: epnsUserAddress,
      env: isMainnnet(chainId) ? undefined : 'staging',
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
  timestamp: dayjs(new Date(epoch)).subtract(5.5, 'hours').toDate(), //TODO: revert when epns api is fixed
});

export default fetchNotifications;
