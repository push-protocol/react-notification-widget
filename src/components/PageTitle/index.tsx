import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import Text, { TextProps } from 'components/Text';

const Wrapper = styled(Text)`
  text-transform: ${({ theme }) => (theme.uppercasePageTitles ? 'uppercase' : undefined)};
  font-weight: 700;
`;

const PageTitle = (props: PropsWithChildren<TextProps>) => (
  <Wrapper size={'xl'} {...props}>
    {props.children}
  </Wrapper>
);
export default PageTitle;
