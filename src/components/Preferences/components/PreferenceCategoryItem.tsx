import React from 'react';
import styled from 'styled-components';
import Flex from 'components/layout/Flex';
import Text from 'components/Text';
import ToggleInput from 'components/ToggleInput';
import PreferenceBell from 'components/Preferences/components/PreferenceBell';
import { MessagingApp } from 'global/types.generated';
import { UserPreference } from 'context/ChannelContext/usePreferenceActions';

type PreferenceCategoryItemProps = {
  id: string;
  title: string;
  userPreferences: UserPreference;
  handleUpdateUserPreferences?: (id: string, key: string) => void;
  userChannels: MessagingApp[];
};

const PreferenceCategory = styled.div`
  display: flex;
  flex: 1;
  box-sizing: border-box;
  height: 36px;
  align-items: center;
  justify-content: space-between;
  ${Text} {
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const PreferenceCategoryItem = ({
  id,
  title,
  userPreferences,
  handleUpdateUserPreferences,
  userChannels,
}: PreferenceCategoryItemProps) => {
  return (
    <Flex alignItems={'center'} mb={1}>
      <PreferenceCategory>
        <Flex width={98}>
          <Text>{title}</Text>
        </Flex>

        <Flex width={32} alignItems={'center'} pl={1} pr={1}>
          <ToggleInput
            checked={userPreferences[id]?.enabled || false}
            onChange={() => {
              handleUpdateUserPreferences && handleUpdateUserPreferences(id, 'enabled');
            }}
          />
        </Flex>
      </PreferenceCategory>

      {userPreferences[id]?.enabled ? (
        <Flex width={176} justifyContent={'center'}>
          {userChannels.map((channel) => (
            <Flex key={`${channel}${id}`} width={60} justifyContent={'center'}>
              <PreferenceBell
                disabled={!userPreferences[id]?.enabled}
                enabled={userPreferences[id]?.[channel?.toLowerCase()] || false}
                onClick={() =>
                  handleUpdateUserPreferences && handleUpdateUserPreferences(id, channel)
                }
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
