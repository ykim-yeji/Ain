'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <div>
      <div className='z-10 w-full max-w-5xl items-center  font-mono text-sm  '>
        <div
          className='left-0 top-0 w-full border-gray-300
   pt-1 backdrop-blur-3xl '
        >
          <div className='flex justify-between '>
            <div>
              <Link href='/'>
                <Image src='/ainlogo.svg' alt='Ain Logo' className='ml-3' width={100} height={24} priority />
              </Link>
            </div>
            <div className='flex items-center'>
              <Link href='/login'>
                <Image src='/login.svg' alt='로그인' className='mr-6 cursor-pointer' width={20} height={20} priority />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
