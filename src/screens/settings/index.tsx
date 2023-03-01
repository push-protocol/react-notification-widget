import React, { useState } from 'react';
import { useEnvironment } from '../../context/EnvironmentContext';
import NavbarActions from './components/NavbarActions';
import SettingsHeader from './components/SettingsHeader';
import SettingTabs from './components/SettingTabs';
import { SettingsTabNames } from './types';
import PassportTab from './components/PassportTab';
import DiscoverTab from './components/DiscoverTab';
import { useChannelContext } from 'context/ChannelContext';
import Flex from 'components/layout/Flex';
import { Screen } from 'components/layout/Screen';

export const Settings = () => {
  const { icon } = useChannelContext();
  const { isSubscribeOnlyMode } = useEnvironment();

  const [activeTab, setActiveTab] = useState(SettingsTabNames.Passport);

  const tabMap = {
    [SettingsTabNames.Discover]: <DiscoverTab />,
    [SettingsTabNames.Passport]: <PassportTab />,
  };

  return (
    <Screen navbarActionComponent={<NavbarActions />} mb={1}>
      <Flex mt={-5} mb={2}>
        <SettingsHeader icon={icon} />
      </Flex>

      {isSubscribeOnlyMode && <SettingTabs selectedTab={activeTab} onTabSwitch={setActiveTab} />}

      {tabMap[activeTab]}
    </Screen>
  );
};
