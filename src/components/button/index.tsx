import React from "react";
import {
  View, TouchableNativeFeedback, StyleProp, ViewStyle,
} from "react-native";

import {
  Button, ButtonText,
} from "./styleds";

export default ({ onPress, children, style }: {
    children: string;
    onPress(): any;
    style?: StyleProp<ViewStyle>;
}): JSX.Element => (
  <Button style={[style]}>
    <TouchableNativeFeedback onPress={onPress}>
      <ButtonText>
        {children}
      </ButtonText>
    </TouchableNativeFeedback>
  </Button>
);
