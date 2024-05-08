// useCamera.ts
import { useRef, useState } from 'react';

export const useCamera = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);

  const startCamera = async () => {
    if (isCameraOn) return; // 이미 카메라가 켜져 있으면 아무것도 하지 않음
  
    try {
      const constraints = {
        video: {
          width: { ideal: 720 },
          height: { ideal: 1280 },
          facingMode: "user"
        }
      };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraOn(true);
      }
    } catch (error) {
      console.error("카메라 접근에 실패했습니다.", error);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null; // 스트림 참조 해제
      setIsCameraOn(false);
      videoRef.current.pause();
    }
  };

  return { videoRef, isCameraOn, startCamera, stopCamera };
};
