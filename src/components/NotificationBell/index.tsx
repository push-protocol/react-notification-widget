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

const BellContainer = styled.div`
  width: 20px;
  height: 24px;
  display: flex;
`;

type NotificationBellProps = {
  onClick?: () => void;
};

// eslint-disable-next-line react/display-name
const NotificationBell = (props: NotificationBellProps) => {
  const isNew = false;
  const hasNotifications = false;

  return (
    <Container onClick={props.onClick}>
      {isNew && <NewTagBadge />}
      <BellContainer>{hasNotifications && !isNew ? <BellBadge /> : <Bell />}</BellContainer>
    </Container>
  );
};

export default NotificationBell;
