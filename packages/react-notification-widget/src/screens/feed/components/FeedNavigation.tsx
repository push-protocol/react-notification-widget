import React from "react";
import styled, { useTheme } from "styled-components";
import { mode } from "../../../theme";
import { useChannelContext } from "context/ChannelContext";
import Flex from "components/layout/Flex";
import Text from "components/Text";
import { Boxes } from "components/icons";

const NavigationItem = styled.div<{ isActive?: boolean }>`
  height: 36px;
  border-radius: 40px;
  padding: ${({ theme }) => theme.w.spacing(2)}px;
  gap: ${({ theme }) => theme.w.spacing(1)}px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  cursor: pointer;
  background: ${({ isActive, theme: { w } }) =>
    isActive && mode(w.colors.light[10], w.colors.dark[10])};
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

const AllFeedIconContainer = styled.div`
  height: 16px;
  width: 16px;
`;

export enum NavigationTabs {
  App,
  Other,
}

interface FeedNavigationProps {
  activeTab: NavigationTabs;
  setActiveTab(active: NavigationTabs): void;
}

const FeedNavigation = ({ activeTab, setActiveTab }: FeedNavigationProps) => {
  const { name, icon } = useChannelContext();
  const theme = useTheme();

  return (
    <Flex width={"100%"} mb={1} gap={1.5}>
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
        isActive={activeTab === NavigationTabs.Other}
        onClick={() => {
          setActiveTab(NavigationTabs.Other);
        }}
      >
        <AllFeedIconContainer>
          <Boxes color={theme.w.colors.text.primary} />
        </AllFeedIconContainer>
        <Text>Other</Text>
      </NavigationItem>
    </Flex>
  );
};

export default FeedNavigation;
