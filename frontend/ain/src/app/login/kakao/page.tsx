'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import userStore from '@/store/userStore';
import { useRouter } from 'next/navigation';

const client_id = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
const redirect_uri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

export default function Page() {
  const param = useSearchParams();
  const router = useRouter();
  const [authCode, setAuthCode] = useState('');
  // const [accessToken, setAccessTokenTemp] = useState('');
  // const [tokenExpiredDate, setTokenExpiredDate] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  // const [refreshExpiredDate, setRefreshExpiredDate] = useState('');
  // const [tokenType, setTokenType] = useState('');
  const [isNewMember, setIsNewMember] = useState(false);

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
            client_id: client_id,
            redirect_uri: redirect_uri,
            code: authCode,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          setAccessToken(data.access_token);
          setRefreshToken(data.refresh_token);
          setIsNewMember(data.IsNewMember);
          console.log(accessToken);
          alert('성공');

          if (isNewMember === true) {
            router.push('/nickname');
          } else {
            router.push('/');
          }
        }

        // if (res.ok) {
        //   const result = await res.json();
        //   if (result.code === 200) {
        //     const data = await res.json();
        //     setAccessToken(data.access_token);
        //     setRefreshToken(data.refresh_token);
        //     setIsNewMember(data.IsNewMember);
        //     console.log(accessToken);
        //     alert('성공');

        //     // 여기서 분기를 나눠서 새 회원이면 닉네임 등록페이지로
        //     // 기존 회원이면 메인페이지or채팅페이지로 보낸다.
        //     if (isNewMember === true) {
        //       router.push('/nickname');
        //     } else {
        //       router.push('/');
        //     }

        //     // 아래 형식은 우리 백엔드 서버에서 오는 응답이라
        //     // 카카오 인가서버에 해당 X
        //   } else if (result.code === 400) {
        //     alert('요청 형식이 잘못되었습니다.');
        //     return;
        //   } else if (result.code === 403) {
        //     alert('토큰의 유효기간이 만료되었습니다.');
        //     return;
        //   } else {
        //     alert('400,403이 아닌 기타에러 발생');
        //     return;
        //   }
        // }
        else {
          alert('실패');
        }
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
