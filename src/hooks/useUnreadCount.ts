import { useMemo } from 'react';
import dayjs from 'dayjs';
import { useNotificationsContext } from '../context/NotificationsContext';
import { useAuthContext } from '../context/AuthContext';

const useUnreadCount = () => {
  const { notifications } = useNotificationsContext();
  const { user } = useAuthContext();

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
