import React from 'react';
import styled from 'styled-components';
import useUnreadCount from '../../hooks/useUnreadCount';
import { Bell } from 'components/icons';

const Container = styled.div`
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BellContainer = styled.div<{ size?: number }>`
  width: ${({ size }) => `${size || '24'}px`};
  height: ${({ size }) => `${size || '24'}px`};
  display: flex;
  position: relative;
`;

const NotificationDot = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  border-radius: 50%;
  height: 22px;
  width: 22px;
  color: ${({ theme }) => theme.colors.notificationDot?.text || theme.colors.button.text};
  background-color: ${({ theme }) =>
    theme.colors.notificationDot?.background || theme.colors.primary.main};
  top: -8px;
  right: -8px;
`;

export type NotificationBellProps = {
  size?: number;
};

// any to avoid exposing props to consumers of the component (parent injects onClick and unreadCount)
const NotificationBell = (props: NotificationBellProps & any) => {
  const unreadCount = useUnreadCount();

  return (
    <Container onClick={props.onClick}>
      <BellContainer size={props.size}>
        <Bell />
        {!!unreadCount && <NotificationDot>{unreadCount > 9 ? '9+' : unreadCount}</NotificationDot>}
      </BellContainer>
    </Container>
  );
};

export default NotificationBell;
