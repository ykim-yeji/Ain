// DesktopPage.tsx
import React, { useState, useEffect } from 'react';
import { savePicture } from '../desktop_camera/savePicture';
import { useCamera } from '../desktop_camera/useCamera';
import { usePhotoCapture } from '../desktop_camera/usePhotoCapture';
import { CreateIdealPersonPage } from './CreateIdealPerson';

export const DesktopPage = () => {
  const [idealPersons, setIdealPersons] = useState<IdealPerson[] | null>(null);
  const [selectedIdealPersonImage, setSelectedIdealPersonImage] = useState('');
  const { videoRef, isCameraOn, startCamera, stopCamera } = useCamera();
  const { image, takePicture } = usePhotoCapture(videoRef, selectedIdealPersonImage);
  const [isPictureTaken, setIsPictureTaken] = useState(false);
  const [idealPersonCount, setIdealPersonCount] = useState<number | null>(null);
  const [showIntro, setShowIntro] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const itemsPerPage = 3;

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
        const response = await fetch('https://bad7e4c4-8676-4672-86a2-212cf9b3de90.mock.pstmn.io/api/ideal-people/count');
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
    // idealPersons 상태가 설정되고, 배열이 비어있지 않은 경우
    if (idealPersons && idealPersons.length > 0) {
      // 첫 번째 이상형의 이미지를 선택
      setSelectedIdealPersonImage(idealPersons[0].idealPersonImage);
    }
  }, [idealPersons]);

  useEffect(() => {
    if (idealPersonCount === 0) {
      return;
    }

    const fetchIdealPersons = async () => {
      try {
        const response = await fetch('https://bad7e4c4-8676-4672-86a2-212cf9b3de90.mock.pstmn.io/api/ideal-people');
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
    setShowIntro(false);
  };

  if (idealPersonCount === 0) {
    return <CreateIdealPersonPage/>;
  }

  if (showIntro) {
    return (
      <div className="intro-page w-full h-full flex flex-col justify-center items-center" style={{ textAlign: 'center'}}>
        <h1 className="text-white text-2xl mb-5" style={{ fontWeight: 'bold' }}>아인과 함께 사진을 찍어요!</h1>
        <div className="flex justify-center items-center mb-7">
            <img src="./gif/camera_start.gif" className="w-[60%]" />
        </div>
        <p className="text-gray-300 text-xl mb-4">아인과 멋진 사진을 남기고 싶다면, <br/>카메라 권한을 허용해 주세요!</p>
        <button onClick={handleStartCamera} 
          className='w-[200px] h-12 mb-2 bg-[#AB42CF] rounded-full text-center text-white text-xl shadow-md'>
            카메라 시작
        </button>
      </div>
    );
  }

  interface IdealPerson {
    idealPersonId: number;
    idealPersonNickname: string;
    idealPersonImage: string;
    idealPersonRank: number;
   }

  const handleNextClick = () => {
    // 다음 페이지로 이동
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevClick = () => {
    // 이전 페이지로 이동
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  // 현재 페이지에 해당하는 이상형 목록 계산
  const currentPageIdealPersons = idealPersons?.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const cameraImgStyle = {
    cursor: 'pointer',
    width: isClicked ? '60px' : '64px', // 클릭 시 작아졌다 커지는 효과
    height: isClicked ? '60px' : '64px',
    transition: 'all 0.2s ease', // 부드러운 전환 효과
  };

  return (
    <div className="flex flex-col justify-center items-center" style={{ height: "calc(100vh)", overflowY: "auto" }}>
      <div className="relative w-10/12">
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
      <div className='flex flex-row justify-center items-center space-x-10'>
        <button onClick={handlePrevClick}>
              <img src="./icon/angle_left_white.png" alt="이전" className='w-6'/>
          </button>
        {isCameraOn && (
          <div className="mt-8 mb-8" style={{ height: "85px", overflowX: "auto", display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", paddingLeft: "5px" }}>
            {currentPageIdealPersons &&
              currentPageIdealPersons.map((idealPerson, index) => (
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
        <button onClick={handleNextClick}>
              <img src="./icon/angle_left_white.png" alt="다음" className='w-6' style={{ transform: 'scaleX(-1)' }} />
          </button>
      </div>
      <div className='flex flex-row justify-center items-center space-x-32'>
        {isCameraOn ? (
            isPictureTaken ? (
                <button onClick={handleSavePicture}>사진 저장</button> // 사진 저장 버튼
            ) : (
              <img
                  src={isHovering ? "./icon/camera_start2.png" : "./icon/camera_start.png"} // 마우스 오버 시 이미지 변경
                  alt="사진 촬영"
                  onClick={takePicture}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  style={cameraImgStyle}
                />
            )
        ) : (
            <button onClick={startCamera}></button> // 카메라 시작 버튼
        )}
    </div>
      
    </div>
  );
};