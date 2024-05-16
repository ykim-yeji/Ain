'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faComments, faCamera } from '@fortawesome/free-solid-svg-icons';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import modalStore from '@/store/modalStore';
import userStore from '@/store/userStore';
import IdealDetailModal from '../modal/IdealDetailModal';
import { Router } from 'next/router';
import Swal from 'sweetalert2';

export default function Navigation() {
  const router = useRouter();
  const pathName = usePathname();
  const [showOverlay, setShowOverlay] = useState<boolean>(false);

  const [isLogin] = userStore((state) => [state.isLogin]);

  const {
    navOverlay,
    toggleNavOverlay,
    setNicknameModalState,
    idealDetailModalOpen,
    setIdealDetailModalFalse,
    setHideIdealListFalse,
    setHideIdealListTrue,
    setHeaderDropDownFalse,
  } = modalStore();

  const { setIsLogin } = userStore();

  const modalClose = () => {
    setIdealDetailModalFalse();
    setHideIdealListFalse();
    setHeaderDropDownFalse();
    console.log(idealDetailModalOpen);
  };

  const needToLoginChat = () => {
    Swal.fire({
      text: "채팅을 이용하시려면 로그인해주세요.",
      icon: "info"
    });
    router.push('/login');
  };

  const needToLoginCamera = () => {
    Swal.fire({
      text: "카메라를 이용하시려면 로그인해주세요.",
      icon: "info"
    });
    router.push('/login');
  };

  return (
    pathName !== '/chat/chatroom' && (
      <div className='flex justify-around bottom-0 left-0 right-0 py-3 w-full bg-[#5F0F7A] '>
        <div className='flex justify-center'>
          {/* <Link href='/chat' onClick={modalClose}>
            <div
              className='flex 
 flex-col cursor-pointer'
            >
              <FontAwesomeIcon
                style={{ color: pathName === '/chat' ? '#C776E3' : 'white' }}
                icon={faComments}
                size='xl'
              />
              <div style={{ color: pathName === '/chat' ? '#C776E3' : 'white' }} className='text-sm'>
                Chat
              </div>
            </div>
          </Link> */}

          {/* 아래는 회원이냐 아니냐에 따라 접근을 막는 코드 */}
          {isLogin === true ? (
            <Link
              href='/chat'
              onClick={() => {
                setHeaderDropDownFalse();
                setIdealDetailModalFalse();
                setHideIdealListFalse();
              }}
            >
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
            <div
              className='flex flex-col cursor-pointer'
              onClick={() => {
                needToLoginChat();
              }}
            >
              <FontAwesomeIcon style={{ color: 'white' }} icon={faComments} size='xl' />
              <div style={{ color: 'white' }} className='text-sm'>
                Chat
              </div>
            </div>
          )}
        </div>
        <div className='flex justify-center'>
          <Link
            href='/'
            onClick={() => {
              setHeaderDropDownFalse();
              setIdealDetailModalFalse();
              setHideIdealListFalse();
            }}
          >
            <div className='flex flex-col cursor-pointer'>
              <FontAwesomeIcon
                style={{
                  color:
                    pathName === '/' || pathName === '/create' || pathName === 'loading' || pathName === 'result'
                      ? '#C776E3'
                      : 'white',
                }}
                icon={faHouse}
                size='xl'
              />
              <div
                style={{
                  color:
                    pathName === '/' || pathName === '/create' || pathName === 'loading' || pathName === 'result'
                      ? '#C776E3'
                      : 'white',
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
          {isLogin === true ? (
            <Link
              href='/photo'
              onClick={() => {
                setHeaderDropDownFalse();
                setIdealDetailModalFalse();
                setHideIdealListFalse();
              }}
            >
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
            <div
              className='flex flex-col cursor-pointer'
              onClick={() => {
                needToLoginCamera();
              }}
            >
              <FontAwesomeIcon style={{ color: 'white' }} icon={faCamera} size='xl' />
              <div style={{ color: 'white' }} className='text-sm'>
                Photo
              </div>
            </div>
          )}

          {/* <Link href='/photo' onClick={setHeaderDropDownFalse}>
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
          </Link> */}
        </div>
        {navOverlay && (
          <div
            onClick={setNicknameModalState}
            className='absolute top-0 left-0 w-full h-full bg-black opacity-70 z-0'
          />
        )}
      </div>
    )
  );
}
