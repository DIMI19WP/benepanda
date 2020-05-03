import React, { useState, useEffect } from 'react';
import {
  View, Dimensions, Text, Image, Alert,
} from 'react-native';
import styled from '@emotion/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { TextInput, TouchableNativeFeedback } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Orientation from 'react-native-orientation';

import loginWithBenedu from 'functions/benedu/login';
import Background from 'assets/loginBackground.svg';


const Container = styled.KeyboardAvoidingView`
    flex: 1;
    background-color: #95AB89;
`;

const BGFitter = styled.View`
    position: absolute;
    left: -91.77px;
    bottom: 0px;
    z-index: -100;
    flex: 1;
    justify-items: self-end;
    transition: 1s;
`;

const LogoWrapper = styled.View`
    width: 400px;
    max-height: 200px;
    margin-top: 100px;
    & > * {
    margin-left: auto;
    margin-right: auto;
  }
`;

const ContentWrapper = styled.View`
    flex: 1;
`;

const TextInputWrapper = styled.View`
    background-color: #ECEEF0;
    border-radius: 12px;
    padding-left: 12px;
    flex-direction: row;
    margin-bottom: 6px;
`;

const InputIcon = styled(Icon)`
    text-align-vertical: center;
`;

const InputArea = styled.View`
    flex: 1;
    padding: 12px;
`;
const Input = styled.TextInput`
    flex: 1;
`;
const Button = styled.View`
    background-color: #8FBE76;
    border-radius: 12px;
    overflow: hidden;
`;
const ButtonText = styled.Text`
    font-family: 'NotoSansCJKkr-Black';
    color: white;
    text-align: center;
`;

const Header = styled.Text`
font-family: 'NotoSansCJKkr-Black';
`;

const PandaWithBee = styled.Image`
height: 300px;
${({ screenHeight }) => {
    console.log(screenHeight);
    if (screenHeight < 672) {
      return `
        height: 170px;
    `;
    }
    return `
        margin-top: 120px;
    `;
  }}
`;

const HorizontalSplitter = styled.View`
    flex: 1;
    flex-direction: row;
`;

const PandaWithBeeLandscape = styled.Image`
    width: 40%;
`;

type Navigation = {
    navigation: StackNavigationProp<{
        SignIn: undefined;
        Feed: undefined;
    }, 'SignIn'>;
}

const LoginBlock = ({ navigation }: Navigation) => {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  return (
    <InputArea>
      <View style={{ flex: 1 }} />
      <Header>베네듀 계정으로 로그인해주세요</Header>
      <TextInputWrapper>
        <InputIcon name="mail-outline" size={18} color="#707070" />
        <Input keyboardType="email-address" placeholder="이메일" value={username} onChangeText={(text): void => setUsername(text)} />
      </TextInputWrapper>
      <TextInputWrapper>
        <InputIcon name="lock-outline" size={18} color="#707070" />
        <Input autoCompleteType="password" secureTextEntry textContentType="password" placeholder="비밀번호" value={password} onChangeText={(text): void => setPassword(text)} />
      </TextInputWrapper>
      <Button>
        <TouchableNativeFeedback onPress={() => loginWithBenedu({
          password,
          username,
        }).then(() => navigation.navigate('Feed')).catch((err: Error) => Alert.alert('로그인하지 못했습니다', `에러: ${err.message}`))}
        >
          <ButtonText>
            로그인
          </ButtonText>
        </TouchableNativeFeedback>
      </Button>
    </InputArea>
  );
};

export default ({ navigation }: Navigation): JSX.Element => {
  const [isHorizontal, setIsHorizontal] = useState(Orientation.getInitialOrientation() === 'LANDSCAPE');
  useEffect(() => {
    const orientationSetter = (orientation: Orientation.orientation): boolean => setIsHorizontal(orientation === 'LANDSCAPE');
    Orientation.addOrientationListener(orientationSetter);
    return (): void => {
      Orientation.removeOrientationListener(orientationSetter);
    };
  }, []);

  if (isHorizontal) {
    return (
      <HorizontalSplitter>
        <View style={{ flex: 1, backgroundColor: '#95AB89' }}>
          <PandaWithBeeLandscape source={require('assets/pandaWithBee.png')} resizeMode="contain" />
        </View>
        <View style={{ flex: 1 }}>
          <LoginBlock {...{ navigation }} />
        </View>
      </HorizontalSplitter>
    );
  }
  return (
    <Container>
      <ContentWrapper>
        <PandaWithBee source={require('assets/pandaWithBee.png')} resizeMode="contain" screenHeight={Dimensions.get('window').height} />
        <LoginBlock {...{ navigation }} />
      </ContentWrapper>
      <BGFitter>
        <View style={{ flex: 1 }} />
        <Background />
      </BGFitter>
    </Container>
  );
};
