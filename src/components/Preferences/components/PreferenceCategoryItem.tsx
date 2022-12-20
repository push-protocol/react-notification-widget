import React from 'react';
import styled from 'styled-components';
import Flex from 'components/layout/Flex';
import Text from 'components/Text';
import ToggleInput from 'components/ToggleInput';
import PreferenceBell from 'components/Preferences/components/PreferenceBell';
import { MessagingApp } from 'global/types.generated';
import { UserPreference } from 'context/UserContext/useChannelPreferences';

type PreferenceCategoryItemProps = {
  category: string;
  title: string;
  userPreferences: UserPreference;
  handleUpdateUserPreferences: (id: string, key: string) => void;
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
  category,
  title,
  userPreferences,
  handleUpdateUserPreferences,
  userChannels,
}: PreferenceCategoryItemProps) => {
  return (
    <Flex alignItems={'center'} mb={1}>
      <PreferenceCategory>
        <Flex width={100}>
          <Text>{title}</Text>
        </Flex>

        <Flex width={32} alignItems={'center'} pl={1} pr={1}>
          <ToggleInput
            checked={!!userPreferences[category]?.enabled}
            onChange={() => {
              handleUpdateUserPreferences && handleUpdateUserPreferences(category, 'enabled');
            }}
          />
        </Flex>
      </PreferenceCategory>

      {userPreferences[category]?.enabled ? (
        <Flex width={180} justifyContent={'center'}>
          {userChannels.map((channel) => (
            <Flex key={`${channel}${category}`} width={60} justifyContent={'center'}>
              <PreferenceBell
                disabled={!userPreferences[category]?.enabled}
                enabled={userPreferences[category]?.[channel?.toLowerCase()] || false}
                onClick={() =>
                  handleUpdateUserPreferences && handleUpdateUserPreferences(category, channel)
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
