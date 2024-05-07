'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ChatRoomPage() {

  const [isResetModalOpen, setIsResetModalOpen] = useState<boolean>(false)
  const [createdSendMessage, setCreatedSendMessage] = useState<string>('')
  const [sendMessage, setSendMessage] = useState<string>('')
  const [createdReceiveMessage, setCreatedReceiveMessage] = useState<string>('')
  const [receiveMessage, setReceiveMessage] = useState<string>('')

  return <div className="relative w-full h-full "  onClick={() => setIsResetModalOpen(false)}>
    <div className="relative top-0 w-full h-[70px] bg-inherit flex justify-between items-center shadow-md">
      <Link href='/chat'><img src="../icon/go_back.png" className="w-[40px] ml-2"/></Link>
      <h2 className="text-2xl text-white tracking-widest">한태빈</h2>
      <button onClick={(e) => {e.stopPropagation(); setIsResetModalOpen(!isResetModalOpen)}}><img src="../icon/menu.png" className="w-[40px] mr-2"/></button>
      {isResetModalOpen &&
      <button onClick={(e) => e.stopPropagation()} className='absolute top-[55px] right-0 w-[140px] h-[40px] bg-white text-black '>채팅 내역 초기화</button>}
    </div>
    <div className="absolute bottom-0 w-full h-[70px] bg-[#5F0F7A] flex justify-center items-center px-4">
      <input type="text" placeholder="아인과 대화를 나눠보세요" className="w-[80%] h-[45px] bg-[#F0D5FA] rounded-full px-4 placeholder:text-[#CCB7D3] outline-none"/>
      <button className="w-[45px] h-[45px] rounded-full bg-[#B85FD6] ml-4 flex items-center justify-center ">
        <img src="../icon/arrow_send.png" className="w-[30px]"/></button>
    </div>
  </div>;
}
