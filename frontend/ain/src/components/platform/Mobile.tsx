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
    <div className='relative' style={{height: 'calc(100vh - 헤더 높이 - 네비게이션 바 높이)', overflowY: 'auto'}}> {/* 전체 레이아웃의 높이 조정 및 스크롤 가능하도록 설정 */}
      <h1 style={{marginTop: '20px'}}>모바일 기기로 접근했습니다.</h1> {/* 상단 여백 추가 */}
      <div className='relative w-10/12' style={{ position: 'relative' }}> {/* 카메라 화면 및 선택한 이미지를 포함하는 컨테이너에 위치 조정을 위한 스타일 추가 */}
        {isCameraOn ? (
          <button onClick={takePicture}>사진 촬영</button>
        ) : (
          <button onClick={startCamera}>카메라 시작</button>
        )}
        {image ? (
          <img src={image} className='w-full' alt='Captured' /> // 'w-10/12'를 'w-full'로 변경하여 부모 컨테이너의 너비를 채우도록 함
        ) : (
          <video ref={videoRef} className='w-full'></video> // 여기도 마찬가지로 'w-10/12'를 'w-full'로 변경
        )}
        {selectedIdealPersonImage && (
          <div style={{ position: 'absolute', right: 0, bottom: 0 }}> {/* 선택한 이미지 위치 조정을 위한 컨테이너 추가 */}
            <img
              src={selectedIdealPersonImage}
              className='w-auto h-auto pointer-events-none'
              alt='Overlay'
            />
          </div>
        )}
      </div>
      <div className='mt-4' style={{height: '85px', overflowX: 'auto', display: 'flex'}}> {/* 케러셀 화면 컨테이너의 위치 및 marginBottom 조정 */}
        <div style={carouselStyle}>
          {idealPersons && idealPersons.map((idealPerson, index) => (
            <img
              key={idealPerson.idealPersonId}
              src={idealPerson.idealPersonImage}
              className='w-auto h-auto cursor-pointer'
              onClick={() => selectIdealPersonImage(idealPerson.idealPersonImage)}
              alt={idealPerson.idealPersonNickname}
              style={carouselItemStyle}
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
