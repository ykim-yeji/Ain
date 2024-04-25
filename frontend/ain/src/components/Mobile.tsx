// MobilePage.tsx
import React from 'react';
import { savePicture } from './camera/savePicture';
import { useCamera } from './camera/useCamera';
import { usePhotoCapture } from './camera/usePhotoCapture';

export const MobilePage = () => {
  const { videoRef, isCameraOn, startCamera, stopCamera } = useCamera();
  const { image, takePicture } = usePhotoCapture(videoRef);

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
          <button onClick={() => savePicture(image)}>사진 저장</button>
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
