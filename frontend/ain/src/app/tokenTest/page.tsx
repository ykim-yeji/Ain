'use client';

import ReissueToken from '@/components/oauth/ReissueToken';

import { useEffect, useState } from 'react';

export default function Page() {
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    const getToken = async () => {
      try {
        const res = await ReissueToken();
        if (res && res !== undefined && res !== null) {
          setToken(res);
          console.log(res);
        } else {
          console.log('실패');
        }
      } catch (error) {
        console.log(error);
      }
    };

    getToken();
  }, []);

  return <div>{token}</div>;
}
