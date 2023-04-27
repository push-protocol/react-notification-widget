import React, { useState, useEffect } from 'react';
import {
  useUnsubscribeMutation,
  useGetUserSubscriptionsQuery,
  GetUserSubscriptionsDocument,
} from '../operations.generated';
import analytics from '../../../services/analytics';
import Flex from 'components/layout/Flex';
import Text from 'components/Text';
import Dropdown from 'components/Dropdown';
import Preferences from 'components/Preferences';
import ConnectApps from 'components/ConnectApps';
import Button from 'components/Button';
import { Web2Apps } from 'context/UserContext/const';
import { MessagingApp, UserSubscriptionSource } from 'global/types.generated';
import { useAuthContext } from 'context/AuthContext';
import { useEnvironment } from 'context/EnvironmentContext';
import { useUserContext } from 'context/UserContext';
import { useChannelContext } from 'context/ChannelContext';

const PassportTab = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [openChannel, setOpenChannel] = useState(-1);
  const { isSubscribeOnlyMode } = useEnvironment();
  const { userCommsChannels } = useUserContext();
  const { isLoggedIn } = useAuthContext();
  const { icon, discordGuildUrl, messageCategories, name, chainId, channelAddress } =
    useChannelContext();

  const { unsubscribe: signUnsubscribeMsg, logout, discordToken } = useAuthContext();

  const [unsubscribe] = useUnsubscribeMutation({ refetchQueries: [GetUserSubscriptionsDocument] });
  const { data: userSubsData } = useGetUserSubscriptionsQuery({
    skip: !isSubscribeOnlyMode || !isLoggedIn,
  });

  useEffect(() => {
    analytics.track('MyPassport tab loaded');
  }, []);

  const appConfig = Web2Apps.map((app) => ({
    app,
    enabled: userCommsChannels?.[app.toLowerCase() as Lowercase<typeof Web2Apps[0]>]
      ?.exists as boolean,
    available:
      app === MessagingApp.Discord
        ? (!!discordGuildUrl && discordToken) || userCommsChannels?.discord.exists
        : true,
  })).filter((app) => app.available);

  const handleUnsubscribe = async (channelAddress?: string) => {
    setIsLoading(true);

    try {
      await signUnsubscribeMsg(channelAddress);
      await unsubscribe(
        channelAddress ? { variables: { input: { channelAddress, chainId } } } : undefined
      );
    } finally {
      setIsLoading(false);
    }
  };

  const apps = appConfig.map((config) => config.app);
  const [appOpen, setAppOpen] = useState<MessagingApp | undefined>();

  return (
    <>
      {isSubscribeOnlyMode && (
        <Flex style={{ alignSelf: 'flex-start' }} m={2}>
          <Text size={'lg'}>
            <strong>Channels</strong>
          </Text>
        </Flex>
      )}

      {isSubscribeOnlyMode ? (
        <>
          <Dropdown
            icon={icon}
            title={name}
            isOpen={openChannel === 0}
            toggleOpen={() => setOpenChannel(openChannel === 0 ? -1 : 0)}
          >
            <Flex direction={'column'} width={'100%'} gap={1}>
              <Preferences
                messageCategories={messageCategories}
                hideChannelInfo
                hideDescriptions
                appConfig={appConfig}
                onDisabledAppClick={setAppOpen}
              />
              <Button isLoading={isLoading} onClick={() => handleUnsubscribe()} variant={'gray'}>
                Unsubscribe
              </Button>
            </Flex>
          </Dropdown>
          {userSubsData?.userSubscriptions
            .filter((sub) => sub.address.toLowerCase() !== channelAddress.toLowerCase())
            .sort((subA, subB) => (subB.commsChannelTags ? 1 : -1))
            .map((subscription, i) => (
              <Dropdown
                key={subscription.address}
                icon={subscription.icon}
                title={subscription.name}
                isOpen={openChannel === i + 1}
                toggleOpen={() => setOpenChannel(openChannel === i + 1 ? -1 : i + 1)}
              >
                <Flex direction={'column'} width={'100%'} gap={1}>
                  {subscription.source === UserSubscriptionSource.Wherever &&
                  subscription.commsChannelTags ? (
                    <>
                      <Preferences
                        messageCategories={subscription.commsChannelTags || []}
                        hideChannelInfo
                        hideDescriptions
                        appConfig={appConfig}
                        onDisabledAppClick={setAppOpen}
                      />
                      <Button
                        isLoading={isLoading}
                        onClick={() => handleUnsubscribe()}
                        variant={'gray'}
                      >
                        Unsubscribe
                      </Button>
                    </>
                  ) : (
                    <Button
                      isLoading={isLoading}
                      onClick={() => handleUnsubscribe(subscription.address)}
                      variant={'gray'}
                    >
                      Unsubscribe
                    </Button>
                  )}
                </Flex>
              </Dropdown>
            ))}
        </>
      ) : (
        !!messageCategories.length && (
          <Preferences
            messageCategories={messageCategories}
            hideChannelInfo
            hideDescriptions
            appConfig={appConfig}
            onDisabledAppClick={setAppOpen}
          />
        )
      )}

      {isSubscribeOnlyMode && (
        <Flex style={{ alignSelf: 'flex-start' }} mt={2} ml={2} mb={1}>
          <Text size={'lg'}>
            <strong>Destinations</strong>
          </Text>
        </Flex>
      )}

      <ConnectApps mt={1} apps={apps} appOpen={appOpen} setAppOpen={setAppOpen} />

      {isSubscribeOnlyMode && (
        <Button mt={2} mb={2} variant={'gray'} onClick={logout}>
          Disconnect Wallet
        </Button>
      )}
    </>
  );
};

export default PassportTab;
