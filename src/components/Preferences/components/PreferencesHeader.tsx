import React from 'react';
import styled from 'styled-components';
import { adjustColor } from 'components/utils';
import { useChannelContext } from 'context/ChannelContext';
import Text from 'components/Text';
import { Discord, Email, Telegram } from 'components/icons';
import HeaderChannelItem from 'components/Preferences/components/HeaderChannelItem';

const HeaderContainer = styled.div`
  display: flex;
  padding-bottom: 8px;
  margin-bottom: 8px;
  border-bottom: 1px solid;
  border-color: ${({ theme }) => adjustColor(theme.colors.primary.main, 0.5)};
`;

const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
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
`;

const UserIconContainer = styled.div`
  height: 24px;
  width: 24px;
  flex-shrink: 0;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 100px;
`;

const PreferencesHeader = () => {
  const { icon, name } = useChannelContext();

  return (
    <HeaderContainer>
      <ProfileInfo>
        <UserIconContainer>
          <Image src={icon} alt={'channel icon'} />
        </UserIconContainer>
        <Text>{name} Protocol</Text>
      </ProfileInfo>
      <Channels>
        <HeaderChannelItem icon={<Discord />} title={'Discord'} />
        <HeaderChannelItem icon={<Email />} title={'Email'} />
        <HeaderChannelItem icon={<Telegram />} title={'Telegram'} />
      </Channels>
    </HeaderContainer>
  );
};

export default PreferencesHeader;
