import React from 'react';
import { CenteredContainer } from 'components/layout/CenteredContainer';
import Flex from 'components/layout/Flex';
import { useRouterContext } from 'context/RouterContext';
import Spinner from 'components/Spinner';
import Button from 'components/Button';
import Text from 'components/Text';

export const Auth = () => {
  const { isLoading, error, login } = useRouterContext();

  const handleLogin = () => {
    login();
  };

  return (
    <CenteredContainer>
      {isLoading && (
        <Flex alignItems={'center'} justifyContent={'center'}>
          <Spinner></Spinner>
        </Flex>
      )}
      {error && (
        <Flex justifyContent="center" alignItems="center" gap={1}>
          <Text>Error logging in</Text>
          <div>
            <Button onClick={handleLogin}>Try Again</Button>
          </div>
        </Flex>
      )}
    </CenteredContainer>
  );
};
