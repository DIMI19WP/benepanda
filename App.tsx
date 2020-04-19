import React from 'react';
import {Text} from 'react-native';
import styled, {css} from '@emotion/native';

const Container = styled.View`
  background-color: red;
`;

const HyperTitle = styled(Text)`
  font-size: 20px;
`;

class App extends React.Component {
  render() {
    return (
      <Container
        style={css`
          border-radius: 10px;
        `}>
        <HyperTitle>하위~</HyperTitle>
      </Container>
    );
  }
}

export default App;
