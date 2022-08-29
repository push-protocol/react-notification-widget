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
  height: 40px;
  width: 40px;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.primary.dark};
  margin-bottom: ${({ theme }) => theme.spacing(1.5)}px;
`;

const HeaderIcon = styled.div`
  height: 24px;
  width: 24px;
  border-radius: 100px;
`;

export const EmailVerified = () => {
  return (
    <Container>
      <Flex justifyContent={'center'} alignItems={'center'} direction={'column'} mb={8} mt={3}>
        <HeaderIconContainer>
          <HeaderIcon>
            <Check />
          </HeaderIcon>
        </HeaderIconContainer>
        <Text size={'xl'} weight={700} mb={0.5}>
          Email verified sucessfully
        </Text>
      </Flex>
      <Flex width={'100%'} mb={3}>
        <Button>Continue</Button>
      </Flex>
    </Container>
  );
};
