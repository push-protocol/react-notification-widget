import styled, { useTheme } from 'styled-components';
import { useChannelsDiscoveryQuery, ChannelsDiscoveryQuery } from '../operations.generated';
import { Users } from 'components/icons';
import Spinner from 'components/Spinner';
import Flex from 'components/layout/Flex';
import { mode } from 'theme';
import Button from 'components/Button';
import Text from 'components/Text';

const ChannelImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 15px;
  // chakra sets a max width, unset it here
  max-width: unset;
`;

type PropsT = {
  subscriptions: string[];
  addSubscription: (addr: string) => void;
  addSubscriptionLoading?: string;
};

const DiscoverTab = ({ addSubscription, subscriptions, addSubscriptionLoading }: PropsT) => {
  const {
    w: { colors },
  } = useTheme();

  const { data, loading } = useChannelsDiscoveryQuery();

  if (loading) {
    return (
      <Flex height={300} alignItems={'center'} justifyContent={'center'}>
        <Spinner />
      </Flex>
    );
  }

  const channels = data?.commsChannelDiscover as ChannelsDiscoveryQuery['commsChannelDiscover'];

  return (
    <Flex direction={'column'} gap={2}>
      {channels.map((channel) => {
        const subCount = getSubCount(channel.subscriberCount);
        const subCountText = subCount?.thousands ? `${subCount.count}K` : '< 1K';

        return (
          <Flex
            alignItems={'center'}
            justifyContent={'space-between'}
            br={'md'}
            gap={1}
            key={channel.name}
            pl={1}
            pr={1}
            pb={2}
            pt={2}
            bg={mode(colors.light[10], colors.dark[10])}
          >
            {channel.icon ? (
              <Flex mr={1} width={45}>
                <ChannelImg src={channel.icon} />
              </Flex>
            ) : (
              <Flex width={40} height={40} alignItems={'center'} justifyContent={'center'}>
                🏛
              </Flex>
            )}
            <Flex style={{ flexGrow: 1 }} direction={'column'}>
              <Text>
                <strong>{channel.name}</strong>
              </Text>
              <Text>{channel.description}</Text>
            </Flex>
            <Flex direction={'column'} alignItems={'center'}>
              <Flex alignItems={'center'} gap={0.5}>
                <Flex height={24} width={24}>
                  <Users color={colors.text.secondary} />
                </Flex>
                <Text color={'secondary'}>{subCountText}</Text>
              </Flex>

              {subscriptions.includes(channel.address.toLowerCase()) ? (
                <Button disabled>Subscribed✓</Button>
              ) : (
                <Button
                  isLoading={channel.address.toLowerCase() === addSubscriptionLoading}
                  onClick={() => addSubscription(channel.address)}
                >
                  Subscribe
                </Button>
              )}
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  );
};

const getSubCount = (count: null | number = 0) => {
  if (!count) return { count: 0 };

  return count / 1000 > 1 ? { thousands: true, count: Math.floor(count / 1000) } : { count };
};

export default DiscoverTab;
