import { useAccount, useSigner } from 'wagmi';
import { SiweMessage } from 'siwe';
import {
  useNonceGenerateMutation,
  useUserLoginMutation,
} from 'screens/verifyAccount/operations.generated';
import { useChannelContext } from 'context/ChannelContext';

type SignatureMessage = {
  domain: string;
  address: string;
  statement: string;
  uri: string;
  version: string;
  chainId: number;
  nonce: string;
  issuedAt: string;
};

export class LoginError extends Error {}

export const useAuthenticate = () => {
  const { address } = useAccount();
  const [generateNonce] = useNonceGenerateMutation();
  const [loginUser] = useUserLoginMutation();
  const signer = useSigner();
  const { chainId } = useChannelContext();

  const login = async (channelAddress: string) => {
    const nonce = await getNonce();
    const [msg, signature] = await getSignature(nonce);
    return await attemptLogin(msg, signature, channelAddress);
  };

  const getNonce = async () => {
    try {
      const res = await generateNonce({
        variables: {
          input: {
            userAddress: address as string,
          },
        },
      });
      return res.data?.nonceGenerate.nonce as string;
    } catch (e) {
      throw new LoginError("Can't get nonce");
    }
  };

  const getSignature = async (nonce: string): Promise<[SignatureMessage, string]> => {
    const msg: SignatureMessage = {
      domain: location.host,
      address: address as string,
      statement: 'Verify you are the owner of this wallet to receive notifications.',
      uri: location.origin,
      version: '1',
      chainId,
      nonce,
      issuedAt: new Date().toISOString(),
    };
    const message = new SiweMessage(msg).prepareMessage();

    try {
      // in some cases wagmi returns an undefined signer, even though one is instantiated. This(refetch) validates an actual signer is always returned
      const refetchedSigner = await signer.refetch();
      const signature = await refetchedSigner.data?.signMessage(message);
      return [msg, signature as string];
    } catch (e) {
      throw new LoginError("Can't obtain signature");
    }
  };

  const attemptLogin = async (msg: SignatureMessage, signature: string, channelAddress: string) => {
    const response = await loginUser({
      variables: {
        input: {
          channel: channelAddress,
          message: JSON.stringify(msg),
          signature,
          chainId,
        },
      },
    });
    return {
      token: response.data?.userLogin.token as string,
      refreshToken: response.data?.userLogin.refreshToken as string,
    };
  };

  return {
    login,
  };
};
