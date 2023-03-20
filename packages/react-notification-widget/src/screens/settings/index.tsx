import React, { useState, useMemo } from "react";
import { useEnvironment } from "../../context/EnvironmentContext";
import { useUserContext } from "../../context/UserContext";
import NavbarActions from "./components/NavbarActions";
import SettingsHeader from "./components/SettingsHeader";
import SettingTabs from "./components/SettingTabs";
import { SettingsTabNames } from "./types";
import PassportTab from "./components/PassportTab";
import DiscoverTab from "./components/DiscoverTab";
import useUserEpnsSubscriptions from "./hooks/useUserEpnsSubscriptions";
import Flex from "components/layout/Flex";
import { Screen } from "components/layout/Screen";

export const Settings = (props: { activeTab?: SettingsTabNames }) => {
  const { userAddress } = useUserContext();
  const { isSubscribeOnlyMode } = useEnvironment();

  const [activeTab, setActiveTab] = useState(
    props.activeTab || SettingsTabNames.Passport
  );
  const subData = useUserEpnsSubscriptions();

  const tabMap = useMemo(
    () => ({
      [SettingsTabNames.Discover]: <DiscoverTab {...subData} />,
      [SettingsTabNames.Passport]: <PassportTab />,
    }),
    [subData]
  );

  return (
    <Screen navbarActionComponent={<NavbarActions />} mb={1}>
      <Flex mt={-5} mb={2}>
        <SettingsHeader
          icon={`https://api.dicebear.com/5.x/identicon/svg?seed=${userAddress}`}
        />
      </Flex>

      {isSubscribeOnlyMode && (
        <SettingTabs selectedTab={activeTab} onTabSwitch={setActiveTab} />
      )}

      {tabMap[activeTab]}
    </Screen>
  );
};
