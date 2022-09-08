const trimString = (str: string, length: number) =>
  str.length <= length ? str : `${str.slice(length)}...`;

export default trimString;
