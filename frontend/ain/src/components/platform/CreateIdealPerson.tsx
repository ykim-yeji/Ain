'use client';

import { motion } from "framer-motion";
import React from 'react';
import Link from 'next/link';
import styled, { keyframes } from 'styled-components'; // 여기에 추가

const variants = {
  animate: {
    y: [0, 10, 0], 
    transition: {
      duration: 1,
      times: [0, 0.2, 1],
      ease: ["linear", "easeOut"],
      repeat: Infinity,
      repeatDelay: 0.5,
      repeatType: "reverse" as "reverse", // 타입 단언을 사용하여 오류 해결
    }
  }
};

const gradient = keyframes`
  0% {
    color: #B4B4B8;
  }
  50% {
    color: #F2EFE5;
  }
  100% {
    color: #B4B4B8;
  }
`;

const GradientText = styled(motion.p)`
  animation: ${gradient} 5s ease-in-out infinite;
`;

export const CreateIdealPersonPage = () => {
  return (
    <div className="create-ideal-person-page px-[50px] flex flex-col justify-center items-center w-full h-full" style={{ textAlign: 'center',  overflow: 'hidden' }}>
       <h1 className="text-white text-2xl mb-5" style={{ fontWeight: 'bold' }}>생성된 아인이 없어요...</h1>
      <div className="flex justify-center items-center mb-7">
          <img src="./gif/no_data.gif" className="w-[80%] rounded-full" />
      </div>
      <GradientText className="text-gray-300 text-xl mb-7" style={{ fontWeight: "bold" }}>
        아인을 만든 후 <br />소중한 순간을 기록하세요!
      </GradientText>
      <div className="flex justify-center items-center mb-7">
          <motion.img
            src="./image/chevron_down2.png"
            className="w-[20%]"
            variants={variants}
            animate="animate"
          />
        </div>
      <Link href="/create" passHref>
        <button
          className='w-[200px] h-12 mb-2 bg-[#AB42CF] rounded-full text-center text-white text-xl shadow-md'
          style={{ color: 'white', fontWeight: 'bold' }} // 텍스트 스타일 조정
        >
          생성하기
        </button>
      </Link>
    </div>
  );
};
