import styled from '@emotion/styled/macro';
import { keyframes } from '@emotion/react';

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

const Spinner = styled.div<SpinnerProps>(({ size = 4 }) => ({
  '&:after': {
    borderRadius: '50%',
    width: '10em',
    height: '10em',
  },
  borderRadius: '50%',
  width: '10em',
  height: '10em',
  fontSize: size,
  position: 'relative',
  textIndent: '-9999em',
  borderTop: '1.1em solid rgba(255, 255, 255, 0.2)',
  borderRight: '1.1em solid rgba(255, 255, 255, 0.2)',
  borderBottom: '1.1em solid rgba(255, 255, 255, 0.2)',
  borderLeft: '1.1em solid #ffffff',
  webkitTransform: 'translateZ(0)',
  msTransform: 'translateZ(0)',
  transform: 'translateZ(0)',
  webkitAnimation: `${spin} 1.1s infinite linear`,
  animation: `${spin} 1.1s infinite linear`,
}));

export default Spinner;
