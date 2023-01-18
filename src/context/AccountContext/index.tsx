import React, { createContext, useContext, PropsWithChildren, useState, useEffect } from 'react';
import { useAccount, useNetwork, useSigner, useDisconnect } from 'wagmi';
import { utils } from 'ethers';
import useValidateProps from './useValidateProps';

type Signature = string;

export type EthTypedData = {
  types: Record<string, { name: string; type: string }[]>;
  primaryType: string;
  domain: Record<string, any>;
  message: Record<string, any>;
};

export type CustomSigner = {
  address?: string;
  chainId?: number | string;
  signMessage?: (msgToSign: string) => Promise<Signature | undefined>;
  signTypedData?: (args: EthTypedData) => Promise<Signature | undefined>;
};

export type AccountContextProps = PropsWithChildren<CustomSigner>;

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

  const isCustomSigner = useValidateProps(props);

  // handle signer null case when reloading window after clearing storage
  const [refetchCounter, setRefetchCounter] = useState(0);

  useEffect(() => {
    if (isCustomSigner || !wagmiConnected || signer || refetchCounter > 10) return;

    const timeout = setInterval(async () => {
      refetch();
      setRefetchCounter((counter) => counter + 1);
    }, 500);

    return () => clearInterval(timeout);
  }, [signer]);

  const isConnected = isCustomSigner ? Boolean(props.address && props.chainId) : wagmiConnected;
  const chainId = isCustomSigner ? Number(props.chainId || 0) : chain?.id;
  const address = isCustomSigner ? props.address && utils.getAddress(props.address) : wagmiAddress;

  const signMessage = async (msg: string): Promise<string | undefined> => {
    if (isCustomSigner) {
      return props.signMessage?.(msg);
    }

    if (wagmiConnected) {
      const refetchedSigner = await refetch();
      return refetchedSigner.data?.signMessage(msg);
    }
  };

  const signTypedData = async (args: EthTypedData) => {
    if (isCustomSigner) {
      // When relying on the ethers library for signing typed data, this EIP712Domain type, which describes
      // the type of the "domain" is not provided (i.e PUSH subscribe call), as it is
      // added internally by ethers when signing the data. For custom signers, this needs to be added for signing to work.
      const { domain, types } = args;
      args.types = {
        // added first so that it is replaced by spread if already included
        EIP712Domain: [
          ...(domain.name ? [{ name: 'name', type: 'string' }] : []),
          ...(domain.chainId ? [{ name: 'chainId', type: 'uint256' }] : []),
          ...(domain.verifyingContract ? [{ name: 'verifyingContract', type: 'address' }] : []),
          ...(domain.version ? [{ name: 'version', type: 'string' }] : []),
          ...(domain.salt ? [{ name: 'salt', type: 'string' }] : []),
        ],
        ...types,
      };

      return props.signTypedData?.(args);
    }

    if (wagmiConnected) {
      const refetchedSigner = await refetch();
      return (refetchedSigner.data as any)?._signTypedData(args.domain, args.types, args.message);
    }
  };

  const refetchSigner = () => {
    if (isCustomSigner) {
      return;
    }

    if (wagmiConnected) {
      return refetch();
    }
  };

  const disconnect = () => {
    if (isCustomSigner) {
      return;
    }

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
