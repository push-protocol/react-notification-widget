import React from 'react';
import styled from 'styled-components';
import { mode } from '../../theme';
import Flex, { FlexProps } from '../layout/Flex';
import Text from '../Text';

const NoticeContainer = styled(Flex)`
  align-self: start;
  justify-content: center;
  width: 100%;
  color: ${({ theme }) => mode(theme.w.colors.gray[50], theme.w.colors.gray[300])};
`;

const Notice = ({ text, ...rest }: { text: string } & FlexProps) => (
  <NoticeContainer {...rest}>
    <Text size={'md'} color={'inherit'} opacity={0.8} weight={500} align={'center'}>
      {text}
    </Text>
  </NoticeContainer>
);

export default Notice;
