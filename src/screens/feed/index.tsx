import React, { useState } from 'react';
import styled from 'styled-components';
import Text from 'components/Text';
import { Settings } from 'components/icons';
import Flex from 'components/layout/Flex';
import FeedNavigation, { NavigationTabs } from 'screens/feed/components/FeedNavigation';
import NotificationFeed from 'screens/feed/components/NotificationFeed';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

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
  const [activeTab, setActiveTab] = useState(NavigationTabs.client);

  return (
    <Container>
      <Flex justifyContent={'space-between'} width={'100%'} mb={2}>
        <Text size={'xl'} weight={700}>
          Notifications
        </Text>
        <SettingsIcon>
          <Settings />
        </SettingsIcon>
      </Flex>
      <FeedNavigation active={activeTab} setActive={setActiveTab} />
      <NotificationFeed active={activeTab} />
    </Container>
  );
};
