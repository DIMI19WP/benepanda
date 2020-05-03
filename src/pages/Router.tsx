import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
} from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';

import loginWithBenedu from 'functions/benedu/login';
import Feed from './Feed';
import SignIn from './SignIn';

const Stack = createStackNavigator();

export default () => {
  const [loginState, setLoginState] = useState<boolean | undefined>();
  useEffect(() => {
    console.log('로그인..?');
    loginWithBenedu({ }).then(() => setLoginState(true)).catch(() => {
      setLoginState(false);
    });
  }, []);
  console.log(loginState);
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
