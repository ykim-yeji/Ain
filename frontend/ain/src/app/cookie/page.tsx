import { cookies } from 'next/headers';

export default async function Page() {
  const cookieStore = cookies();
  async function create() {
    //   'use server';

    ('use server');
    // cookies().set('name', '리액트');
    // cookies().set('value', '넥스트');
    cookies().set({
      name: 'name',
      value: 'lee',
      httpOnly: true,
      path: '/',
    });
  }

  create();
  return <div>{cookies.name}</div>;
}
