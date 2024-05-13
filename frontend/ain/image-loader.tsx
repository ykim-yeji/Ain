interface Props {
  src: string;
  width: number;
  quality?: number;
}

export default function imageLoader({ src, width, quality }: Props) {
  //   const params = [`imwidth = ${width}`];
  //   return `${src}?${params}`;
  return `https://myain.co.kr/${src}?w=${width}`;
  //   return `http://localhost:3000/${src}?w=${width}`;
}
