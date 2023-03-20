import { useMemo } from 'react';
import dayjs from 'dayjs';
import { useUserContext } from 'context/UserContext';

const useUnreadCount = () => {
  const { notifications, user } = useUserContext();

  return useMemo(() => {
    if (!user || !notifications?.length) {
      return;
    }

    const unread = notifications.filter((notification) =>
      dayjs(notification.timestamp).isAfter(dayjs(user.lastReadAt))
    );

    return unread.length;
  }, [notifications, user]);
};

export default useUnreadCount;
