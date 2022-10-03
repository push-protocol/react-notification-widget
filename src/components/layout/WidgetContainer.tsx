import React, { ReactNode } from 'react';
import styled from 'styled-components';
import Flex from './Flex';
import Text from 'components/Text';
import Link from 'components/Link';

const POWERED_BY_HEIGHT = '20px';

const LayoutContainer = styled.div(({ theme }) => ({
  [`@media (max-width: ${theme.breakpoints.mobile}px)`]: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    borderRadius: 0,
  },
  width: '350px',
  boxSizing: 'border-box',
  minHeight: '250px',
  overflowY: 'auto',
  borderRadius: theme.borderRadius.md,
  boxShadow: '0 20px 36px rgba(0, 0, 0, 0.25)',
  backgroundColor: theme.colors.bg.main,
  color: theme.colors.text.primary,
  padding: '18px 18px 8px 18px',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
}));

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
        <Text size={'sm'} color={'secondary'} opacity={0.8} weight={500}>
          Powered by
        </Text>
        <Link src={'https://faq.wherever.to'}>
          <Text size={'sm'} opacity={0.8} weight={600} ml={0.4} color={'secondary'}>
            Wherever
          </Text>
        </Link>
      </PoweredBy>
    </LayoutContainer>
  );
};
