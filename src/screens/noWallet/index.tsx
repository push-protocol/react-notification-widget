import React from 'react';
import styled from 'styled-components';
import Button from 'components/Button';
import Text from 'components/Text';
import { Check } from 'components/icons';
import Flex from 'components/layout/Flex';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeaderIconContainer = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.gray.darker};
  margin-bottom: ${({ theme }) => theme.spacing(1.5)}px;
`;

const HeaderIcon = styled.div`
  height: 24px;
  width: 24px;
  border-radius: 100px;
`;

const StyledText = styled(Text)`
  color: ${({ theme }) => theme.colors.gray.darker};
`;

export const NoWallet = () => {
  return (
    <Container>
      <Flex justifyContent={'center'} alignItems={'center'} direction={'column'} mb={8} mt={3}>
        <HeaderIconContainer>
          <HeaderIcon>
            <Check />
          </HeaderIcon>
        </HeaderIconContainer>
        <StyledText size={'xl'} weight={700} mb={0.5}>
          Wallet not connected
        </StyledText>
      </Flex>
      <Flex width={'100%'}>
        <Button>Connect Wallet</Button>
      </Flex>
    </Container>
  );
};
