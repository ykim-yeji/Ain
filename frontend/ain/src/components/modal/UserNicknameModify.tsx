'use client';

import React from 'react';
import { useState, useEffect, ChangeEvent } from 'react';

interface Props {
  closeModal: any;
}

export default function UserNicknameModifyModal({ closeModal }: Props) {
  const [inputValue, setInputValue] = useState('');

  const modifyNickname = () => {
    // fetch post
    console.log(inputValue);
    closeModal();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 translate-y-1/2 flex justify-center w-full h-full relative z-1 text-center '>
      <div
        className='bg-white flex flex-col rounded-3xl'
        style={{ width: '250px', height: '250px', backgroundColor: '#F0D5FA' }}
      >
        <button className='self-end mt-2 mr-4' onClick={closeModal}>
          X
        </button>
        <div className='mt-2 text-xl'>수정할 닉네임을</div>
        <div className='mb-6 text-xl'>입력해주세요.</div>
        <input
          className='mx-10 px-2 py-2 rounded-full text-center text-lg text-white outline-0'
          type='text'
          value={inputValue}
          style={{ backgroundColor: '#C37CDB' }}
          placeholder='치킨'
          maxLength={5}
          onChange={(e) => handleInputChange(e)}
        />
        <button
          onClick={modifyNickname}
          className='mt-2 border-solid rounded-full  px-2 py-2 mx-10 text-lg text-white'
          style={{ backgroundColor: '#BE44E9' }}
        >
          확인
        </button>
      </div>
    </div>
  );
}
