import React from 'react';
import styled from 'styled-components';
import { useChannelContext } from '../../../context/ChannelContext';
import { useEnvironment } from '../../../context/EnvironmentContext';
import Text from '../../../components/Text';
import PageTitle from '../../../components/PageTitle';
import Flex from '../../../components/layout/Flex';

const HeaderIconContainer = styled.div<{ size?: number }>`
  height: ${({ size }) => size || 40}px;
  width: ${({ size }) => size || 40}px;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.w.colors.primary.main};
  margin-bottom: ${({ theme }) => theme.w.spacing(1.5)}px;
`;

const HeaderImage = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 100px;
  background: ${({ theme }) => theme.w.colors.primary.main};
`;

const SettingsHeader = ({ icon }: { icon: string }) => {
  const { name } = useChannelContext();
  const { isSubscribeOnlyMode } = useEnvironment();

  return (
    <Flex justifyContent={'center'} alignItems={'center'} direction={'column'}>
      <HeaderIconContainer size={58}>
        <HeaderImage src={icon} alt={'channel icon'} />
      </HeaderIconContainer>
      <PageTitle mb={1} align={'center'}>
        {isSubscribeOnlyMode ? name : 'Notification Settings'}
      </PageTitle>
      {isSubscribeOnlyMode && <Text>Notification Settings</Text>}
    </Flex>
  );
};

export default SettingsHeader;
