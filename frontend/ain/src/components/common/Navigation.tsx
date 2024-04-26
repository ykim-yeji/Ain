'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faComments, faCamera } from '@fortawesome/free-solid-svg-icons';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

import modalStore from '@/store/modalStore';

export default function Navigation() {
  const pathName = usePathname();
  const [showOverlay, setShowOverlay] = useState<boolean>(false);

  const { navOverlay, toggleNavOverlay, setNicknameModalState } = modalStore();

  return (
    <div className='flex justify-around bottom-0 left-0 right-0 py-3 w-full bg-[#5F0F7A]'>
      <div className='flex justify-center'>
        <Link href='/chat'>
          <div
            className='flex 
          flex-col cursor-pointer'
          >
            <FontAwesomeIcon
              style={{ color: pathName.startsWith('/chat') ? '#C776E3' : 'white' }}
              icon={faComments}
              size='xl'
            />
            <div style={{ color: pathName.startsWith('/chat') ? '#C776E3' : 'white' }} className='text-sm'>
              Chat
            </div>
          </div>
        </Link>
      </div>
      <div className='flex justify-center'>
        <Link href='/'>
          <div className='flex flex-col cursor-pointer'>
            <FontAwesomeIcon
              style={{
                color: pathName === '/' || pathName === '/create' || pathName === 'loading' ? '#C776E3' : 'white',
              }}
              icon={faHouse}
              size='xl'
            />
            <div
              style={{
                color: pathName === '/' || pathName === '/create' || pathName === 'loading' ? '#C776E3' : 'white',
              }}
              className='text-sm'
            >
              Home
            </div>
          </div>
        </Link>
      </div>
      <div className='flex justify-center'>
        <Link href='/photo'>
          <div className='flex flex-col cursor-pointer'>
            <FontAwesomeIcon
              style={{ color: pathName.startsWith('/photo') ? '#C776E3' : 'white' }}
              icon={faCamera}
              size='xl'
            />
            <div style={{ color: pathName.startsWith('/photo') ? '#C776E3' : 'white' }} className='text-sm'>
              Photo
            </div>
          </div>
        </Link>
      </div>
      {navOverlay && (
        <div onClick={setNicknameModalState} className='absolute top-0 left-0 w-full h-full bg-black opacity-70 z-0' />
      )}
    </div>
  );
}
