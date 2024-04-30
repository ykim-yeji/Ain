'use client';

import React from 'react';
import Link from 'next/link'; // Next.js의 Link 컴포넌트를 임포트합니다.

export const CreateIdealPersonPage = () => {
  return (
    <div className="create-ideal-person-page" style={{ textAlign: 'center', padding: '50px' }}>
      <h1>이상형을 생성하세요!</h1>
      <p>나만의 이상형을 만들어 보세요. 다양한 조건과 특징으로 이상형을 설정할 수 있습니다.</p>
      <Link href="/create">
        <button>
          이상형 생성하기
        </button>
      </Link>
    </div>
  );
};