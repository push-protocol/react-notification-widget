import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }`;

type SpinnerProps = {
  size?: number;
};

const Spinner = styled.div<SpinnerProps>`
  &:after {
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: ${({ size }) => size};
  position: relative;
  text-indent: -9999em;
  border-top: 5px solid rgba(255, 255, 255, 0.2);
  border-right: 5px solid rgba(255, 255, 255, 0.2);
  border-bottom: 5px solid rgba(255, 255, 255, 0.2);
  border-left: 5px solid #ffffff;
  transform: translateZ(0);
  animation: ${spin} 1.1s infinite linear;
`;

export default Spinner;
