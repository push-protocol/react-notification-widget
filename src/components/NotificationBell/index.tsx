import React from 'react';
import styled from 'styled-components';
import { Bell, BellBadge } from 'components/icons';
import NewTag from 'components/NewTag';
import { renderStringNumValue } from 'components/utils';

const NewTagBadge = styled(NewTag)`
  width: 23px;
  height: 11px;
  font-size: 9px;
  position: absolute;
  top: -2px;
`;

const Container = styled.div<{ height: string | number; width: string | number }>`
  position: relative;
  cursor: pointer;
  height: ${({ height }) => renderStringNumValue(height)};
  width: ${({ width }) => renderStringNumValue(width)};
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
  containerHeight?: string | number;
  containerWidth?: string | number;
};

// any to avoid exposing props to consumers of the component (parent injects onClick)
const NotificationBell = (props: NotificationBellProps & any) => {
  const isNew = false;
  const hasNotifications = false;

  return (
    <Container
      onClick={props.onClick}
      height={props.containerHeight || '40px'}
      width={props.containerWidth || '40px'}
    >
      {isNew && <NewTagBadge />}
      <BellContainer size={props.size}>
        {hasNotifications && !isNew ? <BellBadge /> : <Bell />}
      </BellContainer>
    </Container>
  );
};

export default NotificationBell;
