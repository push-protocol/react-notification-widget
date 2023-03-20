import { Text, Center, Link } from '@chakra-ui/react';

export const Footer = () => {
  return (
    <Center
      whiteSpace={'pre'}
      marginY={2}
      fontWeight={'medium'}
      color={'text.primary'}
      fontSize={'md'}
    >
      Powered by{' '}
      <Link color={'white'} href={'https://wherever.to'}>
        <Text fontWeight={'bold'}>Wherever</Text>
      </Link>
    </Center>
  );
};
