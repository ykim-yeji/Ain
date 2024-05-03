// MobilePage.tsx
import React, { useState, useEffect, CSSProperties } from 'react';
import { savePicture } from '../camera/savePicture';
import { useCamera } from '../camera/useCamera';
import { usePhotoCapture } from '../camera/usePhotoCapture';
import { CreateIdealPersonPage } from './CreateIdealPerson';

export const MobilePage = () => {
  const [idealPersons, setIdealPersons] = useState<IdealPerson[] | null>(null);
  const [selectedIdealPersonImage, setSelectedIdealPersonImage] = useState('');
  const { videoRef, isCameraOn, startCamera, stopCamera } = useCamera();
  const { image, takePicture } = usePhotoCapture(videoRef, selectedIdealPersonImage);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isPictureTaken, setIsPictureTaken] = useState(false);
  const [idealPersonCount, setIdealPersonCount] = useState<number | null>(null);
  const [showIntro, setShowIntro] = useState(true); // 카메라 기능 소개글 표시 상태 추가

  useEffect(() => {
    if (image) {
      setIsPictureTaken(true);
    }
  }, [image]);

  const handleSavePicture = () => {
    if (image) {
      savePicture(image);
      setIsPictureTaken(false);
    }
  };

  useEffect(() => {
    const fetchIdealPersonsCount = async () => {
      try {
        const response = await fetch('https://8ca20285-b1c8-4df8-af3b-2002f85a8f22.mock.pstmn.io/api/ideal-people/count');
        const data = await response.json();
        if (data.code === 200 && data.status === 'CREATED') {
          setIdealPersonCount(data.data.idealPersonCount);
        }
      } catch (error) {
        console.error('이상형 개수 정보 가져오기 실패:', error);
      }
    };
    fetchIdealPersonsCount();
  }, []);

  useEffect(() => {
    if (idealPersonCount === 0) {
      return;
    }

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
  }, [idealPersonCount]);

  const selectIdealPersonImage = (idealPersonImage: string) => {
    setSelectedIdealPersonImage(idealPersonImage);
  };

  const handleStartCamera = () => {
    startCamera();
    setShowIntro(false); // 카메라 시작 시 소개글 숨기기
  };

  if (idealPersonCount === 0) {
    return <CreateIdealPersonPage/>;
  }

  if (showIntro) {
    // 소개 페이지 표시
    return (
      <div className="intro-page w-full h-full flex flex-col justify-center items-center" style={{ textAlign: 'center'}}>
        <h1 className="text-white text-2xl mb-5" style={{ fontWeight: 'bold' }}>아인과 함께 사진을 찍어요!</h1>
        <div className="flex justify-center items-center mb-7">
            <img src="./gif/camera_start.gif" className="w-[70%]" />
        </div>
        <p className="text-gray-300 text-xl mb-7">아인과 멋진 사진을 남기고 싶다면, <br/>카메라 권한을 허용해 주세요!</p>
        <button onClick={handleStartCamera} 
          className='w-[200px] h-12 mb-2 bg-[#AB42CF] rounded-full text-center text-white text-xl shadow-md'>
            카메라 시작
        </button>
      </div>
    );
  }

  return (
    <div className="relative" style={{ height: "calc(100vh - 헤더 높이 - 네비게이션 바 높이)", overflowY: "auto" }}>
      {!isCameraOn && <h1 style={{ marginTop: "20px" }}>카메라 기능을 사용하여 이상형의 사진을 찍어보세요.</h1>}
      <div className="relative w-10/12">
        {isCameraOn ? (
          isPictureTaken ? (
            <button onClick={handleSavePicture}>사진 저장</button> // 사진 저장 버튼
          ) : (
            <button onClick={takePicture}>사진 촬영</button> // 사진 촬영 버튼
          )
        ) : (
          <button onClick={startCamera}>카메라 시작</button> // 카메라 시작 버튼
        )}
        {image ? (
          <img src={image} className="w-full" alt="Captured" /> // 캡처된 이미지 표시
        ) : (
          <video ref={videoRef} autoPlay muted /> // 비디오 스트림 표시
        )}
        {isCameraOn && selectedIdealPersonImage && (
          <div style={{ position: "absolute", right: "0", bottom: "0" }}>
            <img
              src={selectedIdealPersonImage}
              className="w-auto h-auto pointer-events-none"
              alt="Overlay"
              style={{ width: "134px", height: "134px" }}
            />
          </div>
        )}
      </div>
      {isCameraOn && (
        <div className="mt-4" style={{ height: "85px", overflowX: "auto", display: "flex" }}>
          {/* 케러셀 이미지 표시 */}
          <div style={{ display: "flex", alignItems: "center", paddingLeft: "5px" }}>
            {idealPersons &&
              idealPersons.map((idealPerson, index) => (
                <img
                  key={idealPerson.idealPersonId}
                  src={idealPerson.idealPersonImage}
                  className="w-auto h-auto cursor-pointer"
                  onClick={() => selectIdealPersonImage(idealPerson.idealPersonImage)}
                  alt={idealPerson.idealPersonNickname}
                  style={{ marginRight: "5px", width: "80px", height: "80px", objectFit: "cover" }}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );   
}  

interface IdealPerson {
 idealPersonId: number;
 idealPersonNickname: string;
 idealPersonImage: string;
 idealPersonRank: number;
}
