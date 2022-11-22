import React from 'react';
import Button from 'components/Button';
import analytics from 'services/analytics';
import { Routes, useRouterContext } from 'context/RouterContext';
import { useChannelContext } from 'context/ChannelContext';
import { useAuthContext } from 'context/AuthContext';

const SubscribeActions = () => {
  const { isLoading, subscribe, setIsFirstLogin } = useAuthContext();
  const { setRoute } = useRouterContext();
  const { channelAddress, isWrongNetwork } = useChannelContext();

  const handleSubscribe = async () => {
    analytics.track('channel subscribe', { channelAddress });
    setIsFirstLogin(true);
    await subscribe();
    setRoute(Routes.ConnectEmail);
  };

  return (
    <Button
      width={'100%'}
      onClick={handleSubscribe}
      disabled={isLoading || isWrongNetwork}
      size={'lg'}
    >
      Subscribe
    </Button>
  );
};

export default SubscribeActions;
