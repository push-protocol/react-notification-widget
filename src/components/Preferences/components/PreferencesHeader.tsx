import React from 'react';
import styled from 'styled-components';
import { useChannelContext } from 'context/ChannelContext';
import Text from 'components/Text';
import HeaderChannelItem from 'components/Preferences/components/HeaderChannelItem';
import { MessagingApp } from 'global/types.generated';
import { MessagingAppInfo } from 'context/UserContext/const';

const HeaderContainer = styled.div`
  display: flex;
  padding-bottom: 8px;
  margin-bottom: 8px;
  border-bottom: 1px solid;
  border-color: ${({ theme }) => theme.colors.light[10]};
`;

const ProfileInfo = styled.div`
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
  gap: 15px;
  display: flex;
  align-items: center;
  width: 176px;
  justify-content: center;
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
  userChannels,
}: {
  hideChannelInfo?: boolean;
  userChannels: MessagingApp[];
}) => {
  const { icon, name } = useChannelContext();

  return (
    <HeaderContainer>
      <ProfileInfo>
        {!hideChannelInfo && (
          <>
            <ChannelIconContainer>
              <Image src={icon} alt={'channel icon'} />
            </ChannelIconContainer>
            <Text>{name}</Text>
          </>
        )}
      </ProfileInfo>
      <Channels>
        {userChannels.map((channel) => {
          return (
            <HeaderChannelItem
              key={channel}
              icon={MessagingAppInfo[channel].icon}
              title={MessagingAppInfo[channel].title}
            />
          );
        })}
      </Channels>
    </HeaderContainer>
  );
};

export default PreferencesHeader;
