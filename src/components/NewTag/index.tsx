import React from 'react';
import styled from 'styled-components';
import { adjustColor } from '../utils';

const Container = styled.div`
  border-radius: 3px;
  background: ${({ theme }) => adjustColor(theme.colors.primary.light, 0.8)};
  color: ${({ theme }) => theme.colors.text.primary};
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
  return <Container className={className}>new</Container>;
};

export default NewTag;
