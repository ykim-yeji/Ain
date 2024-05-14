import TestPage from './TestPage';

const array = [
  {
    id: 1,
    content: '안녕',
  },
  {
    id: 2,
    content: '하세요',
  },
  {
    id: 3,
    content: '싸피',
  },
  {
    id: 4,
    content: '밥',
  },
  {
    id: 6,
    content: '맛있어요',
  },
];

export async function generateStaticParams() {
  return array.map((data) => ({
    id: data.id.toString(),
  }));
}

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  // 매개변수로 전달된 id에 해당하는 데이터를 찾습니다.
  const data = array.find((item) => item.id.toString() === id);

  return (
    <div className='mt-40'>
      {data ? (
        <div>
          <div>제 id는 {data.id}번입니다.</div>
          <div>제 content는 {data.content}입니다.</div>
        </div>
      ) : (
        <div>해당하는 데이터가 없습니다.</div>
      )}
    </div>
  );
}
