import React from 'react';
import styled from 'styled-components';
import { PREFERENCES_WIDTH } from '../consts';
import { MessagingAppConfig } from '../index';
import { useChannelContext } from '../../../context/ChannelContext';
import Text from '../../Text';
import HeaderChannelItem from '../../Preferences/components/HeaderChannelItem';
import { MessagingAppInfo } from '../../../context/UserContext/const';

const HeaderContainer = styled.div`
  display: flex;
  padding-bottom: 8px;
  margin-bottom: 8px;
  border-bottom: 1px solid;
  border-color: ${({ theme }) => theme.w.colors.light[10]};
`;

const ChannelInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex: 1;
  overflow: hidden;
  padding-right: 8px;
  ${Text} {
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const Channels = styled.div`
  height: 34px;
  display: flex;
  align-items: center;
  width: ${PREFERENCES_WIDTH}px;
  justify-content: flex-end;
  gap: 8px;
`;

const ChannelIconContainer = styled.div`
  height: 24px;
  width: 24px;
  flex-shrink: 0;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 100px;
`;

const PreferencesHeader = ({
  hideChannelInfo,
  appConfig,
}: {
  hideChannelInfo?: boolean;
  appConfig: MessagingAppConfig[];
}) => {
  const { icon, name } = useChannelContext();

  return (
    <HeaderContainer>
      <ChannelInfo>
        {!hideChannelInfo && (
          <>
            <ChannelIconContainer>
              <Image src={icon} alt={'channel icon'} />
            </ChannelIconContainer>
            <Text>{name}</Text>
          </>
        )}
      </ChannelInfo>
      <Channels>
        {appConfig.map(({ app }) => {
          return (
            <HeaderChannelItem
              key={app}
              icon={MessagingAppInfo[app].icon}
              title={MessagingAppInfo[app].title}
            />
          );
        })}
      </Channels>
    </HeaderContainer>
  );
};

export default PreferencesHeader;
