'use client';

import Link from 'next/link';
import React from 'react';
import { useState, KeyboardEvent, useRef, useEffect } from 'react';
import useUserStore from "@/store/userStore";
import useIdealStore from "@/store/idealStore"
import useMessagesStore from '@/store/chatStore';

export default function ChatRoomPage() {

  const { accessToken } = useUserStore();
  const {
    selectedIdealName,
    selectedIdealId,
    selectedIdealThreadId,
    selectedIdealImageUrl
  } = useIdealStore();
  const { messages, addMessage, clearMessages } = useMessagesStore()

  const [isResetModalOpen, setIsResetModalOpen] = useState<boolean>(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);

  const [sendMessage, setSendMessage] = useState<string>('');

  const sendAndReceiveMessage = async () => {
    if (!sendMessage.trim()) return; // 메세지가 비어있는 경우 전송하지 않음

    const writeTime = new Date();
    const hours = writeTime.getHours().toString().padStart(2, '0'); // 시간
    const minutes = writeTime.getMinutes().toString().padStart(2, '0'); // 분
    const sendTime = `${hours}:${minutes}`; // 시간과 분을 합쳐서 형식에 맞게 변환
    console.log(`Message: ${sendMessage}, Created at: ${sendTime}`); // 콘솔에 메세지와 작성 시간 출력

    const userMessageId = Math.random().toString(36).substring(2, 9); // 임의의 고유 ID 생성
    addMessage({ id: userMessageId, sender: 'user', message: sendMessage, time: sendTime })
    
    setSendMessage('');

    if (accessToken !== null) {

      try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chats/ideal-people/${selectedIdealId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ` + accessToken,
          },
          body: JSON.stringify({ memberChatMessage: sendMessage }),
          });

          const data = await response.json();
          console.log(data);
          const receiveMessage: string = data.data.idealPersonChatMessage
          const receiveId: string = data.data.idealPersonChatMessageId
          const ChatTime: string = data.data.idealPersonChatTime
          const [receiveDate, receiveTime] = ChatTime.split(' ');
          addMessage({ id: receiveId, sender: 'assistant', message: receiveMessage, time: receiveTime })
          
      } catch (error) {
          console.error('Failed to send message:', error);
      }
  }

  }

  // 엔터 키 누를 때 메세지 전송
  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      sendAndReceiveMessage();
    }
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const messageClear = async () => {

    if (accessToken !== null) {

      try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chats/ideal-people/${selectedIdealId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ` + accessToken,
          },
          body: JSON.stringify({ idealPersonThreadId: selectedIdealThreadId }),
          });

          const data = await response.json();
          console.log(data);
          if (data.code == 200) {
            clearMessages()
          }
          
      } catch (error) {
          console.error('Failed to send message:', error);
      }
  }

  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]); // 메시지 목록이 업데이트될 때마다 실행


  return <div className="relative w-full h-full"  onClick={() => setIsResetModalOpen(false)}>
    {isDetailModalOpen &&
    <div className='absolute z-20 w-full h-full bg-[rgba(0,0,0,0.6)] flex justify-center items-center' onClick={() => setIsDetailModalOpen(false)}>
      <div className='relative w-[300px] h-[300px] rounded-full bg-white' onClick={(e) => {e.stopPropagation()}} >
        <img src={selectedIdealImageUrl} className='absolute top-0 left-0 w-[300px] h-[300px] rounded-full'/>
      </div>
      </div>}
    <div className="absolute top-0 w-full max-w-md h-[70px] bg-inherit flex justify-between items-center shadow-md">
      <Link href='/chat'><img src="../icon/go_back.png" className="w-[40px] ml-2"/></Link>
      <h2 className="text-2xl text-white tracking-widest">{selectedIdealName}</h2>
      <button onClick={(e) => {e.stopPropagation(); setIsResetModalOpen(!isResetModalOpen)}}><img src="../icon/menu.png" className="w-[40px] mr-2"/></button>
      {isResetModalOpen &&
      <button onClick={(e) => {e.stopPropagation(); messageClear()}} className='absolute z-10 top-[55px] right-2 w-[140px] h-[40px] bg-white text-black '>채팅 내역 초기화</button>}
    </div>
    <div className='flex flex-col w-full h-full'>
      <div className='flex-none w-full h-[70px] '></div>
      <div className='grow overflow-scroll'>
          {messages.map((msg, index) => (
            <div key={index} >
              {msg.sender === "user" ? (
              <div className='flex justify-end m-4'>
                <div className='relative max-w-[250px] bg-[#F0D5FA] text-sm rounded-md p-2'>{msg.message}
                  <small className='absolute bottom-0 left-[-35px] text-[10px] text-gray-200'>{msg.time}</small>
                </div>
              </div>
              ) : (
              <div className='flex justify-start items-start m-4'>
                <button onClick={() => setIsDetailModalOpen(true)}
                className='relative w-[30px] h-[30px] rounded-full bg-white mr-2'>
                  <img src={selectedIdealImageUrl} className='absolute top-0 left-0 w-[30px] h-[30px] rounded-full' />
                </button>
                <div className='flex flex-col '>
                  <p className='text-xs '>{selectedIdealName}</p>
                  <div className='relative max-w-[250px] bg-[rgba(95,15,122,0.7)] text-sm text-white rounded-md p-2'>{msg.message}
                  <small className='absolute bottom-0 right-[-35px] text-[10px] text-gray-200'>{msg.time}</small>
                </div>
                </div>
              </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
      </div>
      <div className='flex-none w-full h-[70px]'></div>
    </div>
    <div className="fixed bottom-0 w-full max-w-md h-[70px] bg-[#5F0F7A] flex justify-center items-center px-4">
      <input type="text" placeholder="아인과 대화를 나눠보세요" className="w-[80%] h-[45px] bg-[#F0D5FA] rounded-full px-4 placeholder:text-[#CCB7D3] outline-none"
      value={sendMessage}
      onChange={(e) => setSendMessage(e.target.value)}
      onKeyPress={handleKeyPress}/>
      <button onClick={sendAndReceiveMessage} className="w-[45px] h-[45px] rounded-full bg-[#B85FD6] ml-4 flex items-center justify-center ">
        <img src="../icon/arrow_send.png" className="w-[30px]"/></button>
    </div>
  </div>;
}
