import AsyncStorage from '@react-native-community/async-storage';
import CookieManager from '@react-native-community/cookies';
import HTMLParser from 'fast-html-parser';

import { ROOT_URI } from 'types/constants';
import api from 'functions/request';


interface LoginInfo {
  username?: string;
  password?: string;
}

async function login({ username = '', password = '' }: LoginInfo): Promise<boolean> {
  CookieManager.clearAll();
  const landingPage = await api('/', {
    saveCookies: false,
  });
  const cookieToken = (await CookieManager.get(ROOT_URI)).__RequestVerificationToken;
  const inputToken = HTMLParser.parse(landingPage.value).querySelector('input').attributes.value;

  const formdata = new FormData();
  formdata.append('__RequestVerificationToken', inputToken);
  formdata.append('loginGB', '2');
  formdata.append('loginID', username);
  formdata.append('loginPW', password);

  const loginPage = await api('/Home/Login', {
    headers: {
      Cookie: `__RequestVerificationToken=${cookieToken}`,
    },
    method: 'POST',
    body: formdata,
  });

  if (loginPage.value.includes('내 성적')) return true;
  const errorMessage = HTMLParser.parse(loginPage.value).querySelectorAll('.login-field span')[3].childNodes[0].rawText;
  if (errorMessage) throw Error(errorMessage);
  throw Error('알 수 없는 오류');
}

async function getLoginInfo({ username = '', password = '' }: LoginInfo): Promise<LoginInfo> {
  if (username && password) {
    await AsyncStorage.setItem('username', username);
    await AsyncStorage.setItem('password', password);
    return { username, password };
  }

  const savedUsername = await AsyncStorage.getItem('username');
  const savedPassword = await AsyncStorage.getItem('password');

  if (savedUsername && savedPassword) {
    return ({
      username: savedUsername,
      password: savedPassword,
    });
  }
  throw new Error('No username or password provided');
}

export default async (param: LoginInfo): Promise<boolean> => {
  try {
    return await login(await getLoginInfo(param));
  } catch (e) {
    throw e;
  }
};
