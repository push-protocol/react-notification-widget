import { useAccount, useSigner } from 'wagmi';
import { SiweMessage } from 'siwe';
import { useNonceGenerateMutation, useUserLoginMutation } from 'screens/auth/operations.generated';
import { useEnvironment } from 'context/EnvironmentContext';

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
  const { chainId } = useEnvironment();

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
      statement: 'Sign in with Ethereum to the app',
      uri: location.origin,
      version: '1',
      chainId: chainId,
      nonce: nonce,
      issuedAt: new Date().toISOString(),
    };
    const message = new SiweMessage(msg).prepareMessage();

    try {
      const signature = await signer.data?.signMessage(message);
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
          signature: signature,
        },
      },
    });
    return {
      token: response.data?.userLogin.token as string,
    };
  };

  return {
    login,
  };
};
