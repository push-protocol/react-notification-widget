import { Mail } from '@emotion-icons/octicons';
import Flex from '../layout/Flex';
import TextInput from '../TextInput';
import Text from '../Text';
import theme from '../../theme';
import Button from '../Button';

const NotificationSettings = () => {
  return (
    <Flex gap={2} p={3} direction={'column'} height={330}>
      <Text size={'xl'}>Email Notifications</Text>
      <Text mb={1}>Enter your email below to receive notifications directly to your inbox:</Text>
      <TextInput
        leftIcon={<Mail color={theme.colors.text.secondary} size={20} />}
        placeholder={'Enter your email'}
        type={'email'}
      />
      <Flex gap={1} justifyContent={'end'} mt={2}>
        <Button onClick={() => alert('clicked')}>Save</Button>
        <Button onClick={() => alert('cancel')} variant={'outlined'}>
          Cancel
        </Button>
      </Flex>
    </Flex>
  );
};

export default NotificationSettings;
