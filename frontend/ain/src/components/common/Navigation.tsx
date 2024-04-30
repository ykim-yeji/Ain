'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faComments, faCamera } from '@fortawesome/free-solid-svg-icons';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

import modalStore from '@/store/modalStore';
import userStore from '@/store/userStore';

export default function Navigation() {
  const pathName = usePathname();
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  // const isLogin = useState<boolean>(userStore().isLogin);

  const [isLogin] = userStore((state) => [state.isLogin]);

  const { navOverlay, toggleNavOverlay, setNicknameModalState } = modalStore();

  const { setIsLogin } = userStore();

  // const confirm = () => {
  //   alert(isLogin);
  // };

  // useEffect(() => {
  //   const unsubscribe = userStore.subscribe(() => {
  //     setIsLogin();
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  return (
    <div className='flex justify-around bottom-0 left-0 right-0 py-3 w-full bg-[#5F0F7A]'>
      <div className='flex justify-center'>
        {/* <button type='button' onClick={() => confirm()}>
          이즈로긴?
        </button> */}

        <Link href='/chat'>
          <div
            className='flex 
 flex-col cursor-pointer'
          >
            <FontAwesomeIcon
              style={{ color: pathName.startsWith('/chat') ? '#C776E3' : 'white' }}
              icon={faComments}
              size='xl'
            />
            <div style={{ color: pathName.startsWith('/chat') ? '#C776E3' : 'white' }} className='text-sm'>
              Chat
            </div>
          </div>
        </Link>

        {/* 아래는 회원이냐 아니냐에 따라 접근을 막는 코드 */}
        {/* {isLogin === true ? (
          <Link href='/chat'>
            <div
              className='flex 
 flex-col cursor-pointer'
            >
              <FontAwesomeIcon
                style={{ color: pathName.startsWith('/chat') ? '#C776E3' : 'white' }}
                icon={faComments}
                size='xl'
              />
              <div style={{ color: pathName.startsWith('/chat') ? '#C776E3' : 'white' }} className='text-sm'>
                Chat
              </div>
            </div>
          </Link>
        ) : (
          <div className='flex flex-col cursor-pointer' onClick={() => alert('채팅을 이용하시려면 로그인해주세요.')}>
            <FontAwesomeIcon style={{ color: 'white' }} icon={faComments} size='xl' />
            <div style={{ color: 'white' }} className='text-sm'>
              Chat
            </div>
          </div>
        )} */}
      </div>
      <div className='flex justify-center'>
        <Link href='/'>
          <div className='flex flex-col cursor-pointer'>
            <FontAwesomeIcon
              style={{
                color: pathName === '/' || pathName === '/create' || pathName === 'loading' ? '#C776E3' : 'white',
              }}
              icon={faHouse}
              size='xl'
            />
            <div
              style={{
                color: pathName === '/' || pathName === '/create' || pathName === 'loading' ? '#C776E3' : 'white',
              }}
              className='text-sm'
            >
              Home
            </div>
          </div>
        </Link>
      </div>
      <div className='flex justify-center'>
        {/* 아래는 회원이냐 아니냐에 따라 접근을 막는 코드 */}
        {/* {isLogin === true ? (
          <Link href='/photo'>
            <div className='flex flex-col cursor-pointer'>
              <FontAwesomeIcon
                style={{ color: pathName.startsWith('/photo') ? '#C776E3' : 'white' }}
                icon={faCamera}
                size='xl'
              />
              <div style={{ color: pathName.startsWith('/photo') ? '#C776E3' : 'white' }} className='text-sm'>
                Photo
              </div>
            </div>
          </Link>
        ) : (
          <div className='flex flex-col cursor-pointer' onClick={() => alert('사진촬영을 하시려면 로그인해주세요.')}>
            <FontAwesomeIcon style={{ color: 'white' }} icon={faCamera} size='xl' />
            <div style={{ color: 'white' }} className='text-sm'>
              Photo
            </div>
          </div>
        )} */}

        <Link href='/photo'>
          <div className='flex flex-col cursor-pointer'>
            <FontAwesomeIcon
              style={{ color: pathName.startsWith('/photo') ? '#C776E3' : 'white' }}
              icon={faCamera}
              size='xl'
            />
            <div style={{ color: pathName.startsWith('/photo') ? '#C776E3' : 'white' }} className='text-sm'>
              Photo
            </div>
          </div>
        </Link>
      </div>
      {navOverlay && (
        <div onClick={setNicknameModalState} className='absolute top-0 left-0 w-full h-full bg-black opacity-70 z-0' />
      )}
    </div>
  );
}
