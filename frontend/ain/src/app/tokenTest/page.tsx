'use client';

import { useEffect, useState } from 'react';

import useUserStore from '@/store/userStore';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Page() {
  const { accessToken, refreshToken } = useUserStore();
  const [newAccessToken, setNewAccessToken] = useState();
  const [newRefreshToken, setNewRefreshToken] = useState();

  const { setAccessToken } = useUserStore();

  useEffect(() => {
    const reissueTokens = async () => {
      try {
        const res = await fetch(`${API_URL}/auth/reissue`, {
          method: 'POST',
          credentials: 'include',
        });

        if (res.ok) {
          const result = await res.json();
          console.log('결과', result);
          const tempAccessToken = res.headers.get('Authorization');
          if (tempAccessToken !== undefined && tempAccessToken !== null) {
            setAccessToken(tempAccessToken);
          }
          console.log('@@$!@$!@$@#!', accessToken);
          // const tempRefreshToken = res.headers.get('Set-Cookie');

          // console.log(newAccessToken);
          // console.log(newRefreshToken);

          // return newAccessToken;
        } else {
          alert('실패');
          console.log(res.status);
          console.log('대실패');
          //   return;
        }
      } catch (error) {
        alert('실패2');
        console.log(error);
        return;
      }
    };

    reissueTokens();
  }, []);

  return <div>토큰 리이슈</div>;
}
