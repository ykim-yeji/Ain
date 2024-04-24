'use client';

export default function Page() {
  const kakaoLogin = () => {
    alert('환영합니다 치킨님!');
  };

  return (
    <div className='text-center flex flex-col items-center'>
      <img className='mt-4' src='/rainbow-heart.gif' width={170} height={170} />
      <div className='text-2xl text-white mt-10'>
        <div>더 많은 기능을 이용하시려면</div>
        <div>로그인을 진행해 주세요</div>
      </div>
      <button onClick={kakaoLogin} className='mt-8'>
        <img src='/kakao.png' width={180} height={45} />
      </button>
      {/* <div className='flex mb-10'>
        <img className='mr-12' src='/left-cloud.png' width={200} />
        <img className='' src='/right-cloud.png' width={200} />
      </div> */}
    </div>
  );
}
