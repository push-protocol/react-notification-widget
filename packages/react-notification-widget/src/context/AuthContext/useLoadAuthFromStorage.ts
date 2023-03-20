import { useEffect } from 'react';
import authStorage from 'services/authStorage';
import { LOCALSTORAGE_PREFIX } from 'global/const';

type ArgsT = {
  setLoggedInAddress: (addr: string) => void;
  setIsLoggedIn: (bool: boolean) => void;
  partnerKey: string;
  address?: string;
};

const useLoadAuthFromStorage = ({
  setLoggedInAddress,
  setIsLoggedIn,
  partnerKey,
  address,
}: ArgsT) => {
  useEffect(() => {
    const key = `${LOCALSTORAGE_PREFIX}partnerKey`;
    const savedPk = localStorage.getItem(key);
    localStorage.setItem(key, partnerKey);

    if (savedPk !== partnerKey) {
      authStorage.clearAllKeys();
      setIsLoggedIn(false);
      setLoggedInAddress('');

      return;
    }

    const tokensList = authStorage.getUserSavedTokens();

    if (address && tokensList[address]) {
      authStorage.setAuth({
        address,
        token: tokensList[address].token,
        refreshToken: tokensList[address].refreshToken,
      });
      setIsLoggedIn(true);
      setLoggedInAddress(address);
    }
  }, [address, partnerKey]);
};

export default useLoadAuthFromStorage;
