import React from 'react';
import styled from 'styled-components';
import Flex from 'components/layout/Flex';
import Text from 'components/Text';
import ToggleInput from 'components/ToggleInput';
import PreferenceBell from 'components/Preferences/components/PreferenceBell';
import { MessagingApp } from 'global/types.generated';
import { UserPrefs } from 'context/ChannelContext/usePreferences';

type PreferenceCategoryItemProps = {
  title: string;
  enabledPrefs: Record<string, boolean>;
  togglePref?: (pref: string) => void;
  userPrefs: UserPrefs;
  handlePreferenceChange?: (pref: string, channel: MessagingApp) => void;
  userChannels: MessagingApp[];
};

const PreferenceCategory = styled.div`
  display: flex;
  flex: 1;
  padding-right: 8px;
  box-sizing: border-box;
  height: 36px;
  align-items: center;
  ${Text} {
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const PreferenceCategoryItem = ({
  title,
  enabledPrefs,
  togglePref,
  userPrefs,
  handlePreferenceChange,
  userChannels,
}: PreferenceCategoryItemProps) => {
  return (
    <Flex alignItems={'center'} key={title} mb={1}>
      <PreferenceCategory>
        <Flex width={98}>
          <Text>{title}</Text>
        </Flex>

        <Flex width={32} alignItems={'center'}>
          <ToggleInput
            checked={enabledPrefs[title] || false}
            onChange={() => togglePref && togglePref(title)}
          />
        </Flex>
      </PreferenceCategory>

      {enabledPrefs[title] ? (
        <Flex width={176} justifyContent={'center'}>
          {userChannels.map((channel) => (
            <Flex key={`${channel}${title}`} width={60} justifyContent={'center'}>
              <PreferenceBell
                disabled={!enabledPrefs[title]}
                enabled={userPrefs[title]?.[channel] || false}
                onClick={() => handlePreferenceChange && handlePreferenceChange(title, channel)}
              />
            </Flex>
          ))}
        </Flex>
      ) : (
        <Flex width={'100%'} height={35} alignItems={'center'} justifyContent={'center'}>
          <Text>Alerts are off</Text>
        </Flex>
      )}
    </Flex>
  );
};

export default PreferenceCategoryItem;
