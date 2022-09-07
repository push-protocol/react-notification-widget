import { gql } from '@apollo/client';
import * as epns from '@epnsproject/sdk-restapi';
import { ENV, PUBLIC_GQL_ENDPOINT } from 'global/const';
import { apolloClient } from 'services/apolloClient';

export const getChannelInfo = async (partnerKey: string) => {
  const GET_CHANNEL = `
    query CommsChannelByPartnerKey($input: CommsChannelByPartnerKeyInput!) {
      commsChannelByPartnerKey(input: $input) {
        id
        channelAddress
        logo
        name
      }
    }
  `;
  return fetch(PUBLIC_GQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: GET_CHANNEL,
      variables: {
        input: { partnerApiKey: partnerKey },
      },
    }),
  });
};
