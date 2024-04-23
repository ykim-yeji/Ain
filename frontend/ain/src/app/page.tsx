import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className='text-center'>
      <div
        className="relative z-[0] flex place-items-center 
      before:absolute  before:w-full before:-translate-x-1/2 before:rounded-full  before:from-white before:to-transparent before:blur-2xl before:content-[''] 
      after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-['']
       before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 
      
      after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px]
      
      
      sm:after:w-[240px] 
      
      
      before:lg:h-[360px]"
      >
        <Image
          className='relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert'
          src='/cuteHeart.png'
          alt='귀여운 하트'
          width={180}
          height={37}
          priority
        />
      </div>
      <div className='text-md text-white'>당신의 아인을</div>
      <div className='mb-4 text-md text-white'>지금 만나러 가세요</div>
      <Link href='/create'>
        <button
          type='button'
          className='mb-10 text-md font-semibold px-7 py-1 rounded-full text-white drop-shadow-lg'
          style={{ backgroundColor: '#BE44E9' }}
        >
          생성하기
        </button>
      </Link>
    </main>
  );
}
