'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import useUserStore from '@/store/userStore';
import useCreateStore from '@/store/createStore';

import { access } from 'fs';

export default function Page() {
  const param = useSearchParams();
  const router = useRouter();

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const { accessToken, setAccessToken } = useUserStore();

  const { isSave, genderInput, mbti, characterName} = useCreateStore();

  const save = async () => {

    const imageFile = useCreateStore.getState().getImageFile();

    const formData = new FormData();

    // null 체크 후 추가
    if (characterName) {
      formData.append('idealPersonFullName', characterName);
    }
    if (mbti) {
      formData.append('idealPersonMBTI', mbti);
    }
    if (genderInput) {
      formData.append('idealPersonGender', genderInput);
    }
    if (imageFile) {
      formData.append('idealPersonImage', imageFile, 'image.png'); // 파일 이름 추가
    }

    if (accessToken !== null) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ideal-people`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ` + accessToken,
          },
          body: formData,
        });

        const data = await response.json();

        if (data.code == 201) {
          useCreateStore.setState((state) => ({ isSave: false }));
          router.push('/chat');
        }

        router.push('/chat');
      } catch (error) {
        console.error('API request failed: ', error);
      }
    }
  };


  const getAccessToken = async () => {
    if (param?.get('authorization') && param?.get('new')) {
      const token = param.get('authorization') as string
      setAccessToken(token);
      if ((param.get('new') as string) === 'true') {
        //  새로운 회원이면 /nickname 페이지로
        // isStoredIdealExist();
        router.push('/nickname');0
      } else {
        router.push('/');
        // 기존 회원이면 메인 페이지로
        // 기존 회원인데 생성한 이상형이 있으면? chat || main ?
        // isStoredIdealExist();
      }
      console.log('!!', accessToken);
    }
  };

  useEffect(() => {

    getAccessToken();

    const redirectTimer = setTimeout(() => {
      if ((param.get('new') as string) === 'true') {
        console.log('AAA');
        //  새로운 회원이면 /nickname 페이지로
        router.push('/nickname');
      } else {
        router.push('/');
        if (accessToken !== '' && accessToken !== undefined) {
        }
      }
    }, 30);

    return () => clearTimeout(redirectTimer);
  }, [param]);

  useEffect(() => {
    if (accessToken && isSave) {
      // console.log('token updated:', accessToken);
      // accessToken이 업데이트된 후 실행하고 싶은 로직
      save();
    }
  }, [accessToken]); // accessToken 상태를 의존성 배열에 추가


  return (
    <div className='relative mt-[65px] mb-[68px] w-full h-full flex flex-col justify-center items-center'>
      <p className='text-center text-xl text-white mt-10 leading-relaxed'>카카오 소셜 로그인 중입니다. </p>
    </div>
  );
}
