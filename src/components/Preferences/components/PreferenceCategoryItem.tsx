import React from 'react';
import styled from 'styled-components';
import { PREFERENCES_WIDTH } from '../consts';
import { MessagingAppConfig } from '../index';
import useUpdatePreference from '../useUpdatePreference';
import analytics from '../../../services/analytics';
import { Web2ChannelLower } from 'context/UserContext/const';
import { GetUserQuery } from 'context/UserContext/operations.generated';
import { PartnerInfoQuery } from 'context/ChannelContext/operations.generated';
import Flex from 'components/layout/Flex';
import Text from 'components/Text';
import Switch from 'components/Switch';
import PreferenceBell from 'components/Preferences/components/PreferenceBell';

type PropsT = {
  userPref?: GetUserQuery['user']['preferences'][0];
  category: PartnerInfoQuery['partnerInfo']['messageCategories'][0];
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

const PreferenceCategoryItem = ({ userPref, category, messagingAppConfig }: PropsT) => {
  const updatePreference = useUpdatePreference();

  const handlePrefClick = (pref: Web2ChannelLower | 'enabled') => {
    updatePreference(category.id, pref, userPref);

    const analyticsData = { category: category.name, categoryId: category.id };
    pref === 'enabled'
      ? analytics.track('preference toggled', {
          ...analyticsData,
          newState: userPref?.enabled ? 'disabled' : 'enabled',
        })
      : analytics.track('preference destination updated', {
          ...analyticsData,
          app: pref,
          enabled: !userPref?.[pref],
        });
  };

  return (
    <Flex alignItems={'center'} mb={1}>
      <PreferenceCategory>
        <Flex width={105}>
          <Text size={'sm'}>{category.name}</Text>
        </Flex>

        <Flex width={32} alignItems={'center'} pl={1} pr={1}>
          <Switch checked={!!userPref?.enabled} onChange={() => handlePrefClick('enabled')} />
        </Flex>
      </PreferenceCategory>

      {userPref?.enabled && (
        <Flex width={PREFERENCES_WIDTH} gap={1} justifyContent={'end'}>
          {messagingAppConfig.map(({ app, enabled }) => (
            <Flex
              key={`${app}${category.id}`}
              width={PREFERENCES_WIDTH / 3}
              justifyContent={'center'}
            >
              <PreferenceBell
                disabled={!enabled}
                selected={userPref?.[app.toLowerCase() as Web2ChannelLower] || false}
                onClick={() => handlePrefClick(app.toLowerCase() as Web2ChannelLower)}
              />
            </Flex>
          ))}
        </Flex>
      )}
    </Flex>
  );
};

export default PreferenceCategoryItem;
