// MobilePage.tsx
import React, { useState, useEffect, CSSProperties } from 'react';
import { savePicture } from '../camera/savePicture';
import { useCamera } from '../camera/useCamera';
import { usePhotoCapture } from '../camera/usePhotoCapture';

export const MobilePage = () => {
 const [idealPersons, setIdealPersons] = useState<IdealPerson[] | null>(null);
 const [selectedIdealPersonImage, setSelectedIdealPersonImage] = useState('');
 const { videoRef, isCameraOn, startCamera, stopCamera } = useCamera();
 const { image, takePicture } = usePhotoCapture(videoRef, selectedIdealPersonImage); // Pass as prop
 const [carouselIndex, setCarouselIndex] = useState(0); // 케러셀의 인덱스 상태
 const [isPictureTaken, setIsPictureTaken] = useState(false); // 사진 촬영 여부 상태 추가

 useEffect(() => {
  if (image) {
   setIsPictureTaken(true); // 사진 촬영 완료 시 상태 변경
  }
 }, [image]);

 const handleSavePicture = () => {
  if (image) {
   savePicture(image);
   setIsPictureTaken(false); // 사진 저장 후 촬영 상태 초기화
  }
 };

 // 케러셀을 위한 스타일
 const carouselStyle: CSSProperties = {
  display: 'flex',
  overflowX: 'scroll',
  padding: '10px',
  gap: '10px',
 };

 // 케러셀 아이템을 위한 스타일
 const carouselItemStyle = {
  flex: '0 0 auto',
  width: '100px', // 적절한 크기 조정이 필요할 수 있습니다.
 };

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
    <div className='relative' style={{height: 'calc(100vh - 헤더 높이 - 네비게이션 바 높이)', overflowY: 'auto'}}>
      <h1 style={{marginTop: '20px'}}>모바일 기기로 접근했습니다.</h1>
      <div className='relative w-10/12'>
        {isCameraOn ? (
          isPictureTaken ? (
            <button onClick={handleSavePicture}>사진 저장</button> // 사진 촬영 후 사진 저장 버튼으로 변경
          ) : (
            <button onClick={takePicture}>사진 촬영</button>
          )
        ) : (
          <button onClick={startCamera}>카메라 시작</button>
        )}
        {image ? (
          <img src={image} className='w-full' alt='Captured' />
        ) : (
          <video ref={videoRef} className='w-full'></video>
        )}
        {isCameraOn && selectedIdealPersonImage && ( // 사진이 촬영되었고, 선택된 이상형 이미지가 있을 경우에만 오른쪽 하단에 표시
          <div style={{ position: 'absolute', right: '0', bottom: '0' }}>
            <img
              src={selectedIdealPersonImage}
              className='w-auto h-auto pointer-events-none'
              alt='Overlay'
              style={{ width: '134px', height: '134px' }}
            />
          </div>
        )}
      </div>
      <div className='mt-4' style={{height: '85px', overflowX: 'auto', display: 'flex'}}> {/* 케러셀 화면 컨테이너의 위치 및 marginBottom 조정 */}
        <div style={{display: 'flex', alignItems: 'center', paddingLeft: '5px'}}>
          {idealPersons && idealPersons.map((idealPerson, index) => (
            <img
              key={idealPerson.idealPersonId}
              src={idealPerson.idealPersonImage}
              className='w-auto h-auto cursor-pointer'
              onClick={() => selectIdealPersonImage(idealPerson.idealPersonImage)}
              alt={idealPerson.idealPersonNickname}
              style={{marginRight: '5px', width: '80px', height: '80px', objectFit: 'cover'}}
            />
          ))}
        </div>
      </div>
    </div>
  );
}  

interface IdealPerson {
 idealPersonId: number;
 idealPersonNickname: string;
 idealPersonImage: string;
 idealPersonRank: number;
}