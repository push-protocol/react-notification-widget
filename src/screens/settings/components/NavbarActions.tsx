import React from 'react';
import { SettingsViews } from 'screens/settings/index';
import { Routes, useRouterContext } from 'context/RouterContext';
import Button from 'components/Button';

const NavbarActions = ({ view }: { view: SettingsViews }) => {
  const { setRoute } = useRouterContext();

  const handleSkip = () => {
    setRoute(Routes.NotificationsFeed);
  };

  const renderView = {
    [SettingsViews.ONBOARDING]: (
      <Button variant={'gray'} fontSize={'sm'} p={1} borderRadius={'sm'} onClick={handleSkip}>
        Skip
      </Button>
    ),
    [SettingsViews.DEFAULT]: (
      <Button variant={'gray'} fontSize={'sm'} p={1} borderRadius={'sm'} onClick={handleSkip}>
        Back
      </Button>
    ),
    [SettingsViews.SUBSCRIBE_ONLY]: null,
    [SettingsViews.SUBSCRIBE_ONLY_COMPLETED]: null,
  };

  return renderView[view];
};

export default NavbarActions;
