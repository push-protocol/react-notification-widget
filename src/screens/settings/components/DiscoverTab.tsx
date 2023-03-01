import { useTheme } from 'styled-components';
import { Users } from '../../../components/icons';
import Flex from 'components/layout/Flex';
import { mode } from 'theme';
import Button from 'components/Button';
import Text from 'components/Text';

const channels = [
  {
    icon: 'https://avatars.githubusercontent.com/u/102358895?s=200&v=4',
    name: 'EPNS',
    description: 'Lorem ipsum description of the kings really good to  know about this channel',
    subCount: '12',
    isSubscribed: false,
  },
  {
    icon: 'https://pbs.twimg.com/profile_images/1526963356799668224/C64XFkk4_400x400.jpg',
    name: 'AAVE',
    description: 'Lorem ipsum description of the kings really good to  know about this channel',
    subCount: '12',
    isSubscribed: false,
  },
  {
    icon: '',
    name: 'UNI',
    description: 'Lorem ipsum description of the kings really good to  know about this channel',
    subCount: '12',
    isSubscribed: false,
  },
  {
    icon: '',
    name: 'Snapshot',
    description: 'Lorem ipsum description of the kings really good to  know about this channel',
    subCount: '12',
    isSubscribed: false,
  },
];

const DiscoverTab = () => {
  const {
    w: { colors },
  } = useTheme();

  return (
    <Flex direction={'column'} gap={2}>
      {channels.map((channel) => (
        <Flex
          alignItems={'center'}
          br={'md'}
          gap={2}
          key={channel.name}
          p={2}
          bg={mode(colors.light[10], colors.dark[10])}
        >
          <img src={channel.icon} width={40} height={40} style={{ borderRadius: 15 }} />
          <Flex direction={'column'}>
            <Text>{channel.name}</Text>
            <Text>{channel.description}</Text>
          </Flex>
          <Flex direction={'column'} alignItems={'center'}>
            <Flex alignItems={'center'} gap={0.5}>
              <Flex height={24} width={24}>
                <Users color={colors.text.secondary} />
              </Flex>
              <Text color={'secondary'}>{channel.subCount}K</Text>
            </Flex>

            <Button>Subscribe</Button>
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};

export default DiscoverTab;
