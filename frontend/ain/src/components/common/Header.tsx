'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <div>
      <div className='z-10 w-full text-sm  '>

          <div className='flex justify-between '>
            <div>
              <Link href='/'>
                <Image src='/ainlogo.svg' alt='Ain Logo' className='ml-3' width={100} height={24} priority />
              </Link>
            </div>
            <div className='flex items-center'>
              <Link href='/login'>
                <Image src='/login.svg' alt='로그인' className='mr-6 cursor-pointer' width={25} height={25} priority />
              </Link>
            </div>
          </div>
      </div>
    </div>
  );
}