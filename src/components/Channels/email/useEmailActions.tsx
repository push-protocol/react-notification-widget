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

export enum ConnectEmailViews {
  Edit = 'Edit',
  Verify = 'Verify',
  Connected = 'Connected',
}

const useEmailActions = () => {
  const { isSubscribeOnly } = useEnvironment();
  const { login, isOnboarding, setIsOnboarding } = useAuthContext();
  const { setRoute } = useRouterContext();
  const { userCommsChannels } = useNotificationsContext();

  const [connectEmailView, setConnectEmailView] = useState(
    !userCommsChannels?.email?.exists ? ConnectEmailViews.Edit : ConnectEmailViews.Connected
  );

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
      setConnectEmailView(ConnectEmailViews.Verify);
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

      setConnectEmailView(ConnectEmailViews.Connected);

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
        setConnectEmailView(ConnectEmailViews.Edit);
        setEmail('');
        return setRoute(Routes.Settings);
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
    connectEmailView,
    setConnectEmailView,
    email,
    setEmail,
    isConnected: userCommsChannels?.email?.exists,
    hint: userCommsChannels?.email?.hint || '',
  };
};

export default useEmailActions;
