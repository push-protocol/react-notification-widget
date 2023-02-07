import React from 'react';
import styled, { useTheme } from 'styled-components';
import Text from '../../../components/Text';

const Container = styled.div`
  border-radius: 3px;
  background: ${({ theme }) => theme.w.colors.primary.light};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  font-size: 12px;
`;

interface NewTagProps {
  className?: string;
}

const NewTag = ({ className }: NewTagProps) => {
  const theme = useTheme();

  return (
    <Container className={className}>
      <Text color={theme.w.colors.button.text}>NEW</Text>
    </Container>
  );
};

export default NewTag;
