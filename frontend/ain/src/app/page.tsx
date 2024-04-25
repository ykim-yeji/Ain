import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className='text-center'>
      <Image
        className='dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert'
        src='/cuteHeart.png'
        alt='귀여운 하트'
        width={180}
        height={37}
        priority
      />

      <div className='text-md text-white'>당신의 아인을</div>
      <div className='mb-4 text-md text-white'>지금 만나러 가세요</div>
      <Link href='/create'>
        <button
          type='button'
          className='mb-10 text-md font-semibold px-7 py-1 rounded-full text-white'
          style={{ backgroundColor: '#BE44E9' }}
        >
          생성하기
        </button>
      </Link>
    </main>
  );
}
