import React, { createContext, useContext, ReactNode, useState } from 'react';
import { useUserInfoLazyQuery } from 'context/UserContext/operations.generated';
import { useRouterContext } from 'context/RouterContext';

export type UserInfo = {
  telegramId?: number | null;
  telegramUsername?: string | null;
};

const UserContext = createContext<UserInfo & { loading?: boolean; handleGetUserInfo?: () => void }>(
  {} as UserInfo
);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const { login } = useRouterContext();
  const [user, setUser] = useState<UserInfo>();
  const [getUserInfo, { loading }] = useUserInfoLazyQuery({
    variables: {},
  });

  const handleGetUserInfo = () => {
    login(async () => {
      const response = await getUserInfo();
      setUser({
        telegramId: response?.data?.me?.telegramId,
        telegramUsername: response?.data?.me?.telegramUsername,
      });
    });
  };

  return (
    <UserContext.Provider value={{ ...user, loading, handleGetUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

function useUserContext() {
  return useContext(UserContext);
}

export { UserProvider, useUserContext };
