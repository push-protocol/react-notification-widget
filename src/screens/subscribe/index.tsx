import React from 'react';
import styled from 'styled-components';
import Button from 'components/Button';
import Text from 'components/Text';
import NewTag from 'components/NewTag';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledNewTag = styled(NewTag)`
  margin-bottom: ${({ theme }) => theme.spacing(1)}px;
`;

export const Subscribe = () => {
  return (
    <Container>
      <div>
        <StyledNewTag />
        <Text size={'xl'}>Wallet-to-wallet notifications</Text>
      </div>
      <div>
        <Button>Subscribe</Button>
      </div>
    </Container>
  );
};
