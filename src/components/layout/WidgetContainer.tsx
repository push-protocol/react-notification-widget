import React, { ReactNode } from 'react';
import styled from 'styled-components';
import Flex from './Flex';
import Text from 'components/Text';
import Link from 'components/Link';
import { FAQ_URL } from 'global/const';
import { changeColorShade } from 'components/utils';

const POWERED_BY_HEIGHT = '40px';

const LayoutContainer = styled.div(({ theme }) => ({
  [`@media (max-width: ${theme.breakpoints.mobile}px)`]: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    borderRadius: 0,
    zIndex: 999,
  },
  width: '350px',
  boxSizing: 'border-box',
  minHeight: '250px',
  overflowY: 'auto',
  borderRadius: theme.borderRadius.md,
  boxShadow: '0 20px 36px rgba(0, 0, 0, 0.25)',
  backgroundColor: theme.colors.bg.main,
  color: theme.colors.text.primary,
  '&::-webkit-scrollbar': {
    display: 'none',
  },
}));

const PoweredBy = styled(Flex)`
  height: ${POWERED_BY_HEIGHT};
  font-family: 'Inter var', sans-serif;
  box-sizing: border-box;
  border-top: 1px solid ${({ theme }) => changeColorShade(theme.colors.bg.main, 20)};
  padding: 12px;
  backdrop-filter: brightness(0.85);
`;

const ChildrenContainer = styled.div`
  height: calc(100% - ${POWERED_BY_HEIGHT} - 8px);
  padding: 18px 18px 0 18px;
`;

interface LayoutProps {
  children: ReactNode;
}

export const WidgetContainer = ({ children }: LayoutProps) => {
  return (
    <LayoutContainer>
      <ChildrenContainer>{children}</ChildrenContainer>

      <PoweredBy pt={1} alignItems={'center'} justifyContent={'center'}>
        <Text size={'sm'} color={'secondary'} opacity={0.8} weight={500}>
          Powered by&nbsp;
        </Text>
        <Link src={FAQ_URL}>
          <Text size={'sm'} opacity={0.8} weight={600} color={'secondary'}>
            Wherever
          </Text>
        </Link>
      </PoweredBy>
    </LayoutContainer>
  );
};
