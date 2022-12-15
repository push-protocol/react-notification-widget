import React from 'react';
import { Routes, useRouterContext } from 'context/RouterContext';
import Button from 'components/Button';

const NavbarActions = () => {
  const { setRoute } = useRouterContext();

  const handleGoBack = () => {
    setRoute(Routes.NotificationsFeed);
  };

  return (
    <Button variant={'gray'} fontSize={'sm'} p={1} borderRadius={'sm'} onClick={handleGoBack}>
      Done
    </Button>
  );
};

export default NavbarActions;
