import React from 'react';
import styled from 'styled-components';
import { FAQ_URL } from 'global/const';
import Text from 'components/Text';
import Link from 'components/Link';
import { useChannelContext } from 'context/ChannelContext';

const Container = styled.div`
  text-align: center;
  line-height: 22px;
`;

const ConnectDescription = ({ text }: { text: string }) => {
  const { name } = useChannelContext();

  return (
    <Container>
      <Text size={'md'}>
        {name} {text} <Link src={FAQ_URL}>Learn more.</Link>
      </Text>
    </Container>
  );
};

export default ConnectDescription;
