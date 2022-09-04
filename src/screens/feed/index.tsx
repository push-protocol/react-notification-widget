import React, { useState } from 'react';
import styled from 'styled-components';
import { CenteredContainer } from 'components/layout/CenteredContainer';
import Text from 'components/Text';
import { Settings } from 'components/icons';
import Flex from 'components/layout/Flex';
import FeedNavigation, { NavigationTabs } from 'screens/feed/components/FeedNavigation';
import NotificationFeed from 'screens/feed/components/NotificationFeed';
import { Routes, useRouterContext } from 'context/RouterContext';

const SettingsIcon = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  color: ${({ theme }) => theme.colors.gray[100]};
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.gray[200]};
  }
`;

export const Feed = () => {
  const { setRoute } = useRouterContext();
  const [activeTab, setActiveTab] = useState(NavigationTabs.App);

  const handleViewSettings = () => {
    setRoute(Routes.Settings);
  };

  return (
    <CenteredContainer>
      <Flex justifyContent={'space-between'} width={'100%'} mb={2}>
        <Text size={'xl'} weight={700}>
          Notifications
        </Text>
        <SettingsIcon onClick={handleViewSettings}>
          <Settings />
        </SettingsIcon>
      </Flex>
      <FeedNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <NotificationFeed active={activeTab} />
    </CenteredContainer>
  );
};
