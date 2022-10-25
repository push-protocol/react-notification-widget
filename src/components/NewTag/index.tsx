import React from 'react';
import styled, { useTheme } from 'styled-components';
import { adjustColor } from '../utils';
import Text from 'components/Text';

const Container = styled.div`
  border-radius: 3px;
  background: ${({ theme }) => adjustColor(theme.colors.primary.light, 0.8)};
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  padding: 2px 4px;
  width: 35px;
  height: 17px;
  font-size: 11px;
`;

interface NewTagProps {
  className?: string;
}

const NewTag = ({ className }: NewTagProps) => {
  const theme = useTheme();

  return (
    <Container className={className}>
      <Text color={theme.colors.button.text}>new</Text>
    </Container>
  );
};

export default NewTag;
