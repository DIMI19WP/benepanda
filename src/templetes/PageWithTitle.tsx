import React, { ReactNode } from "react";
import styled from "@emotion/native";

export const Title = styled.Text`
  font-size: 24px;
  font-family: 'NotoSansCJKkr-Black';
  margin-top: 12px;
`;

export const Background = styled.KeyboardAvoidingView`
  background-color: #F6F8FA;
  min-height: 100%;
  padding: 0px 24px 0px 24px;  
  box-sizing: border-box;
  flex: 1;
`;

export default ({ titleText, children, ...params }:
  { titleText: string; children: ReactNode}): JSX.Element => (
    <Background behavior="position" {...params}>
      <Title>{titleText}</Title>
      <>{children}</>
    </Background>
);
