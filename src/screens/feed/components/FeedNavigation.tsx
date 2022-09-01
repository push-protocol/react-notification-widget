import React from 'react';
import styled from 'styled-components';
import Flex from 'components/layout/Flex';
import Text from 'components/Text';
import { Boxes } from 'components/icons';
import { useChannelContext } from 'context/ChannelContext';

const NavigationItem = styled.div<{ isActive?: boolean }>`
  height: 36px;
  border-radius: 40px;
  padding: ${({ theme }) => theme.spacing(2)}px;
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
  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
`;

const AllFeedIcon = styled.div`
  height: 16px;
  width: 16px;
`;

export enum NavigationTabs {
  App,
  All,
}

interface FeedNavigationProps {
  activeTab: NavigationTabs;
  setActiveTab(active: NavigationTabs): void;
}

const FeedNavigation = ({ activeTab, setActiveTab }: FeedNavigationProps) => {
  const { name, icon } = useChannelContext();

  return (
    <Flex width={'100%'} mb={2} gap={1.5}>
      <NavigationItem
        isActive={activeTab === NavigationTabs.App}
        onClick={() => {
          setActiveTab(NavigationTabs.App);
        }}
      >
        <ClientFeedIcon>
          <img src={icon} alt="channel icon" />
        </ClientFeedIcon>
        <Text>{name}</Text>
      </NavigationItem>
      <NavigationItem
        isActive={activeTab === NavigationTabs.All}
        onClick={() => {
          setActiveTab(NavigationTabs.All);
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
