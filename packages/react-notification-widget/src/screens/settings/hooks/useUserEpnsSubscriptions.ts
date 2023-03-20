import * as epns from '@epnsproject/sdk-restapi';
import { useState, useEffect } from 'react';
import { useUserContext } from '../../../context/UserContext';
import { useAuthContext } from '../../../context/AuthContext';
import { GetUserSubscriptionsDocument } from '../operations.generated';
import { useChannelContext } from '../../../context/ChannelContext';
import analytics from '../../../services/analytics';
import { useUserSubscribeMutation } from '../../subscribe/operations.generated';
import { UserSubscribeSource } from '../../../global/types.generated';

const useUserEpnsSubscriptions = () => {
  const { userAddress } = useUserContext();
  const { subscribe } = useAuthContext();
  const { chainId } = useChannelContext();

  const [subscriptions, setSubscriptions] = useState<string[]>([]);
  const [addSubscriptionLoading, setAddSubscriptionLoading] = useState<string>();

  const [subToChannel] = useUserSubscribeMutation({
    refetchQueries: [GetUserSubscriptionsDocument],
  });

  const addSubscription = async (address: string) => {
    setAddSubscriptionLoading(address.toLowerCase());

    try {
      await subscribe(address);
      analytics.track('channel subscribe successful', {
        channelAddress: address,
        source: 'passport discovery',
      });
      await subToChannel({
        variables: {
          input: {
            source: UserSubscribeSource.PassportDiscovery,
            channel: {
              channelAddress: address,
              chainId,
            },
          },
        },
      });
      setSubscriptions((oldSubs) => [...oldSubs, address.toLowerCase()]);
    } finally {
      setAddSubscriptionLoading(undefined);
    }
  };

  useEffect(() => {
    if (!userAddress) {
      return;
    }

    const fetch = async () => {
      const resp = await epns.user.getSubscriptions({
        user: `eip155:1:${userAddress}`,
      });
      const channelAddresses = resp.map((r: { channel: string }) => r.channel.toLowerCase());

      setSubscriptions(channelAddresses);
    };

    fetch();
  }, [userAddress]);

  return { subscriptions, addSubscription, addSubscriptionLoading };
};

export default useUserEpnsSubscriptions;
