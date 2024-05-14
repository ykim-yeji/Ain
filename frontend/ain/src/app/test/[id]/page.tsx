import TestPage from './TestPage';

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      <TestPage pageId={params.id} />
    </div>
  );
}
