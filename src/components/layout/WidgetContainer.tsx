import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { SCREEN_SIZES } from '../../global/const';
import Flex from './Flex';
import Text from 'components/Text';

const POWERED_BY_HEIGHT = '20px';

const LayoutContainer = styled.div`
  @media (max-width: ${SCREEN_SIZES.mobile}px) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    border-radius: 0;
  }
  width: 350px;
  box-sizing: border-box;
  min-height: 250px;
  overflow-y: auto;
  border-radius: ${(props) => props.theme.borderRadius.md};
  border: 2px solid ${(props) => props.theme.colors.border.main};
  box-shadow: 0 20px 36px rgba(0, 0, 0, 0.25);
  background-color: ${(props) => props.theme.colors.bg.main};
  color: ${(props) => props.theme.colors.text.primary};
  padding: 16px 16px 8px 16px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const PoweredBy = styled(Flex)(({ theme }) => ({
  borderTop: `1px solid ${theme.colors.border.main}`,
  height: POWERED_BY_HEIGHT,
}));

const ChildrenContainer = styled.div`
  height: calc(100% - ${POWERED_BY_HEIGHT});
`;

interface LayoutProps {
  children: ReactNode;
}

export const WidgetContainer = ({ children }: LayoutProps) => {
  return (
    <LayoutContainer>
      <ChildrenContainer>{children}</ChildrenContainer>
      <PoweredBy pt={1} alignItems={'center'} justifyContent={'center'}>
        <Text size={'sm'} color={'secondary'} opacity={0.8}>
          Powered by
        </Text>
        <Text size={'sm'} fontFamily={"'Noto Serif Georgian'"} opacity={0.8} color={'secondary'}>
          ✨ Wherever
        </Text>
      </PoweredBy>
    </LayoutContainer>
  );
};
