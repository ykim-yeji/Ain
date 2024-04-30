'use client';

import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

import userStore from '@/store/userStore';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Page() {
  const [inputValue, setInputValue] = useState<string>('');

  const { accessToken } = userStore();

  const router = useRouter();

  const koreanRegex = /^[가-힣]*$/;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 5) {
      e.target.value = e.target.value.slice(0, 5);
    }

    setInputValue(e.target.value);
  };

  const setIdealNickname = () => {
    if (koreanRegex.test(inputValue) && inputValue !== '' && inputValue !== null) {
      // fetch post

      console.log(`${API_URL}/members`);
      console.log(inputValue);
      // alert('내 닉네임 설정이 완료되었습니다.');

      // router.push('/');
    } else {
      alert('닉네임은 한글 1~5자 사이로 해주세요.');
    }
  };

  const postMyNickname = async () => {
    if (koreanRegex.test(inputValue) && inputValue !== '' && inputValue !== null) {
      // fetch post

      try {
        const res = await fetch(`${API_URL}/members`, {
          method: 'PATCH',
          headers: {
            Authorization: accessToken,
            'Content=Type': 'application/json',
          },
          body: JSON.stringify({
            memberNickname: inputValue,
          }),
        });

        if (res.ok) {
          console.log('닉네임 등록 성공!');
        } else {
          console.log(res.status);
        }
      } catch (error) {
        console.log(error);
        throw new Error();
      }
    } else {
      alert('닉네임은 한글 1~5자 사이로 해주세요.');
    }
  };

  return (
    <div className='text-center flex flex-col items-center h-full justify-center'>
      <div className='text-2xl text-white mt-10 '>
        <div className=''>아인이 불러줄 당신의</div>
        <div>닉네임을 입력해주세요.</div>
      </div>
      <input
        type='text'
        className='mt-4 mx-10 w-40 x-2 py-2 rounded-md text-center text-lg text-white outline-0'
        value={inputValue}
        style={{ backgroundColor: '#F4DBFD' }}
        placeholder='치킨'
        maxLength={5}
        onChange={(e) => handleInputChange(e)}
      />
      <button
        type='button'
        // onClick={postMyNickname}
        onClick={setIdealNickname}
        className='mt-2 mb-10 w-40 border-solid rounded-full px-2 py-2 mx-4 text-lg text-white'
        style={{ backgroundColor: '#BE44E9' }}
      >
        확인
      </button>
    </div>
  );
}
