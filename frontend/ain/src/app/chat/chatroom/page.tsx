'use client';

export default function ChatRoomPage() {
  return <div className="relative w-full h-full">
    <div className="absolute top-0 w-full h-[70px] bg-inherit border-b-2 "></div>
    <div className="absolute bottom-0 w-full h-[70px] bg-inherit">
      <input type="text" placeholder="메세지 입력"/>
    </div>
  </div>;
}
