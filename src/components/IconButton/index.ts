import styled from '@emotion/styled/macro';

const IconButton = styled.div(({ theme }) => ({
  borderRadius: '50%',
  cursor: 'pointer',
  padding: 4,
  stroke: theme.colors.text.primary,
  fill: theme.colors.text.primary,
}));

export default IconButton;
