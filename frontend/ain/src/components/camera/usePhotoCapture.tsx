// usePhotoCapture.ts
import { useState } from 'react';

export const usePhotoCapture = (videoRef: React.RefObject<HTMLVideoElement>, selectedIdealPersonImage: string) => {
  const [image, setImage] = useState<string | null>(null);

 const takePicture = async () => {
  if (videoRef.current) {
   const canvas = document.createElement('canvas');
   canvas.width = videoRef.current.videoWidth;
   canvas.height = videoRef.current.videoHeight;
   const context = canvas.getContext('2d');
   if (context) {
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
     
    // 이미지 로드
    const myImage = new Image();
    myImage.src = selectedIdealPersonImage; // 선택된 이상형 이미지 URL로 변경
    await new Promise((resolve) => {
     myImage.onload = resolve;
    });
     
    // 캔버스의 왼쪽 하단에 이미지 그리기
    context.drawImage(myImage, 0, canvas.height - myImage.height);
     
    // 이미지 URL 생성 및 상태 업데이트
    const imageUrl = canvas.toDataURL('image/png');
    setImage(imageUrl);
   }
   }
  }

 return { image, takePicture };
};