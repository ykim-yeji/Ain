'use client';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

import userStore from '@/store/userStore';
import { useState, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import useModalStore from '@/store/modalStore';
import useIdealStore from '@/store/idealStore';

import IdealNicknameModify from './IdealNicknameModify';

interface Props {
  closeModal: any;
  tempNickname: string;
  tempFullName: string;
  tempPersonId: number | undefined;
  tempThreadId: string;
}

export default function IdealDetailModal({
  closeModal,
  tempNickname,
  tempFullName,
  tempPersonId,
  tempThreadId,
}: Props) {
  const router = useRouter();
  const { accessToken } = userStore();
  const koreanRegex = /^[가-힣]*$/;

  const {
    headerDropDown,
    setHeaderDropDown,
    idealDropDown,
    setIdealDropDownTrue,
    setIdealDropDownFalse,
    idealNicknameModalState,
    setIdealNicknameModalState,
  } = useModalStore();

  const {
    selectedIdealName,
    selectedIdealId,
    selectedIdealThreadId,
    setTempIdealName,
    setTempIdealId,
    setTempIdealThreadId,
  } = useIdealStore();

  const [dropDown, setDropDown] = useState(false);

  const handleDropDown = () => {
    if (headerDropDown === true) {
      setHeaderDropDown();
    }
    if (idealDropDown === false) {
      setIdealDropDownTrue();
    } else {
      setIdealDropDownFalse();
    }
  };

  const confirmTemp = () => {
    alert(selectedIdealName);
    alert(selectedIdealId);
    alert(selectedIdealThreadId);
  };

  const goToChatroom = () => {
    router.push('/chat/chatroom');
  };

  const deleteMyIdeal = async () => {
    setIdealDropDownFalse();
    alert('이상형이 삭제되었습니다');
    // sweetAlert를 쓴다면?
    // Swal.fire({
    //   title: '이상형을 삭제하시겠습니까?',
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonColor: '#ff7169',
    //   cancelButtonColor: '#afafaf',
    //   confirmButtonText: '네',
    //   cancelButtonText: '아니요',
    // }).then(async (result) => {
    //   if (result.isConfirmed) {
    //     try {
    //       const response = await fetch(
    //         `${process.env.NEXT_PUBLIC_API_URL}`,
    //         {
    //           method: 'DELETE',
    //           headers: {
    //             // authorization,
    //           },
    //         },
    //       );
    //       if (response.ok) {
    //         router.push(`/chat`);
    //       } else {
    //         // Swal.fire({
    //         //   title: '이상형 삭제를 실패하였습니다.',
    //         //   icon: 'error',
    //         //   confirmButtonColor: '#ff7169',
    //         // });
    //         alert("이상형 삭제 실패")
    //       }
    //     } catch (error) {
    //       /* empty */
    //     }
    //     Swal.fire({
    //       title: '이상형이 삭제되었습니다.',
    //       icon: 'success',
    //       confirmButtonColor: '#ff7169',
    //     });
    //   }
    // });
    // };
  };

  return (
    <div>
      {/* <div className='fixed bottom-1/2 transform -translate-x-1/2 translate-y-1/2 flex flex-col'> */}
      <div className='fixed bottom-1/2 transform -translate-x-1/2 translate-y-1/2 flex flex-col'>
        <div className='flex justify-between mt-4'>
          <img onClick={closeModal} className='ml-[20%] cursor-pointer' src='./icon/back_icon.svg' />
          <div className='mr-[20%]'>
            <img onClick={handleDropDown} className='cursor-pointer relative' src='./icon/three_dots.svg' />
            {idealDropDown ? (
              <div className='absolute top-8 right-3'>
                <div>
                  <button
                    type='button'
                    onClick={setIdealNicknameModalState}
                    className='mt-4 bg-white border-2 text-xs w-32 px-2 py-3 font-semibold font-sans'
                    style={{ fontSize: '16px' }}
                  >
                    별명 수정
                  </button>
                </div>
                <div>
                  <button
                    type='button'
                    onClick={deleteMyIdeal}
                    className='border-2 border-t-1 bg-white  text-xs w-32 px-2 py-3 font-semibold font-sans'
                    style={{ fontSize: '16px' }}
                  >
                    이상형 삭제
                  </button>
                </div>
                <div>
                  <button type='button' onClick={confirmTemp}>
                    확인하세요
                  </button>
                </div>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className='flex flex-col justify-center items-center mt-2 w-120 h-144'>
          <img
            className='rounded-[10%] mb-2 mt-4 object-cover'
            src='https://ih1.redbubble.net/image.319291377.1118/st,small,507x507-pad,600x600,f8f8f8.u2.jpg'
            style={{ width: '60%', height: '60%', objectFit: 'cover' }}
          />
          <div className='text-white text-[40px] mt-4'>{tempNickname}</div>
          <button
            type='button'
            onClick={goToChatroom}
            className='mt-2 mb-10 w-56 border-solid rounded-3xl px-2 py-2 mx-4 text-[24px] text-white'
            style={{ backgroundColor: '#BE44E9' }}
          >
            채팅하기
          </button>
        </div>
      </div>

      <div>
        {idealNicknameModalState && (
          <div className='static'>
            <div
              className='overlay justify-center fixed top-0 w-full h-full bg-black opacity-70 z-40 max-w-md -translate-x-1/2'
              onClick={setIdealNicknameModalState}
            />
            <div className='h-screen'>
              <div className='z-40 absolute h-full w-full '>
                <IdealNicknameModify
                  closeModal={setIdealNicknameModalState}
                  tempNickname={tempNickname}
                  tempFullName={tempFullName}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
