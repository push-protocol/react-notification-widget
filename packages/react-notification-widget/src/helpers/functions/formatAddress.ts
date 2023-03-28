const formatAddress = (address?: string | null) => {
  if (!address) {
    return '';
  }

  return `${address.slice(0, 4)}....${address.slice(address.length - 4, address.length)}`;
};

export default formatAddress;
