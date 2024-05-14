// usePhotoCapture.ts
import { useState } from 'react';

export function usePhotoCapture(videoRef: React.RefObject<HTMLVideoElement>, selectedIdealPersonImage: string, setSelectedIdealPersonImage: (image: string) => void) {
  const [image, setImage] = useState<string | null>(null);

  const takePicture = async () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const context = canvas.getContext('2d');

      if (context) {
        context.drawImage(videoRef.current, 0, 0);
        const myImage = new Image();
        myImage.crossOrigin = "anonymous";
        myImage.src = selectedIdealPersonImage;
        await new Promise((resolve) => {
          myImage.onload = resolve;
        });

        const imageWidth = 250;
        const imageHeight = 250;
        const imageXPosition = canvas.width - imageWidth;
        const imageYPosition = canvas.height - imageHeight;

        context.drawImage(myImage, imageXPosition, imageYPosition, imageWidth, imageHeight);

        const imageUrl = canvas.toDataURL('image/png');
        setImage(imageUrl);

        // 선택된 이미지 초기화
        setSelectedIdealPersonImage('');
      }
    }
  };

  return { image, setImage, takePicture };
}