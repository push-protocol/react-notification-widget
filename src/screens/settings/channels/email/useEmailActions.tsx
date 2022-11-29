import { useState } from 'react';
import { useNotificationsContext } from 'context/NotificationsContext';
import {
  useDeleteUserEmailMutation,
  useSaveUserEmailMutation,
  useValidateUserEmailMutation,
} from 'screens/settings/operations.generated';
import { UserCommunicationChannelsDocument } from 'context/NotificationsContext/operations.generated';
import analytics from 'services/analytics';
import { Routes, useRouterContext } from 'context/RouterContext';
import { useAuthContext } from 'context/AuthContext';
import { useEnvironment } from 'context/EnvironmentContext';

const useEmailActions = () => {
  const { isSubscribeOnly } = useEnvironment();
  const { login, isOnboarding, setIsOnboarding } = useAuthContext();
  const { setRoute, routeProps } = useRouterContext();
  const { activeRoute } = useRouterContext();
  const { userCommsChannels } = useNotificationsContext();

  const [isEditing, setIsEditing] = useState(!userCommsChannels?.email?.exists);
  const isVerify = activeRoute === Routes.EmailVerify;

  const [email, setEmail] = useState('');

  const [saveEmail, { loading: saveLoading }] = useSaveUserEmailMutation({
    variables: {
      input: { email },
    },
  });

  const [deleteEmail, { loading: deleteLoading }] = useDeleteUserEmailMutation({
    refetchQueries: [UserCommunicationChannelsDocument],
  });

  const [validateEmail, { loading: verifyLoading }] = useValidateUserEmailMutation({
    refetchQueries: [UserCommunicationChannelsDocument],
  });

  const handleSave = async () => {
    login(async () => {
      await saveEmail();
      analytics.track('email saved');
      return setRoute(Routes.EmailVerify, { email });
    });
  };

  const handleVerify = async (code: string) => {
    login(async () => {
      await validateEmail({
        variables: {
          input: {
            email,
            code,
          },
        },
      });
      analytics.track('email verified');

      setIsEditing(false);

      if (isSubscribeOnly) return;

      if (isOnboarding) {
        setRoute(Routes.ChannelAdded, { channel: 'Email' });
      } else {
        setRoute(Routes.Settings);
      }

      setIsOnboarding(false);
    });
  };

  const handleRemove = async () => {
    login(async () => {
      const response = await deleteEmail();

      if (response?.data?.userEmailDelete?.success) {
        analytics.track('email deleted');
        setIsEditing(true);
        setEmail('');
        return setRoute(Routes.Settings, { isSubscriber: routeProps?.isSubscriber });
      }
    });
  };

  return {
    saveLoading,
    verifyLoading,
    deleteLoading,
    handleSave,
    handleVerify,
    handleRemove,
    setIsEditing,
    email,
    setEmail,
    renderVerify: isVerify && isEditing,
    renderEdit: isEditing && !isVerify,
    renderConnected: !isEditing,
    isConnected: userCommsChannels?.email?.exists,
    hint: userCommsChannels?.email?.hint || '',
  };
};

export default useEmailActions;
