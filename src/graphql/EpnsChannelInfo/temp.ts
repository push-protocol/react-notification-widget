import * as epns from '@epnsproject/sdk-restapi';
import { ENV } from 'global/const';

export const getTempChannelInfo = async (partnerKey: string) => {
  return epns.channels.getChannel({
    channel: 'eip155:42:0x35c79717ffdc2d2b6c79fc6dbf6fa3ff157e5df9',
    env: ENV,
  });
};
