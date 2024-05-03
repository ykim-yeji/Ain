import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from "framer-motion";

const variants = {
  animate: {
    y: [0, 10, 0], 
    transition: {
      duration: 1,
      times: [0, 0.2, 1],
      ease: ["linear", "easeOut"],
      repeat: Infinity,
      repeatDelay: 0.5,
      repeatType: "reverse" as "reverse",
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
  animation: ${gradient} 3s ease-in-out infinite;
`;

const handleCopyUrlToClipboard = async () => {
  try {
      const url = window.location.origin;
      await navigator.clipboard.writeText(url);
      alert('URL이 클립보드에 복사되었습니다.');
  } catch (error) {
      console.error('클립보드에 복사를 실패했습니다.', error);
      alert('클립보드 복사 실패');
  }
};

export const DesktopPage = () => {
    return (
      <div className='w-full h-full flex flex-col justify-center px-[50px]' style={{ textAlign: 'center'}}>
         <h1 className="text-white text-2xl mb-5" style={{ fontWeight: 'bold' }}>모바일로 접속해주세요!</h1>
         <div className="flex justify-center items-center mb-7">
            <img src="./gif/mobile-camera.gif" className="w-[80%] rounded-full" />
        </div>
        <GradientText className="text-gray-300 text-xl mb-7">모바일로 접속해 아인과 함께<br />아름다운 순간을 촬영해봐요!</GradientText>
        <div className="flex justify-center items-center mb-7">
          <motion.img
            src="./image/chevron-down2.png"
            className="w-[20%]"
            variants={variants}
            animate="animate"
          />
        </div>
        <div
          className="w-[220px] h-[50px] relative mx-auto cursor-pointer" // cursor-pointer 클래스 적용
          onClick={handleCopyUrlToClipboard}
        >
          <img
            src="./image/purple-button.png"
            className="w-full h-full"
            alt="Copy URL"
          />
          <div
            className="absolute w-full h-full flex items-center justify-center top-0 left-0"
            style={{ color: 'white', fontWeight: 'bold' }}
          >
            URL 복사
          </div>
        </div>
      </div>
    );
};
