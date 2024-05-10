'use client';

import React from 'react';
import { useState, useEffect, ChangeEvent } from 'react';

import { useRouter } from 'next/navigation';

import userStore from '@/store/userStore';

import useModalStore from '@/store/modalStore';

interface Props {
  closeModal: any;
  tempNickname: string;
  tempFullName: string;
}

export default function IdealNicknameModify({ closeModal, tempNickname, tempFullName }: Props) {
  const router = useRouter();
  const [inputValue, setInputValue] = useState<string>(tempNickname);
  // const [originNickname, setOriginNickname] = useState<string>(tempNickname);
  const [realNickname, setRealNickname] = useState<string>('');

  const { accessToken } = userStore();
  const koreanRegex = /^[가-힣]*$/;

  const {
    nicknameModalState,
    setNicknameModalState,
    idealNicknameModalState,
    setIdealNicknameModalState,
    setHeaderDropDown,
  } = useModalStore();

  const modifyIdealNickname = () => {
    if (koreanRegex.test(inputValue) && inputValue !== '' && inputValue !== null) {
      // fetch post
      console.log(inputValue);
      closeModal();
    } else {
      alert('이상형의 별명은 한글 1~5자 사이로 해주세요.');
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 5) {
      e.target.value = e.target.value.slice(0, 5);
    }

    setInputValue(e.target.value);
  };

  return (
    <div onClick={setIdealNicknameModalState}>
      <div className='fixed left-1/2 bottom-1/2 transform -translate-x-1/2 translate-y-1/2 flex items-center justify-center w-full h-full text-center z-20'>
        <div
          onClick={setIdealNicknameModalState}
          className='bg-white flex flex-col rounded-3xl'
          style={{ width: '250px', height: '250px', backgroundColor: '#F0D5FA' }}
        >
          <button className='self-end mt-2 mr-4' onClick={closeModal}>
            X
          </button>
          <div className='mt-2 text-xl'>이상형의 별명을</div>
          <div className='mb-6 text-xl'>무엇으로 바꿀까요?</div>
          <input
            className='mx-10 px-2 py-2 rounded-md text-center text-lg text-white outline-0 shadow-md'
            type='text'
            value={inputValue}
            // value={originNickname}
            style={{ backgroundColor: '#C37CDB' }}
            placeholder={tempFullName}
            maxLength={5}
            onChange={(e) => handleInputChange(e)}
          />
          <button
            className='mt-2 border-solid rounded-full  px-2 py-2 mx-10 text-lg text-white shadow-md'
            style={{ backgroundColor: '#BE44E9' }}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
