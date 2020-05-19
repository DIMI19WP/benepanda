import React from 'react';
import {
  View, TouchableNativeFeedback, StyleProp, ViewStyle,
} from 'react-native';

import {
  Button, ButtonText,
} from './styleds';

export default ({ onPress, children, style }: {
    children: string;
    onPress(): void;
    style?: StyleProp<ViewStyle>;
}): JSX.Element => (
  <View style={[style]}>
    <Button>
      <TouchableNativeFeedback onPress={onPress}>
        <ButtonText>
          {children}
        </ButtonText>
      </TouchableNativeFeedback>
    </Button>
  </View>
);
