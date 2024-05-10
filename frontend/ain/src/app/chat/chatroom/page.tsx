'use client';

import Link from 'next/link';
import { useState, KeyboardEvent, useRef, useEffect } from 'react';

export default function ChatRoomPage() {

  const [isResetModalOpen, setIsResetModalOpen] = useState<boolean>(false)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false)

  const [sendMessage, setSendMessage] = useState<string>('')
  const [receiveMessage, setReceiveMessage] = useState<string>('')

  const [messages, setMessages] = useState<{id: String|null, sender: String, message: string, time: string}[]>([]);

  const sendAndReceiveMessage = async () => {
    if (!sendMessage.trim()) return; // 메세지가 비어있는 경우 전송하지 않음

    const writeTime = new Date();
    const hours = writeTime.getHours().toString().padStart(2, '0'); // 시간
    const minutes = writeTime.getMinutes().toString().padStart(2, '0'); // 분
    const formattedTime = `${hours}:${minutes}`; // 시간과 분을 합쳐서 형식에 맞게 변환
    console.log(`Message: ${sendMessage}, Created at: ${formattedTime}`); // 콘솔에 메세지와 작성 시간 출력

    setMessages([...messages, {id: null, sender: 'user', message: sendMessage, time: formattedTime }]);


    // 여기에서 백엔드 API로 메세지를 전송하는 fetch 요청을 구현하세요.
    // try {
    //   const response = await fetch('/api/send-message', { // 백엔드 API 엔드포인트 예시
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ message: sendMessage }),
    //   });

    //   const data = await response.json();
    //   // 응답으로 받은 메세지를 상태 변수에 저장
    //   setReceiveMessage(data.replyMessage);
    // } catch (error) {
    //   console.error('Failed to send message:', error);
    // }

    // 메세지 전송 후 입력 필드 초기화
    setSendMessage('');
  };

  // 엔터 키 누를 때 메세지 전송
  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      sendAndReceiveMessage();
    }
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]); // 메시지 목록이 업데이트될 때마다 실행

  useEffect(() => {
    const handleResize = () => {
      const { innerHeight: windowHeight } = window;
      const { offsetHeight } = document.documentElement;
      const isKeyboardOpen = windowHeight < offsetHeight;

      // 키보드가 열렸을 때 body 스타일을 조정
      document.body.style.paddingBottom = isKeyboardOpen
        ? `${offsetHeight - windowHeight}px`
        : '0';
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <div className="relative w-full h-full flex flex-col justify-between"  onClick={() => setIsResetModalOpen(false)}>
    {isDetailModalOpen &&
    <div className='absolute z-20 w-full h-full bg-[rgba(0,0,0,0.6)] flex justify-center items-center' onClick={() => setIsDetailModalOpen(false)}>
      <div className='relative w-[300px] h-[300px] rounded-full bg-white' onClick={(e) => {e.stopPropagation()}} >
        <img src="../image/taebin.png" className='absolute top-0 left-0 w-[300px] h-[300px] rounded-full'/>
      </div>
      </div>}
    <div className="fixed top-0 w-full max-w-md h-[70px] bg-inherit flex justify-between items-center shadow-md">
      <Link href='/chat'><img src="../icon/go_back.png" className="w-[40px] ml-2"/></Link>
      <h2 className="text-2xl text-white tracking-widest">한태빈</h2>
      <button onClick={(e) => {e.stopPropagation(); setIsResetModalOpen(!isResetModalOpen)}}><img src="../icon/menu.png" className="w-[40px] mr-2"/></button>
      {isResetModalOpen &&
      <button onClick={(e) => e.stopPropagation()} className='absolute z-10 top-[55px] right-2 w-[140px] h-[40px] bg-white text-black '>채팅 내역 초기화</button>}
    </div>
    <div className='w-full h-[70px]'></div>
    <div className='flex flex-col flex-grow overflow-y-auto'>
        {messages.map((msg, index) => (
          <div key={index} >
            {msg.sender === "assistant" ? (
            <div className='flex justify-end m-4'>
              <div className='relative max-w-[250px] bg-[#F0D5FA] text-sm rounded-md p-2'>{msg.message}
                <small className='absolute bottom-0 left-[-35px] text-[10px] text-gray-200'>{msg.time}</small>
              </div>
            </div>
            ) : (
            <div className='flex justify-start items-start m-4'>
              <button onClick={() => setIsDetailModalOpen(true)}
              className='relative w-[30px] h-[30px] rounded-full bg-white mr-2'>
                <img src="../image/taebin.png" className='absolute top-0 left-0 w-[30px] h-[30px] rounded-full' />
              </button>
              <div className='flex flex-col '>
                <p className='text-xs '>한태빈</p>
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
    <div className='w-full h-[70px]'></div>
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
