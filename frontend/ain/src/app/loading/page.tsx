'use client';

import useCreateStore from '@/store/createStore';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoadingPage() {
  const router = useRouter();

  const { mergeInput, genderInput } = useCreateStore();
  const [mbtiValue, setMbtiValue] = useState<string>('');

  const fetchCharacterImage = async () => {
    const requestBody = {
      idealPersonDescriptions: mergeInput,
      idealPersonGender: genderInput,
    };

    try {
      await fetch(`${process.env.NEXT_PUBLIC_FAST_API_URL}/ideal-people/images`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })
        .then((response: { blob(): any; headers: { get: (arg0: string) => any } }) => {
          // 응답 헤더에서 'Mbti' 값을 추출
          const newMbti: string = response.headers.get('mbti');
          useCreateStore.setState((state) => ({ mbti: newMbti }));
          return response.blob();
        })
        .then((blob) => {
          // 받은 파일(blob)을 처리하는 로직을 작성합니다.
          const newUrl: string = URL.createObjectURL(blob); // blob 객체를 가리키는 URL을 생성
          useCreateStore.getState().setImageFile(blob); // Blob을 base64로 변환하여 저장
          useCreateStore.setState((state) => ({ imageUrl: newUrl }));
        });
    } catch (error) {
      console.error('API request failed: ', error);
    }
  };

  const fetchCharacterName = async () => {
    // 쿼리 파라미터 문자열 생성
    const queryParams = new URLSearchParams({
      idealPersonGender: genderInput
    }).toString();
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ideal-people/names?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      const newCharacterName: string = data.data.idealPersonName;
      useCreateStore.setState((state) => ({ characterName: newCharacterName }));
    } catch (error) {
      console.error('API request failed: ', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchCharacterImage(), fetchCharacterName()]);
      router.push('/result');
    };

    fetchData();
  }, []);

  return (
    <div className='relative mt-[65px] mb-[68px] w-full h-full flex flex-col justify-center items-center'>
      <img src='./gif/loading_circle.gif' className='w-[55%] rounded-full shadow-xl' />
      <p className='text-center text-xl text-white mt-10 leading-relaxed'>
        조금만 기다려주시면 <br />
        아인과의 <span className='text-[#FF7FCE]'>아름다운 만남</span>이 <br />
        시작될 거예요
      </p>
      <img src='./background/loading_top.png' className='absolute top-0 right-0 w-1/3' />
      <img src='./background/loading_bottom.png' className='absolute bottom-0 left-0 w-[60%]' />
    </div>
  );
}
