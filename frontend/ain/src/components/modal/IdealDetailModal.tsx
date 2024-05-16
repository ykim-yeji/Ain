'use client';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

import Swal from 'sweetalert2';

import { useRef, useState, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import useUserStore from '@/store/userStore';
import useModalStore from '@/store/modalStore';
import useIdealStore from '@/store/idealStore';

import IdealNicknameModify from './IdealNicknameModify';

interface Props {
  closeModal: any;
  // tempNickname: string;
  // tempFullName: string;
  tempPersonId: number | undefined;
  // tempThreadId: string;
  // tempImageUrl: string;
  setIsNicknameModified: any;
  isNicknameModified: number;
  // setTempNickname: any;
}

export default function IdealDetailModal({
  closeModal,
  // tempNickname,
  // tempFullName,
  tempPersonId,
  // tempThreadId,
  // tempImageUrl,
  setIsNicknameModified,
  isNicknameModified,
}: // setTempNickname,
Props) {
  const router = useRouter();
  const { accessToken } = useUserStore();
  const koreanRegex = /^[가-힣]*$/;

  const {
    headerDropDown,
    setHeaderDropDown,
    idealDetailModalOpen,
    setIdealDetailModalFalse,
    idealDropDown,
    hideIdealList,
    setHideIdealListFalse,
    setIdealDropDownTrue,
    setIdealDropDownFalse,
    idealNicknameModalState,
    setIdealNicknameModalState,
  } = useModalStore();

  const {
    selectedIdealName,
    selectedIdealFullName,
    selectedIdealId,
    selectedIdealThreadId,
    selectedIdealImageUrl,
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
    setIdealDropDownFalse();
    setIdealDetailModalFalse();
    setHideIdealListFalse();
    router.push('/chat/chatroom');
  };

  const deleteMyIdeal = async () => {
    setIdealDropDownFalse();
    // alert('이상형이 삭제되었습니다');
    // sweetAlert를 쓴다면?

    Swal.fire({
      title: '이상형을 삭제하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff7169',
      cancelButtonColor: '#afafaf',
      confirmButtonText: '네',
      cancelButtonText: '아니요',
      heightAuto: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log(`${API_URL}/ideal-person/${tempPersonId}`);
        console.log(accessToken);
        try {
          const response = await fetch(`${API_URL}/ideal-people/${tempPersonId}`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ` + accessToken,
            },
          });
          if (response.ok) {
            const result = await response.json();
            console.log(result);
            // router.push(`/chat`);
            if (result.code === 200) {
              setIdealDetailModalFalse();
              Swal.fire({
                title: '이상형이 삭제되었습니다.',
                icon: 'success',
                confirmButtonColor: '#ff7169',
                heightAuto: false,
              });
              setIsNicknameModified(isNicknameModified + 1);
              setHideIdealListFalse();
            } else {
              console.log(result.code, '번 에러발생');
            }
          } else {
            alert('이상형 삭제 실패');
            return;
          }
        } catch (error) {
          return;
        }
      }
    });
  };

  return (
    <div>
      <div className='fixed bottom-1/2 transform -translate-x-1/2 translate-y-1/2 flex flex-col'>
        <div className='flex justify-between'>
          <img onClick={closeModal} className=' cursor-pointer' src='./icon/back_icon.svg' />
          <div className=''>
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
                {/* <div> */}
                {/* <button type='button' onClick={confirmTemp}>
                    확인하세요
                  </button> */}
                {/* </div> */}
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className='flex flex-col justify-center items-center mt-2 w-120 h-144 '>
          <div className='justify-center mt-4 bg-white w-160 h-160 rounded-[10%] flex items-center'>
            <img
              className=' rounded-[10%] mb-8 mt-8 m-4 object-cover  '
              src={selectedIdealImageUrl}
              style={{ width: '100%', height: '80%', objectFit: 'cover' }}
            />
          </div>
          <div className='text-white text-[40px] mt-4'>{selectedIdealName}</div>
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
                  tempPersonId={tempPersonId}
                  setIsNicknameModified={setIsNicknameModified}
                  isNicknameModified={isNicknameModified}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
