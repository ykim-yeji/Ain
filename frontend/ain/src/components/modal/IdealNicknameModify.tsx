'use client';

import React from 'react';
import { useState, useEffect, ChangeEvent } from 'react';

import { useRouter } from 'next/navigation';

import userStore from '@/store/userStore';

import useModalStore from '@/store/modalStore';
import useIdealStore from '@/store/idealStore';

interface Props {
  closeModal: any;
  // tempNickname: string;
  // tempFullName: string;
  tempPersonId: number | undefined;
  setIsNicknameModified: any;
  isNicknameModified: number;
  // setTempNickname: any;
}

export default function IdealNicknameModify({
  closeModal,
  // tempNickname,
  // tempFullName,
  tempPersonId,
  setIsNicknameModified,
  isNicknameModified,
}: // setTempNickname,
Props) {
  const router = useRouter();
  const { selectedIdealName, selectedIdealFullName, selectedIdealId, setTempIdealName } = useIdealStore();
  // const [inputValue, setInputValue] = useState<string>(tempNickname);
  const [inputValue, setInputValue] = useState<string>(selectedIdealName);
  // const [originNickname, setOriginNickname] = useState<string>(tempNickname);
  const [realNickname, setRealNickname] = useState<string>('');
  const [tempModifiedName, setTempModifiedName] = useState<string>('');

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const { accessToken } = userStore();
  const koreanRegex = /^[가-힣]*$/;

  const {
    nicknameModalState,
    setNicknameModalState,
    idealNicknameModalState,
    setIdealNicknameModalState,
    setHeaderDropDown,
    // setIdealNicknameModalState,
  } = useModalStore();

  const modifyIdealNickname = async () => {
    if (koreanRegex.test(inputValue) && inputValue !== '' && inputValue !== null) {
      try {
        const res = await fetch(`${API_URL}/ideal-people/${selectedIdealId}/nicknames`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ` + accessToken,
          },
          body: JSON.stringify({
            idealPersonNickname: inputValue,
          }),
        });
        if (res.ok) {
          const result = await res.json();

          if (result.code === 200) {
            alert('이상형의 이름을 변경했습니다.');
            setIdealNicknameModalState();
            setIsNicknameModified(isNicknameModified + 1);
            setTempIdealName(inputValue);
          } else if (result.code === 400) {
            console.log('REEEE', result);
            alert('현재 이상형 닉네임과 동일합니다');
          } else {
            console.log(result);
            console.log(result.code, '번 에러발생');
          }
        } else {
          console.log(res);
          console.log('이상형 이름 변경 실패');
        }
      } catch (error) {
        console.log(error);
        console.log('에러발생으로 실패');
      }
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
            // placeholder={tempFullName}
            placeholder={selectedIdealFullName}
            maxLength={5}
            onChange={(e) => handleInputChange(e)}
          />
          <button
            type='button'
            onClick={modifyIdealNickname}
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
