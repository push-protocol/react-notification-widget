import React from 'react';
import styled from 'styled-components';
import { mode } from '../../theme';
import Flex from '../layout/Flex';
import Text from '../Text';

const NoticeContainer = styled(Flex)`
  align-self: start;
  justify-content: center;
  width: 100%;
  color: ${({ theme }) => mode(theme.w.colors.gray[50], theme.w.colors.gray[300])};
`;

const Notice = ({ text }: { text: string }) => (
  <NoticeContainer>
    <Text size={'sm'} color={'inherit'} opacity={0.8} weight={500} align={'center'}>
      {text}
    </Text>
  </NoticeContainer>
);

export default Notice;
