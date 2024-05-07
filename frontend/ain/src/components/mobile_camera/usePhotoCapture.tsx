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
        // 촬영된 영상 프레임 그리기
        context.drawImage(videoRef.current, 0, 0);
  
        // 이미지 로드
        const myImage = new Image();
        myImage.crossOrigin = "anonymous";
        myImage.src = selectedIdealPersonImage;
        await new Promise((resolve) => {
          myImage.onload = resolve;
        });

        // 케러셀 이미지 크기 설정
        const imageWidth = 134;
        const imageHeight = 134;
        // 케러셀 이미지를 우측 하단에 위치시킴
        const imageXPosition = canvas.width - imageWidth; // X 좌표는 캔버스 너비에서 이미지 너비를 뺀 값
        const imageYPosition = canvas.height - imageHeight; // Y 좌표는 캔버스 높이에서 이미지 높이를 뺀 값

        // 선택된 이상형 이미지 삽입 (크기 및 위치 조정하여)
        context.drawImage(myImage, imageXPosition, imageYPosition, imageWidth, imageHeight);
  
        // 이미지 URL 생성 및 상태 업데이트
        const imageUrl = canvas.toDataURL('image/png');
        setImage(imageUrl);
      }
    }
  };
  return { image, takePicture };
};
