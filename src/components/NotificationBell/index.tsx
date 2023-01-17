import React from 'react';
import styled from 'styled-components';
import useUnreadCount from '../../hooks/useUnreadCount';
import { useEnvironment } from '../../context/EnvironmentContext';
import { useAuthContext } from '../../context/AuthContext';
import { useAccountContext } from '../../context/AccountContext';
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

const NotificationDot = styled.div<{ size?: number }>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  border-radius: 50%;
  ${({ size }) => ({
    height: `${18 || size}px`,
    width: `${18 || size}px`,
  })}
  color: ${({ theme }) => theme.w.colors.notificationDot?.text || theme.w.colors.light[80]};
  background-color: ${({ theme }) =>
    theme.w.colors.notificationDot?.background || theme.w.colors.error.main};
  top: -6px;
  right: -6px;
`;

export type NotificationBellProps = {
  size?: number;
};

// any to avoid exposing props to consumers of the component (parent injects onClick and unreadCount)
const NotificationBell = (props: NotificationBellProps & any) => {
  const unreadCount = useUnreadCount();
  const { isConnected } = useAccountContext();
  const { isSubscribed, isLoading: authLoading } = useAuthContext();

  const { isSubscribeOnlyMode } = useEnvironment();

  return (
    <Container onClick={props.onClick}>
      <BellContainer size={props.size}>
        <Bell />
        {!!unreadCount && !isSubscribeOnlyMode && (
          <NotificationDot>{unreadCount > 9 ? '9+' : unreadCount}</NotificationDot>
        )}
        {isConnected && isSubscribed === false && !authLoading && <NotificationDot size={12} />}
      </BellContainer>
    </Container>
  );
};

export default NotificationBell;
