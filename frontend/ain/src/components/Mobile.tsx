import React, { useRef, useState } from 'react';

export const MobilePage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setIsCameraOn(true);
      }
    } catch (error) {
      console.error("카메라 접근에 실패했습니다.", error);
    }
  };

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
        
        // 카메라 스트림 정지
        const stream = videoRef.current.srcObject as MediaStream;
        if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach((track: MediaStreamTrack) => {
            track.stop();
          });
          setIsCameraOn(false);
        }
      }
    }
  };

  const savePicture = () => {
    if (image) {
      const link = document.createElement('a');
      link.href = image;
      link.download = 'captured_image.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="relative">
      <h1>모바일 기기로 접근했습니다.</h1>
      {isCameraOn ? (
            <button onClick={takePicture}>사진 촬영</button>
          ) : (
            <button onClick={startCamera}>카메라 시작</button>
          )}
      {image ? (
        <>
          <img src={image} className="w-full" alt="Captured" />
          <button onClick={savePicture}>사진 저장</button>
        </>
      ) : (
        <>
          <video ref={videoRef} className="w-full"></video>
          {isCameraOn && (
            <img
              src="/test.png"
              className="absolute bottom-0 left-0 w-auto h-auto pointer-events-none"
              alt="Overlay"
            />
          )}
        </>
      )}
    </div>
  );
};
