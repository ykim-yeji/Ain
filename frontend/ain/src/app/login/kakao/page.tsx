'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import useUserStore from '@/store/userStore';
import { access } from 'fs';

const client_id = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
const redirect_uri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

export default function Page() {
  const param = useSearchParams();
  const router = useRouter();
  const [authCode, setAuthCode] = useState('');
  const [refreshToken, setRefreshToken] = useState('');

  const [isNewMember, setIsNewMember] = useState<string>('false');

  const { isLogin, setIsLogin, accessToken, setAccessToken } = useUserStore();

  useEffect(() => {
    const getAccessToken = async () => {
      if (param?.get('authorization') && param?.get('new')) {
        setAccessToken(param.get('authorization') as string);
        // if ((param.get('new') as string) === 'true') {
        //   //  새로운 회원이면 /nickname 페이지로
        //   router.push('/nickname');
        // } else {
        //   router.push('/');
        //   // 기존 회원이면 메인 페이지로
        //   // 기존 회원인데 생성한 이상형이 있으면? chat || main ?
        // }
        console.log('!!', accessToken);
      }
    };

    getAccessToken();

    const redirectTimer = setTimeout(() => {
      if ((param.get('new') as string) === 'true') {
        //  새로운 회원이면 /nickname 페이지로
        router.push('/nickname');
      } else {
        router.push('/');
        // 기존 회원이면 메인 페이지로
        // 기존 회원인데 생성한 이상형이 있으면? chat || main ?
      }
    }, 10);

    return () => clearTimeout(redirectTimer);
  }, [param]);

  return (
    <div className='flex allign-center text-center items-center'>
      <div className='text-center items-center allign-center'>카카오 소셜 로그인 중입니다.</div>
    </div>
  );
}
