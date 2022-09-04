import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { Bell, BellBadge } from 'components/icons';
import NewTag from 'components/NewTag';

const NewTagBadge = styled(NewTag)`
  width: 23px;
  height: 11px;
  font-size: 9px;
  position: absolute;
  top: -2px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.bell.background};
`;

const Container = styled.div`
  position: relative;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.bell.background};
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background: ${({ theme }) => theme.colors.bell.hoverBackground};
  }
  &:hover ${NewTagBadge} {
    border-bottom: 2px solid ${({ theme }) => theme.colors.bell.hoverBackground};
  }
`;

const BellContainer = styled.div`
  width: 20px;
  height: 24px;
  display: flex;
`;

type NotificationBellProps<T> = {
  setOpen: (cb: (value: T) => T) => void;
};

// eslint-disable-next-line react/display-name
const NotificationBell = forwardRef<HTMLDivElement, NotificationBellProps<boolean>>(
  ({ setOpen }: NotificationBellProps<boolean>, ref) => {
    const isNew = false;
    const hasNotifications = true;

    return (
      <Container ref={ref} onClick={() => setOpen((prevState) => !prevState)}>
        {isNew && <NewTagBadge />}
        <BellContainer>{hasNotifications && !isNew ? <BellBadge /> : <Bell />}</BellContainer>
      </Container>
    );
  }
);

export default NotificationBell;
