'use client';

import Link from 'next/link';

import { useRouter } from 'next/navigation';

import useModalStore from '@/store/modalStore';
import useUserStore from '@/store/userStore';

export default function Home() {
  const router = useRouter();
  const { nicknameModalState, setNicknameModalState, testNum, increaseTestNum } = useModalStore();

  const { isLogin, accessToken } = useUserStore();

  const confirm = () => {
    console.log('zustand상태확인');
    // console.log(nicknameModalState);
    // console.log(testNum);
    console.log(isLogin);
    console.log(accessToken);
  };

  const increase = () => {
    increaseTestNum();
  };

  const routerRedirect = () => {
    router.push('/photo');
  };

  return (
    <main className='mt-[65px] mb-[68px] relative w-full h-full text-center flex flex-col justify-evenly items-center pb-10'>
      <img src="./gif/main_heart.gif" className='w-[80%]' />
      <div className='text-xl text-white leading-relaxed'>당신의 아인을 <br />지금 만나러 가세요</div>
      <Link href='/create'>
      <button className='w-[200px] h-12 mb-2 bg-[#AB42CF] rounded-full text-center text-white text-xl shadow-md'>만나러 가기</button>
      </Link>
      {/* <button
        type='button'
        onClick={confirm}
        className='mb-10 text-md font-semibold px-7 py-1 rounded-full text-white'
        style={{ backgroundColor: '#BE44E9' }}
      >
        주스탠드 테스트
      </button> */}

      {/* <button
        type='button'
        onClick={increase}
        className='mb-10 text-md font-semibold px-7 py-1 rounded-full text-white'
        style={{ backgroundColor: '#BE44E9' }}
      >
        testNum 1 증가
      </button>  */}
      {/* <button
        type='button'
        onClick={routerRedirect}
        className='mb-10 text-md font-semibold px-7 py-1 rounded-full text-white'
        style={{ backgroundColor: '#BE44E9' }}
      >
        router.push 이동
      </button> */}
      <img src="./background/main_left.png" className='absolute w-[40%] bottom-0 left-0' />
      <img src="./background/main_right.png" className='absolute w-[45%] bottom-0 right-0'/>
    </main>
  );
}
