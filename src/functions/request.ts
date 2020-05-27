import { ROOT_URI } from 'types/constants';
import CookieManager from '@react-native-community/cookies';

export default async (path: string, param?: RequestInit & {
  saveCookies?: boolean;
}, type: |'text'|'json' = 'text'): Promise<{
    headers: Headers;
    value: string;
}> => {
  const session = (await CookieManager.get(ROOT_URI))['ASP.NET_SessionId'];
  try {
    const fetched = await fetch(`${ROOT_URI}${path[1] === '/' ? path : `/${path}`}`, session ? {
      ...param,
      headers: {
        Cookie: `${(param?.headers as {Cookie: string})?.Cookie};ASP.NET_SessionId=${session}`,
      },
    } : param);
    return {
      headers: fetched.headers,
      value: await fetched[type](),
    };
  } catch (e) {
    throw e;
  }
};
