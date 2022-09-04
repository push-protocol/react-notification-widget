import React from 'react';
import styled from 'styled-components';
import Text from 'components/Text';
import Link from 'components/Link';
import { useChannelContext } from 'context/ChannelContext';

const Container = styled.div`
  text-align: center;
  line-height: 22px;
`;

const SubscribeDescription = () => {
  const { name } = useChannelContext();

  return (
    <Container>
      <Text size={'md'} weight={500}>
        {name} is using the Ethereum Push Notifications protocol to securly message its users. No
        spam, opt-out at any time. <Link url={'externalurl.com'}>Learn more.</Link>
      </Text>
    </Container>
  );
};

export default SubscribeDescription;
