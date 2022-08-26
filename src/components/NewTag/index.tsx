import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  border-radius: 3px;
  background: ${({ theme }) => theme.colors.secondary};
  color: white;
  text-transform: uppercase;
  padding: 2px 4px;
  width: 35px;
  height: 17px;
  font-size: 11px;
  text-align: center;
`;

interface NewTagProps {
  className?: string;
}

const NewTag = ({ className }: NewTagProps) => {
  return <Container className={className}>new</Container>;
};

export default NewTag;
