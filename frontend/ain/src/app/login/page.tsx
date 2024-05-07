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
    <div className='relative mt-[65px] mb-[68px] w-full h-full flex flex-col items-center justify-start'>
      <div className='w-[60%] h-[50%] flex items-center'>
        <img src='./gif/rainbow_heart.gif'  />
      </div>
      <div className='w-full h-[40%] flex flex-col justify-start items-center'>
        <div className='text-lg text-center text-white leading-relaxed'>더 많은 기능을 이용하시려면 <br />로그인을 진행해 주세요</div>
        <button type='button' onClick={kakaoLogin} className='mt-10 flex justify-center'>
          <img src='/logo/kakao.png' width='50%' height='100%' />
        </button>
        </div>
      {/* <img src="./background/login_top.png" className='absolute top-[40%] left-0 w-[45%]' /> */}
      <img src="./background/login_left.png" className='absolute bottom-0 left-0 w-[40%]' />
      <img src="./background/login_right.png" className='absolute bottom-0 right-0 w-[40%]' />
      {/* <img src="./background/login_center.png" className='absolute bottom-[5%] right-0 w-[35%]' /> */}
      {/* <img src="./background/login_bottom.png" className='absolute bottom-0 left-[20%] w-[40%]' /> */}
    </div>
  );
}
