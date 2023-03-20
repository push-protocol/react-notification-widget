type Replacer = [RegExp, string];

const parseEpnsFormatting = (msg: string) => {
  if (!msg) {
    return '';
  }

  return msg.replace(...timestamp).replace(...others);
};

const timestamp: Replacer = [/(\[timestamp:)([^\]]*)(\])/g, ''];
const others: Replacer = [/(\[(?:i|b|bi|w|d|s|t|u):)([^\]]*)(\])/g, '$2'];

export default parseEpnsFormatting;
