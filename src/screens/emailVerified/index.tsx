import React from 'react';
import styled from 'styled-components';
import { CenteredContainer } from 'components/layout/CenteredContainer';
import Button from 'components/Button';
import Text from 'components/Text';
import { Check } from 'components/icons';
import Flex from 'components/layout/Flex';

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
    <CenteredContainer>
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
    </CenteredContainer>
  );
};
