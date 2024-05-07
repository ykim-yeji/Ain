// useCamera.ts
import { useRef, useState } from 'react';

export const useCamera = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);

  const startCamera = async () => {
    try {
      // 데스크탑 환경을 위해 더 높은 해상도의 비디오 스트림 요청
      const constraints = {
        video: {
          width: { ideal: 720 }, // 이상적인 너비
          height: { ideal: 1280 }, // 이상적인 높이
          facingMode: "user" // 사용자 카메라 사용 (전면 카메라)
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
      tracks.forEach((track) => track.stop());
      setIsCameraOn(false);
      videoRef.current.pause(); // 촬영 종료 후 영상 일시정지
    }
  };

  return { videoRef, isCameraOn, startCamera, stopCamera };
};
