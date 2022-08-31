import React from 'react';
import styled from 'styled-components';
import Text from 'components/Text';
import Link from 'components/Link';

const Container = styled.div`
  text-align: center;
  line-height: 22px;
`;

const SubscribeDescription = () => {
  return (
    <Container>
      <Text size={'md'} weight={500}>
        Shapeshift is using the Ethereum Push Notifications protocol to securly message its users.
        No spam, opt-out at any time. <Link url={'externalurl.com'}>Learn more.</Link>
      </Text>
    </Container>
  );
};

export default SubscribeDescription;
