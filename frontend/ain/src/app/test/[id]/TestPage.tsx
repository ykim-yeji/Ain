interface Props {
  pageId: string;
}

export default function TestPage({ pageId }: Props) {
  return (
    <div>
      TEST PAGE
      <div>이 글의 번호는 {pageId}번입니다. </div>
    </div>
  );
}
