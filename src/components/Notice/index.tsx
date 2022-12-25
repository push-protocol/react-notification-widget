import React from 'react';
import styled from 'styled-components';
import { mode } from '../../theme';
import Flex from 'components/layout/Flex';
import Text from 'components/Text';

const NoticeContainer = styled(Flex)`
  align-self: start;
  justify-content: center;
  width: 100%;
  color: ${({ theme }) => mode(theme.colors.gray[50], theme.colors.gray[300])};
`;

const Notice = ({ text }: { text: string }) => (
  <NoticeContainer>
    <Flex gap={0.5} alignItems={'start'}>
      <Text size={'sm'} color={'inherit'} opacity={0.8} weight={500} align={'center'}>
        {text}
      </Text>
    </Flex>
  </NoticeContainer>
);

export default Notice;
