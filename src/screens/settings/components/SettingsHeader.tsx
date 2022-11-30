import React from 'react';
import styled, { useTheme } from 'styled-components';
import { SettingsViews } from 'screens/settings/index';
import { Bell } from 'components/icons';
import PageTitle from 'components/PageTitle';
import Text from 'components/Text';
import Flex from 'components/layout/Flex';
import { useChannelContext } from 'context/ChannelContext';

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

const HeaderImage = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 100px;
  background: ${({ theme }) => theme.colors.primary.main};
`;

const SettingsHeader = ({ view }: { view: SettingsViews }) => {
  const { name, icon } = useChannelContext();
  const theme = useTheme();

  if (view === SettingsViews.SUBSCRIBE_ONLY_COMPLETED) {
    return (
      <Header justifyContent={'center'} alignItems={'center'} direction={'column'} mb={2}>
        <HeaderIconContainer size={58}>
          <HeaderImage src={icon} alt={'channel icon'} />
        </HeaderIconContainer>
        <PageTitle mb={1} align={'center'}>
          You are subscriberd to {name}!
        </PageTitle>
      </Header>
    );
  }

  return (
    <Header justifyContent={'center'} alignItems={'center'} direction={'column'} mb={2} mt={-2}>
      <HeaderIconContainer>
        <HeaderIcon>
          <Bell color={theme.colors.button.text} />
        </HeaderIcon>
      </HeaderIconContainer>
      <PageTitle mb={1}>Set Up Notifications</PageTitle>
      <Text size={'md'} weight={500} mb={0.5} align={'center'}>
        Choose one or more channels to receive alerts when new messages hit your wallet.
      </Text>
    </Header>
  );
};

export default SettingsHeader;
