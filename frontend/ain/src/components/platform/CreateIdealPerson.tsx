'use client';

import React from 'react';
import Link from 'next/link'; // Next.js의 Link 컴포넌트를 임포트합니다.

export const CreateIdealPersonPage = () => {
  return (
    <div className="create-ideal-person-page" style={{ textAlign: 'center', padding: '50px' }}>
      <h1 className="text-white text-2xl mb-5">생성된 아인이 없어요...</h1>
      <div className="flex justify-center items-center mb-10">
          <img src="./image/no-data2.png" className="w-[90%]" />
      </div>
      <p className="text-white text-xl mb-14">아인을 만든 후 <br />소중한 순간을 기록하세요!</p>
      <Link href="/create">
      <button
        type='button'
        className='mb-6 text-md px-16 py-2 rounded-full text-white text-lg shadow-lg bg-purple-600'
      >
        생성하기
      </button>
      </Link>
    </div>
  );
};