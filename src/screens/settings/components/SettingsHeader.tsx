import React from 'react';
import styled from 'styled-components';
import PageTitle from 'components/PageTitle';
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

const HeaderImage = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 100px;
  background: ${({ theme }) => theme.colors.primary.main};
`;

const SettingsHeader = ({ title, icon }: { title: string; icon: string }) => (
  <Header justifyContent={'center'} alignItems={'center'} direction={'column'} mb={2}>
    <HeaderIconContainer size={58}>
      <HeaderImage src={icon} alt={'channel icon'} />
    </HeaderIconContainer>
    <PageTitle mb={1} align={'center'}>
      {title}
    </PageTitle>
  </Header>
);

export default SettingsHeader;
