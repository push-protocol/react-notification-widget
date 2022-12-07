import React from 'react';
import styled, { useTheme } from 'styled-components';
import { Bell } from 'components/icons';
import PageTitle from 'components/PageTitle';
import Text from 'components/Text';
import Flex from 'components/layout/Flex';

const Header = styled(Flex)`
  pointer-events: none;
`;

const HeaderIconContainer = styled.div<{ size?: number }>`
  height: ${({ size }) => size || 40}px;
  width: ${({ size }) => size || 40}px;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.primary.main};
  margin-bottom: ${({ theme }) => theme.spacing(1.5)}px;
`;

const HeaderIcon = styled.div`
  height: 24px;
  width: 24px;
  border-radius: 100px;
  background: ${({ theme }) => theme.colors.primary.main};
`;

const SettingsHeader = () => {
  const theme = useTheme();

  return (
    <Header justifyContent={'center'} alignItems={'center'} direction={'column'} mb={2}>
      <HeaderIconContainer>
        <HeaderIcon>
          <Bell color={theme.colors.button.text} />
        </HeaderIcon>
      </HeaderIconContainer>
      <PageTitle mb={1}>Settings</PageTitle>
      <Text size={'md'} weight={500} mb={0.5} align={'center'}>
        Choose one or more channels to receive alerts when new messages hit your wallet.
      </Text>
    </Header>
  );
};

export default SettingsHeader;
