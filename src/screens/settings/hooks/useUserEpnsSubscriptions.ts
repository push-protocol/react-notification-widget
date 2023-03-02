import * as epns from '@epnsproject/sdk-restapi';
import { useState, useEffect } from 'react';
import { useUserContext } from '../../../context/UserContext';
import { useAuthContext } from '../../../context/AuthContext';
import {
  useSubscribeToDiscoveredChannelMutation,
  GetUserSubscriptionsDocument,
} from '../operations.generated';
import { useChannelContext } from '../../../context/ChannelContext';

const useUserEpnsSubscriptions = () => {
  const { userAddress } = useUserContext();
  const { subscribe } = useAuthContext();
  const { chainId } = useChannelContext();

  const [subscriptions, setSubscriptions] = useState<string[]>([]);
  const [addSubscriptionLoading, setAddSubscriptionLoading] = useState<string>();

  const [subToChannel] = useSubscribeToDiscoveredChannelMutation({
    refetchQueries: [GetUserSubscriptionsDocument],
  });

  const addSubscription = async (address: string) => {
    setAddSubscriptionLoading(address);

    try {
      await subscribe(address);
      await subToChannel({ variables: { input: { channelAddress: address, chainId } } });
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
      const resp = await epns.user.getSubscriptions({ user: `eip155:1:${userAddress}` });
      const channelAddresses = resp.map((r: { channel: string }) => r.channel.toLowerCase());

      setSubscriptions(channelAddresses);
    };

    fetch();
  }, [userAddress]);

  return { subscriptions, addSubscription, addSubscriptionLoading };
};

export default useUserEpnsSubscriptions;
