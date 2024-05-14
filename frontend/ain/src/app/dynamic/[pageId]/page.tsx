import TestPage from './TestPage';

export default function Page({ params }: any) {
  return (
    <div className='mt-60'>
      <TestPage pageId={params.pageId} />
    </div>
  );
}
