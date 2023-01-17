import React, { createContext, useContext, PropsWithChildren, useState, useEffect } from 'react';
import { useAccount, useNetwork, useSigner, useDisconnect } from 'wagmi';

type Signature = string;

export type EthTypedData = {
  types: Record<string, { name: string; type: string }[]>;
  primaryType: string;
  domain: Record<string, any>;
  message: Record<string, any>;
};

export type WhereverSigner = {
  address?: string;
  chainId?: number | string;
  signMessage?: (msgToSign: string) => Promise<Signature | undefined>;
  signTypedData?: (args: EthTypedData) => Promise<Signature | undefined>;
};

type AccountContextProps = PropsWithChildren<WhereverSigner>;

type AccountContextT = {
  isConnected: boolean;
  disconnect: () => void;
  refetchSigner: () => undefined | ReturnType<ReturnType<typeof useSigner>['refetch']>;
  signMessage: (msgToSign: string) => Promise<Signature | undefined>;
  signTypedData: (args: EthTypedData) => Promise<Signature | undefined>;
  address?: `0x${string}`;
  chainId?: number;
};

const AccountContext = createContext<AccountContextT>({} as AccountContextT);

const AccountProvider = (props: AccountContextProps) => {
  const { isConnected: wagmiConnected, address: wagmiAddress } = useAccount();
  const { disconnect: wagmiDisconnect } = useDisconnect();
  const { chain } = useNetwork();
  const { data: signer, refetch } = useSigner();

  // handle signer null case when reloading window after clearing storage
  const [refetchCounter, setRefetchCounter] = useState(0);

  useEffect(() => {
    if (!wagmiConnected || signer || refetchCounter > 10) return;

    const timeout = setInterval(async () => {
      refetch();
      setRefetchCounter((counter) => counter + 1);
    }, 500);

    return () => clearInterval(timeout);
  }, [signer]);

  const isConnected =
    wagmiConnected ||
    Boolean(props.address && props.chainId && props.signMessage && props.signTypedData);
  const chainId = wagmiConnected ? chain?.id : Number(props.chainId || 0);
  const address = wagmiConnected ? wagmiAddress : props.address;

  const signMessage = async (msg: string): Promise<string | undefined> => {
    if (wagmiConnected) {
      const refetchedSigner = await refetch();
      return refetchedSigner.data?.signMessage(msg);
    }

    props.signMessage?.(msg);
  };

  const signTypedData = async (args: EthTypedData) => {
    if (wagmiConnected) {
      const refetchedSigner = await refetch();
      return (refetchedSigner.data as any)?._signTypedData(args.domain, args.types, args.message);
    }

    return props.signTypedData?.(args);
  };

  const refetchSigner = () => {
    if (wagmiConnected) {
      return refetch();
    }

    return;
  };

  const disconnect = () => {
    if (wagmiConnected) {
      return wagmiDisconnect();
    }

    return;
  };

  return (
    <AccountContext.Provider
      value={{
        disconnect,
        refetchSigner,
        signTypedData,
        signMessage,
        isConnected,
        chainId,
        address: address as `0x${string}`,
      }}
    >
      {props.children}
    </AccountContext.Provider>
  );
};

function useAccountContext() {
  return useContext(AccountContext);
}

export { AccountProvider, useAccountContext };
