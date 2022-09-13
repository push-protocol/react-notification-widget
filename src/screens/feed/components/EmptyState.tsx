import React from 'react';
import Text from '../../../components/Text';
import Flex from 'components/layout/Flex';

const EmptyState = (props: { show: boolean }) => {
  if (!props.show) return null;

  return (
    <Flex height={200} direction={'column'} alignItems={'center'} justifyContent={'center'}>
      <Text color={'secondary'} size={'lg'} align={'center'}>
        You have no notifications at the moment.
      </Text>
      <Text mt={1} color={'secondary'} size={'lg'} align={'center'}>
        Please check back later.
      </Text>
    </Flex>
  );
};

export default EmptyState;
