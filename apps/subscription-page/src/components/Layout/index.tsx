import { Outlet } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';
import { Footer } from '../Footer';

export const Layout = () => {
  return (
    <Flex
      flexDirection={'column'}
      width={'100%'}
      minH={'100vh'}
      boxSizing={'border-box'}
      bg={'blackAlpha.200'}
    >
      <Flex height={'20px'} />
      <Flex width={'100%'} flex={1} minH={500}>
        <Outlet />
      </Flex>
      <Footer />
    </Flex>
  );
};
