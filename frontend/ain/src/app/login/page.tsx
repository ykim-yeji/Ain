'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const client_id = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
const redirect_uri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

export default function Page() {
  const router = useRouter();

  const kakaoLogin = () => {
    // location.href = process.env.NEXT_PUBLIC_KAKAO_OAUTH_URL as string

    location.href =
      `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}` as string;
  };

  return (
    <div className='text-center flex flex-col items-center'>
      <img className='mt-6' src='/gif/rainbow-heart.gif' width='35%' height='30%' />
      <div className='text-2xl text-white mt-10'>
        <div>더 많은 기능을 이용하시려면</div>
        <div>로그인을 진행해 주세요</div>
      </div>
      <button type='button' onClick={kakaoLogin} className='mt-8 flex justify-center'>
        <img src='/logo/kakao.png' width='50%' height='100%' />
      </button>
    </div>
  );
}
