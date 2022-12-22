import React from 'react';
import styled from 'styled-components';
import { PREFERENCES_WIDTH } from '../consts';
import { MessagingAppConfig } from '../index';
import { Web2ChannelLower } from '../../../context/UserContext/const';
import Flex from 'components/layout/Flex';
import Text from 'components/Text';
import ToggleInput from 'components/ToggleInput';
import PreferenceBell from 'components/Preferences/components/PreferenceBell';
import { CommsChannelTag } from 'context/UserContext/useChannelPreferences';

type PropsT = {
  categoryId: string;
  title: string;
  preferences: CommsChannelTag[];
  onPreferenceUpdate: (id: string, key: Web2ChannelLower | 'enabled') => void;
  messagingAppConfig: MessagingAppConfig[];
};

const PreferenceCategory = styled.div`
  display: flex;
  flex: 1;
  box-sizing: border-box;
  height: 36px;
  align-items: center;
  ${Text} {
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const PreferenceCategoryItem = ({
  categoryId,
  title,
  preferences,
  onPreferenceUpdate,
  messagingAppConfig,
}: PropsT) => {
  const pref = preferences.find((pref) => pref.id === categoryId);

  return (
    <Flex alignItems={'center'} mb={1}>
      <PreferenceCategory>
        <Flex width={105}>
          <Text size={'sm'}>{title}</Text>
        </Flex>

        <Flex width={32} alignItems={'center'} pl={1} pr={1}>
          <ToggleInput
            checked={!!pref?.userPreference?.enabled}
            onChange={() => {
              onPreferenceUpdate(categoryId, 'enabled');
            }}
          />
        </Flex>
      </PreferenceCategory>

      {pref?.userPreference?.enabled && (
        <Flex width={PREFERENCES_WIDTH} gap={1} justifyContent={'end'}>
          {messagingAppConfig.map(({ app, enabled }) => (
            <Flex
              key={`${app}${categoryId}`}
              width={PREFERENCES_WIDTH / 3}
              justifyContent={'center'}
            >
              <PreferenceBell
                disabled={!enabled}
                selected={pref?.userPreference[app.toLowerCase() as Web2ChannelLower] || false}
                onClick={() =>
                  onPreferenceUpdate(categoryId, app.toLowerCase() as Web2ChannelLower)
                }
              />
            </Flex>
          ))}
        </Flex>
      )}
    </Flex>
  );
};

export default PreferenceCategoryItem;
