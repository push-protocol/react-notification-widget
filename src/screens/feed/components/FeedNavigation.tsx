import React from 'react';
import styled from 'styled-components';
import Flex from 'components/layout/Flex';
import Text from 'components/Text';
import { Boxes } from 'components/icons';

const NavigationItem = styled.div<{ padding?: number; isActive?: boolean }>`
  height: 36px;
  border-radius: 40px;
  padding: ${({ theme, padding }) => theme.spacing(padding || 1)}px;
  gap: ${({ theme }) => theme.spacing(1)}px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  cursor: pointer;
  ${({ isActive, theme }) =>
    isActive &&
    `
      background: ${theme.colors.gray[500]};
  `}
`;

const ClientFeedIcon = styled.div`
  height: 24px;
  width: 24px;
  border-radius: 100px;
  overflow: hidden;
`;

const AllFeedIcon = styled.div`
  height: 16px;
  width: 16px;
`;

export enum NavigationTabs {
  client,
  all,
}

interface FeedNavigationProps {
  active: NavigationTabs;
  setActive(active: NavigationTabs): void;
}

const FeedNavigation = ({ active, setActive }: FeedNavigationProps) => {
  return (
    <Flex width={'100%'} mb={2} gap={1.3}>
      <NavigationItem
        isActive={active === NavigationTabs.client}
        onClick={() => {
          setActive(NavigationTabs.client);
        }}
      >
        <ClientFeedIcon>
          <Boxes />
        </ClientFeedIcon>
        <Text>Shapeshift</Text>
      </NavigationItem>
      <NavigationItem
        padding={2}
        isActive={active === NavigationTabs.all}
        onClick={() => {
          setActive(NavigationTabs.all);
        }}
      >
        <AllFeedIcon>
          <Boxes />
        </AllFeedIcon>
        <Text>All</Text>
      </NavigationItem>
    </Flex>
  );
};

export default FeedNavigation;
