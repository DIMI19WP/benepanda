import React from 'react';
import {
  View, TouchableNativeFeedback, StyleProp, ViewStyle,
} from 'react-native';

import { PositiveButtonWrapper, PositiveButton } from './styleds';

export default ({ onPress, children, style }: {
    children: string;
    onPress(): void;
    style?: StyleProp<ViewStyle>;
}): JSX.Element => (
  <View style={[style]}>
    <TouchableNativeFeedback onPress={onPress}>
      <PositiveButtonWrapper>
        <PositiveButton>
          {children}
        </PositiveButton>
      </PositiveButtonWrapper>
    </TouchableNativeFeedback>
  </View>
);
