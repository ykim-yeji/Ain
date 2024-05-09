// useCamera.ts
import { useRef, useState, useEffect } from 'react';

export const useCamera = () => {
  const videoRef = useRef<HTMLVideoElement>(null!);
  const [isCameraOn, setIsCameraOn] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
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

  useEffect(() => {
    // 컴포넌트가 언마운트될 때 카메라 스트림 중지
    return () => {
      stopCamera();
    };
  }, []);

  return { videoRef, isCameraOn, startCamera, stopCamera };
};
