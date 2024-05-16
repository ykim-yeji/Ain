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

  const { genderInput, mbti, imageUrl, characterName, imageFile } = useCreateStore();

  const reCreate = () => {
    useCreateStore.setState((state) => ({
      mergeInput: '',
      genderInput: '',
      mbti: '',
      imageUrl: '',
      characterName: '',
    }));
    router.push('/create');
  };

  const save = async () => {
    const formData = new FormData();

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
      const blob = new Blob([imageFile], { type: 'image/png' });
      formData.append('idealPersonImage', blob, 'image.png'); // 파일 이름 추가
      // formData.append("idealPersonImage", imageFile, "image.png"); // 파일 이름 추가
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

        if (response.ok) {
          const data = await response.json();
          reCreate();
        } else {
          console.log('에러발생으로 이상형 저장 못함');
        }

        // router.push('/chat');
      } catch (error) {
        console.error('API request failed: ', error);
      }
    }
  };

  const isStoredIdealExist = () => {
    if (
      characterName !== null &&
      characterName !== undefined &&
      genderInput !== null &&
      genderInput !== undefined &&
      mbti !== null &&
      mbti !== undefined &&
      imageFile !== null &&
      imageFile !== undefined &&
      imageUrl !== null &&
      imageUrl !== undefined
    ) {
      console.log(1, characterName);
      console.log(2, genderInput);
      console.log(3, mbti);
      console.log(4, imageFile);

      save();
    }
  };

  useEffect(() => {
    const getAccessToken = async () => {
      if (param?.get('authorization') && param?.get('new')) {
        setAccessToken(param.get('authorization') as string);
        if ((param.get('new') as string) === 'true') {
          //  새로운 회원이면 /nickname 페이지로
          // isStoredIdealExist();
          router.push('/nickname');
        } else {
          router.push('/');
          // 기존 회원이면 메인 페이지로
          // 기존 회원인데 생성한 이상형이 있으면? chat || main ?
          // isStoredIdealExist();
        }
        console.log('!!', accessToken);
      }
    };

    getAccessToken();

    // if (accessToken !== '' && accessToken !== undefined) {
    //   isStoredIdealExist();
    // }

    const redirectTimer = setTimeout(() => {
      if ((param.get('new') as string) === 'true') {
        console.log('AAA');
        //  새로운 회원이면 /nickname 페이지로
        // router.push('/nickname');
      } else {
        // router.push('/');
        if (accessToken !== '' && accessToken !== undefined) {
        }
      }
    }, 30);

    return () => clearTimeout(redirectTimer);
  }, [param]);

  useEffect(() => {
    if (accessToken !== '' && accessToken !== undefined) {
      isStoredIdealExist();
    }
  }, [accessToken]);

  return (
    <div className='relative mt-[65px] mb-[68px] w-full h-full flex flex-col justify-center items-center'>
      <p className='text-center text-xl text-white mt-10 leading-relaxed'>카카오 소셜 로그인 중입니다. </p>
    </div>
  );
}
