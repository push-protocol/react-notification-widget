import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { Flex } from '@chakra-ui/react';

export const Header = () => {
  const { isConnected } = useAccount();

  return isConnected ? (
    <Flex margin={3} justifyContent={'flex-end'}>
      <ConnectButton />
    </Flex>
  ) : (
    <Flex />
  );
};
