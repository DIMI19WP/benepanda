import React, { ReactNode } from 'react';
import { Text } from 'react-native';
import styled from '@emotion/native';

const Title = styled.Text`
  font-size: 24px;
  font-family: 'NotoSansCJKkr-Black';
`;

const Background = styled.View`
  background-color: #F6F8FA;
  min-height: 100%;
  padding: 12px 24px 0px 24px;  
`;

export default ({ titleText, children }:
  { titleText: string; children: ReactNode}): JSX.Element => (
    <Background>
      <Title>{titleText}</Title>
      <>{children}</>
    </Background>
);
