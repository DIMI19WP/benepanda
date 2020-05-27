import { ROOT_URI } from 'types/constants';
import CookieManager from '@react-native-community/cookies';
import { Platform } from 'react-native';

export default async (path: string, param?: RequestInit & {
  saveCookies?: boolean;
}, type: |'text'|'json' = 'text'): Promise<{
    headers: Headers;
    value: string;
}> => {
  const session = (await CookieManager.get(ROOT_URI))['ASP.NET_SessionId'];

  const headers = {
    Cookie: `${(param?.headers as {Cookie: string})?.Cookie};ASP.NET_SessionId=${session}`,
  }
  if (Platform.OS === 'ios') {
    delete headers.Cookie;
    delete (param?.headers as {Cookie: string})?.Cookie;
  }

  const fetched = await fetch(`${ROOT_URI}${path[0] === '/' ? path : `/${path}`}`, session ? {
    ...param,
    headers: headers,
  } : param);
  return {
    headers: fetched.headers,
    value: await fetched[type](),
  };
};
