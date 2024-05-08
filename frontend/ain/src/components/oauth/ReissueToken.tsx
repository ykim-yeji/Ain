'use client';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function ReissueToken() {
  try {
    const res = await fetch(API_URL + `/auth/reissue`, {
      method: 'POST',
      headers: {
        'Set-Cookie': '',
      },
    });

    if (res.ok) {
      const result = await res.json();
      console.log(result);
      const newAccessToken = res.headers.get('Authorization');
      const newRefreshToken = res.headers.get('Set-Cookie');

      console.log(newAccessToken);
      console.log(newRefreshToken);

      return newAccessToken;
    } else {
      alert('실패');
      console.log(res.status);
      //   return;
    }
  } catch (error) {
    alert('실패2');
    console.log(error);
    return;
  }
}
