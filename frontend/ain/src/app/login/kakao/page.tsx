'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import userStore from '@/store/userStore';
import { useRouter } from 'next/navigation';

export default function Page() {
  const param = useSearchParams();
  const router = useRouter();
  const [authCode, setAuthCode] = useState('');
  // const [accessToken, setAccessTokenTemp] = useState('');
  const [tokenExpiredDate, setTokenExpiredDate] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [refreshExpiredDate, setRefreshExpiredDate] = useState('');
  const [tokenType, setTokenType] = useState('');

  const { isLogin, setIsLogin, accessToken, setAccessToken } = userStore();

  // 로그인/회원가입 API 나온 후 활성화하는 코드
  // useEffect(() => {
  //   const sendAuthCode = async () => {
  //     if (param?.get('code')) {
  //       setAuthCode(param.get('code') as string);
  //     }
  //     if (authCode !== '') {
  //       alert(authCode);
  //     }
  //     try {
  //       // 하단은 api 나오고 수정합니다.
  //       const res = await fetch('/api/oauth/kakao/login', {
  //         method: 'POST',
  //         body: {
  //           authorizationCode: 'authCode',
  //         },
  //       });

  //       if (res.ok) {
  //         const data = await res.json();

  //         if (data && data.data && data.data.access_token) {
  //           // zustand userStore에 access token 저장
  //           // isLogin boolean값 false에서 true로
  //           setIsLogin();
  //           const token = data.data.memberAccessToken;
  //           setAccessToken(token);
  //         }
  //       } else {
  //         console.log(res.status);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   sendAuthCode();
  // }, [param, authCode]);

  // 이건 내가 프론트에서 직접 accessToken을 가져오는 방식
  // (이건 프로젝트에서는 사용하지 않는다)

  useEffect(() => {
    const sendAuthCode = async () => {
      if (param?.get('code')) {
        setAuthCode(param.get('code') as string);
      }
      if (authCode !== '') {
        alert(authCode);
      }
    };
    sendAuthCode();
  }, [param, authCode]);

  // const makeFormData = (params: any) => {
  //   const searchParams = new URLSearchParams();
  //   Object.keys(params).forEach((key) => {
  //     searchParams.append(key, params[key]);
  //   });
  //   console.log('>>>>>', searchParams.toString());

  //   return searchParams;
  // };

  useEffect(() => {
    const getAccessToken = async () => {
      const makeFormData = (params: any) => {
        const searchParams = new URLSearchParams();
        Object.keys(params).forEach((key) => {
          searchParams.append(key, params[key]);
        });
        console.log('>>>>>', searchParams.toString());

        return searchParams;
      };

      try {
        const res = await fetch('https://kauth.kakao.com/oauth/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
          body: makeFormData({
            grant_type: 'authorization_code',
            client_id: '71b41504050946184b34444e97de6792',
            redirect_uri: 'http://localhost:3000/login/kakao',
            code: authCode,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          setAccessToken(data.access_token);
          // setIsLogin();
          // setRefreshToken(data.refresh_token);
          // setTokenExpiredDate(data.expires_in);
          // setRefreshExpiredDate(data.refresh_token_expires_in);
          console.log(accessToken);
          alert('성공');
          router.push('/');
        } else {
          // console.log(res.status);
          alert('실패');
        }
        // console.log(accessToken);
        // console.log(refreshToken);
        // console.log(tokenExpiredDate);
        // console.log(refreshExpiredDate);
      } catch (error) {
        console.error(error);
        alert('에러로 실패');
      }
    };

    if (authCode !== '' && !isLogin) {
      getAccessToken();
    }
  }, [authCode, router, isLogin, setIsLogin]);

  // 비동기처리가 완료된 후에 조회
  // getAccessToken().then(() => {
  //   console.log(accessToken);
  //   console.log(refreshToken);
  //   console.log(tokenExpiredDate);
  //   console.log(refreshExpiredDate);
  // });

  return <div>카카오 소셜 로그인 중입니다.</div>;
}
