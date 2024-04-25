// usePhotoCapture.ts
import { useState } from 'react';

export const usePhotoCapture = (videoRef: React.RefObject<HTMLVideoElement>) => {
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
        myImage.src = '/test.png'; // 여기에 추가하고 싶은 이미지의 URL을 넣으세요.
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
