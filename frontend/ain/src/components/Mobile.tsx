// MobilePage.tsx
import React, { useState, useEffect } from 'react';
import { savePicture } from './camera/savePicture';
import { useCamera } from './camera/useCamera';
import { usePhotoCapture } from './camera/usePhotoCapture';

// MobilePage.tsx
export const MobilePage = () => {
  const [idealPersons, setIdealPersons] = useState<IdealPerson[] | null>(null);
  const [selectedIdealPersonImage, setSelectedIdealPersonImage] = useState('');
  const { videoRef, isCameraOn, startCamera, stopCamera } = useCamera();
  const { image, takePicture } = usePhotoCapture(videoRef, selectedIdealPersonImage); // Pass as prop

 useEffect(() => {
  const fetchIdealPersons = async () => {
   try {
     const response = await fetch('https://8ca20285-b1c8-4df8-af3b-2002f85a8f22.mock.pstmn.io/api/ideal-people');
     const data = await response.json();
     if (data.code === 201 && data.status === 'CREATED') {
      setIdealPersons(data.data.idealPersons);
     }
   } catch (error) {
     console.error('이상형 정보 가져오기 실패:', error);
   }
  };
  fetchIdealPersons();
 }, []);

 const selectIdealPersonImage = (idealPersonImage: string) => {
  setSelectedIdealPersonImage(idealPersonImage);
 };

 return (
  <div className='relative'>
   <h1>모바일 기기로 접근했습니다.</h1>
   {isCameraOn ? (
    <button onClick={takePicture}>사진 촬영</button>
   ) : (
    <button onClick={startCamera}>카메라 시작</button>
   )}
   {image ? (
    <>
     <img src={image} className='w-full' alt='Captured' />
     <button onClick={() => savePicture(image)}>사진 저장</button>
    </>
   ) : (
    <>
     <video ref={videoRef} className='w-full'></video>
     {isCameraOn && (
      <div className='absolute bottom-0 left-0'>
        {idealPersons && idealPersons.map((idealPerson) => (
         <img
           key={idealPerson.idealPersonId}
           src={idealPerson.idealPersonImage}
           className='w-auto h-auto cursor-pointer'
           onClick={() => selectIdealPersonImage(idealPerson.idealPersonImage)}
           alt={idealPerson.idealPersonNickname}
           style={{ margin: '0 5px' }}
           />
        ))}
      </div>
     )}
     {selectedIdealPersonImage && (
      <img
        src={selectedIdealPersonImage}
        className='absolute bottom-0 left-0 w-auto h-auto pointer-events-none'
        alt='Overlay'
      />
     )}
    </>
   )}
  </div>
 );
};

interface IdealPerson {
 idealPersonId: number;
 idealPersonNickname: string;
 idealPersonImage: string;
 idealPersonRank: number;
}