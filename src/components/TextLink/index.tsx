import styled from 'styled-components';
import Text from 'components/Text';
import { adjustColor } from 'components/utils';

const TextLink = styled(Text)`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary.main};
  :active {
    color: ${({ theme }) => adjustColor(theme.colors.primary.main, 0.8)};
  }
`;

export default TextLink;
