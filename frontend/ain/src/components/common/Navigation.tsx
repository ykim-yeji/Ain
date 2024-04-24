'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faComments, faCamera } from '@fortawesome/free-solid-svg-icons';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathName = usePathname();

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
            <FontAwesomeIcon style={{ color: pathName === '/' ? '#C776E3' : 'white' }} icon={faHouse} size='xl' />
            <div style={{ color: pathName === '/' ? '#C776E3' : 'white' }} className='text-sm'>
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
    </div>
  );
}