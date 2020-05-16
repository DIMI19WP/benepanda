import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
} from '@react-navigation/stack';

import loginWithBenedu from '~/functions/benedu/login';
import Feed from './Feed';
import SignIn from './SignIn';

const Stack = createStackNavigator();

export default (): JSX.Element => {
  const [loginState, setLoginState] = useState<boolean | undefined>();
  useEffect(() => {
    loginWithBenedu({ }).then(() => setLoginState(true)).catch(() => {
      setLoginState(false);
    });
  }, []);
  return (
    <NavigationContainer>
      {(loginState !== undefined) && (loginState ? (
        <Stack.Navigator>
          <Stack.Screen
            name="Feed"
            component={Feed}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Feed"
            component={Feed}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      ))}
    </NavigationContainer>
  );
};
