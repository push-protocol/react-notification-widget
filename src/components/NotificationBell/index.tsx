import React from 'react';
import styled from 'styled-components';
import { Bell, BellBadge } from 'components/icons';
import NewTag from 'components/NewTag';

const NewTagBadge = styled(NewTag)`
  width: 23px;
  height: 11px;
  font-size: 9px;
  position: absolute;
  top: -2px;
`;

const Container = styled.div`
  position: relative;
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
`;

export type NotificationBellProps = {
  size?: number;
};

// any to avoid exposing props to consumers of the component (parent injects onClick)
const NotificationBell = (props: NotificationBellProps & any) => {
  const isNew = false;
  const hasNotifications = false;

  return (
    <Container onClick={props.onClick}>
      {isNew && <NewTagBadge />}
      <BellContainer size={props.size}>
        {hasNotifications && !isNew ? <BellBadge /> : <Bell />}
      </BellContainer>
    </Container>
  );
};

export default NotificationBell;
