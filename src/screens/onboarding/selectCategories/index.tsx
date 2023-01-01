import React from 'react';
import styled from 'styled-components';
import Flex from 'components/layout/Flex';
import { Screen } from 'components/layout/Screen';
import PageTitle from 'components/PageTitle';
import Button from 'components/Button';
import { Routes, useRouterContext } from 'context/RouterContext';
import Preferences from 'components/Preferences';
import { useUserContext } from 'context/UserContext';

const Header = styled.div`
  text-align: center;
  margin-bottom: 8px;
`;

export const SelectCategories = () => {
  const { user } = useUserContext();
  const { setRoute } = useRouterContext();

  const goNextDisabled = user?.preferences.every((pref) => !pref?.enabled);

  const handleGoNext = () => {
    setRoute(Routes.SelectApps);
    return;
  };

  return (
    <Screen mb={1}>
      <Header>
        <PageTitle mb={2}>What should we notify you about?</PageTitle>
      </Header>

      <Preferences appConfig={[]} />

      <Flex mb={2} mt={2} width={'100%'}>
        <Button size={'lg'} width={'100%'} onClick={handleGoNext} disabled={goNextDisabled}>
          Next
        </Button>
      </Flex>
    </Screen>
  );
};
