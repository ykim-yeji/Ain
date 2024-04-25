'use client';

import React from 'react';
import { useState, useEffect } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import useModalStore from '@/store/modalStore';

import UserNicknameModifyModal from '@/components/modal/UserNicknameModify';

export default function Header() {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [dropDown, setDropDown] = useState<boolean>(false);

  const router = useRouter();

  const { nicknameModalState, setNicknameModalState } = useModalStore();

  useEffect(() => {
    const handleRouteChange = () => {
      setDropDown(false);
    };
  });

  const handleLoginState = () => {
    if (isLogin === true) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  };

  const handleDropDown = () => {
    if (dropDown === true) {
      setDropDown(false);
    } else {
      setDropDown(true);
    }
  };

  // const handleNicknameModal = () => {
  //   if (nicknameModalState === true) {
  //     setNicknameModalState(false);
  //   } else {
  //     setNicknameModalState(true);
  //   }
  //   setDropDown(false);
  // };

  const logout = () => {
    setIsLogin(false);
    setDropDown(false);
  };

  return (
    <div>
      <div className='z-10 w-full text-sm'>
        <div className='flex justify-between'>
          <div>
            {/* 로그인 상태 테스트 중 나중에 변경 */}
            {/* <Link href='/'>
                <Image src='/ainlogo.svg' alt='Ain Logo' className='ml-3' width={100} height={24} priority />
              </Link> */}
            <div onClick={handleLoginState}>
              <Image src='/ainlogo.svg' alt='Ain Logo' className='ml-3' width={120} height={30} priority />
            </div>
          </div>
          <div className='flex items-center relative'>
            {isLogin ? (
              <div className='flex flex-col'>
                <div className='flex' onClick={handleDropDown}>
                  <div>
                    <Image
                      src='/islogin.svg'
                      alt='로그인한 상태'
                      className='mr-2 cursor-pointer'
                      width={28}
                      height={28}
                      priority
                    />
                  </div>

                  {dropDown ? (
                    <div className='flex items-center'>
                      <Image
                        // src='/역삼각형.svg'
                        src='/삼각형.svg'
                        alt='드롭다운 활성화'
                        className='mr-6 cursor-pointer'
                        width={10}
                        height={10}
                        priority
                      />
                    </div>
                  ) : (
                    <div className='flex items-center'>
                      <Image
                        // src='/삼각형.svg'
                        src='/역삼각형.svg'
                        alt='드롭다운 활성화'
                        className='mr-6 cursor-pointer'
                        width={10}
                        height={10}
                        priority
                      />
                    </div>
                  )}
                </div>
                {dropDown ? (
                  <div className='absolute top-10 right-4'>
                    <div>
                      <button
                        type='button'
                        // onClick={handleNicknameModal}
                        onClick={setNicknameModalState}
                        className='mt-4 bg-white rounded-full text-xs w-28 px-2 py-2 font-semibold font-sans'
                        style={{ fontSize: '13px' }}
                      >
                        닉네임 수정
                      </button>
                    </div>
                    <div>
                      <button
                        type='button'
                        onClick={logout}
                        className='mt-1 bg-white rounded-full text-xs w-28 px-2 py-2 font-semibold font-sans'
                        style={{ fontSize: '13px' }}
                      >
                        로그아웃
                      </button>
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </div>
            ) : (
              <Link href='/login'>
                <Image src='/login.svg' alt='로그인' className='mr-6 cursor-pointer' width={20} height={20} priority />
              </Link>
            )}
          </div>
        </div>
      </div>

      {nicknameModalState && (
        <div>
          <UserNicknameModifyModal closeModal={setNicknameModalState} />
        </div>
      )}
    </div>
  );
}
