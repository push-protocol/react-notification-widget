import { useEffect, useMemo } from 'react';
import { utils } from 'ethers';
import { CustomSigner, SignerContextProps } from './index';

const logMissingProp = (prop: keyof CustomSigner) =>
  console.error(
    `Wherever: customSigner.${prop} is undefined and must be provided when using a custom signer`
  );

const useValidateProps = (props: SignerContextProps) => {
  const isCustomSigner = useMemo(
    () => Boolean(props.address || props.signMessage || props.signTypedData || props.chainId),
    [props]
  );

  useEffect(() => {
    if (!isCustomSigner) {
      return;
    }

    const keys = ['address', 'signMessage', 'chainId', 'signTypedData'] as const;

    keys.forEach((key) => {
      if (!props[key]) logMissingProp(key);
    });

    if (props.address) {
      try {
        utils.getAddress(props.address);
      } catch (e) {
        console.error(
          `Wherever: invalid Ethereum address provided to "customSigner.address" Value: ${props.address}`
        );
      }
    }
  }, [props]);

  return isCustomSigner;
};

export default useValidateProps;
