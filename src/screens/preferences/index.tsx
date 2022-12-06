import React, { useState, ReactElement } from 'react';
import styled from 'styled-components';
import Text from '../../components/Text';
import { MessagingApp } from '../../global/types.generated';
import { Telegram, Email } from '../../components/icons';
import Switch from '../../components/Switch';
import PreferenceBell from './components/PreferenceBell';
import { Screen } from 'components/layout/Screen';
import Flex from 'components/layout/Flex';

type UserPrefs = Record<string, { [key in MessagingApp]: boolean }>;

const userChannels = ['DISCORD', 'TELEGRAM', 'EMAIL'] as MessagingApp[];

const prefCategories = [
  { title: 'Marketing' },
  { title: 'Product Updates' },
  { title: 'Announcements' },
  { title: 'Liquidation Alerts' },
];

const AppToIcon = {
  DISCORD: <Telegram />,
  TELEGRAM: <Telegram />,
  EMAIL: <Email />,
  EPNS: <Email />,
} as Record<MessagingApp, ReactElement>;

const ChannelIconContainer = styled.div`
  height: 18px;
  width: 18px;
`;

const Preferences = () => {
  const [userPrefs, setUserPrefs] = useState<UserPrefs>({});
  const [enabledPrefs, setEnabledPrefs] = useState<Record<string, boolean>>({});

  const togglePref = (pref: string) => {
    const newPrefSetting = !enabledPrefs[pref];

    if (!newPrefSetting) {
      setUserPrefs({ ...userPrefs, [pref]: {} } as UserPrefs);
    }

    setEnabledPrefs((oldPrefs) => ({ ...oldPrefs, [pref]: newPrefSetting }));
  };

  const handlePreferenceChange = (pref: string, channel: MessagingApp) => {
    if (!enabledPrefs[pref]) return;
    const isPrefEnabled = userPrefs[pref]?.[channel];

    const newPrefs: UserPrefs = {
      ...userPrefs,
      [pref]: {
        ...userPrefs[pref],
        [channel]: !isPrefEnabled,
      },
    };

    setUserPrefs(newPrefs);
  };

  return (
    <Screen title={'Preferences'} mb={2}>
      <Flex gap={3} direction={'column'} height={'100%'}>
        <Flex alignItems={'center'}>
          <Flex width={150} />
          <Flex width={70} />

          <Flex width={200} justifyContent={'space-between'}>
            {userChannels.map((channel) => (
              <Flex gap={0.5} key={channel} width={60} alignItems={'center'} direction={'column'}>
                <ChannelIconContainer>{AppToIcon[channel]}</ChannelIconContainer>
                <Text size={'sm'} style={{ textTransform: 'capitalize' }}>
                  {channel.toLowerCase()}
                </Text>
              </Flex>
            ))}
          </Flex>
        </Flex>
        {prefCategories.map(({ title }) => (
          <Flex alignItems={'center'} key={title}>
            <Flex width={150}>
              <Text size={'lg'}>{title}</Text>
            </Flex>

            <Flex width={70}>
              <Switch checked={enabledPrefs[title] || false} onChange={() => togglePref(title)} />
            </Flex>

            <Flex width={200} justifyContent={'space-between'}>
              {userChannels.map((channel) => (
                <Flex key={`${channel}${title}`} width={60} justifyContent={'center'}>
                  <PreferenceBell
                    disabled={!enabledPrefs[title]}
                    enabled={userPrefs[title]?.[channel] || false}
                    onClick={() => handlePreferenceChange(title, channel)}
                  />
                </Flex>
              ))}
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Screen>
  );
};

export default Preferences;
