'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Page() {
  const kakaoLogin = () => {
    window.location.href = `${API_URL}/oauth2/authorization/kakao`;
  };

  return (
    <div className='relative mt-[65px] mb-[68px] w-full h-full flex flex-col items-center justify-start'>
      <div className='w-[60%] h-[50%] flex items-center'>
        <img src='./gif/rainbow_heart.gif' />
      </div>
      <div className='w-full h-[40%] flex flex-col justify-start items-center'>
        <div className='text-lg text-center text-white leading-relaxed'>
          더 많은 기능을 이용하시려면 <br />
          로그인을 진행해 주세요
        </div>
        <button type='button' onClick={kakaoLogin} className='mt-10 flex justify-center'>
          <img src='/logo/kakao.png' width='50%' height='100%' />
        </button>
      </div>
      <img src='./background/login_left.png' className='absolute bottom-0 left-0 w-[40%]' />
      <img src='./background/login_right.png' className='absolute bottom-0 right-0 w-[40%]' />
    </div>
  );
}
