import React from 'react';
import styled from 'styled-components';
import Flex from 'components/layout/Flex';
import { Lock } from 'components/icons';
import Text from 'components/Text';
import Checkbox from 'components/Checkbox';

const LockIcon = styled.div`
  width: 11px;
  height: 11px;
  display: flex;
`;

type HideEmailProps = {
  checked: boolean;
  onChange(value: boolean): void;
};

const HideEmail = ({ checked, onChange }: HideEmailProps) => {
  return (
    <Flex justifyContent={'center'} gap={4}>
      <Flex direction={'column'} gap={0.2}>
        <Flex gap={0.5} alignItems={'center'}>
          <LockIcon>
            <Lock />
          </LockIcon>
          <Text size={'md'} weight={600}>
            Hide my email
          </Text>
        </Flex>
        <Text size={'sm'} color={'secondary'} opacity={0.8}>
          If checked, Shapeshift will not have access to your email. Learn more
        </Text>
      </Flex>
      <Flex>
        <Checkbox checked={checked} onChange={(checked) => onChange(checked)} />
      </Flex>
    </Flex>
  );
};

export default HideEmail;
