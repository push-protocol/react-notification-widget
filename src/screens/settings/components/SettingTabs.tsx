import React from 'react';
import styled from 'styled-components';
import Flex from '../../../components/layout/Flex';
import Text from '../../../components/Text';
import { SettingsTabNames } from '../types';

const TabButton = styled.div<{ selected?: boolean }>`
  cursor: pointer;
  padding-bottom: 16px;
  margin-bottom: 16px;
  margin-top: 16px;
  ${({ theme, selected }) => ({
    borderBottom: selected ? `2px solid ${theme.w.colors.primary.main}` : '2px solid transparent',
  })}

  ${Text} {
    ${({ theme, selected }) => ({
      color: selected ? theme.w.colors.text.primary : theme.w.colors.text.secondary,
    })}
  }
`;

type PropsT = {
  selectedTab: SettingsTabNames;
  onTabSwitch: (tab: SettingsTabNames) => void;
};

const SettingTabs = (props: PropsT) => {
  return (
    <Flex gap={2}>
      <TabButton
        onClick={() => props.onTabSwitch(SettingsTabNames.Passport)}
        selected={props.selectedTab === SettingsTabNames.Passport}
      >
        <Text>My Passport</Text>
      </TabButton>
      <TabButton
        onClick={() => props.onTabSwitch(SettingsTabNames.Discover)}
        selected={props.selectedTab === SettingsTabNames.Discover}
      >
        <Text>Discover</Text>
      </TabButton>
    </Flex>
  );
};

export default SettingTabs;
