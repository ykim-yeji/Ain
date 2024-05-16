// MobilePage.tsx
import React, { useState, useEffect, CSSProperties } from 'react';
import { savePicture } from '../mobile_camera/savePicture';
import { useCamera } from '../mobile_camera/useCamera';
import { usePhotoCapture } from '../mobile_camera/usePhotoCapture';
import { CreateIdealPersonPage } from './CreateIdealPerson';
import Carousel from './Carousel';
import useUserStore from "@/store/userStore";

export const MobilePage = () => {
  const [idealPersons, setIdealPersons] = useState<IdealPerson[] | null>(null);
  const [selectedIdealPersonImage, setSelectedIdealPersonImage] = useState('');
  const { videoRef, isCameraOn, startCamera, stopCamera } = useCamera();
  const { image, setImage, takePicture } = usePhotoCapture(videoRef, selectedIdealPersonImage, setSelectedIdealPersonImage);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isPictureTaken, setIsPictureTaken] = useState(false);
  const [idealPersonCount, setIdealPersonCount] = useState<number | null>(null);
  const [showIntro, setShowIntro] = useState(true); // 카메라 기능 소개글 표시 상태 추가
  const [currentPage, setCurrentPage] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const { accessToken } = useUserStore();
  
  const itemsPerPage = 3;

  useEffect(() => {
    if (image) {
      setIsPictureTaken(true);
    }
  }, [image]);

  useEffect(() => {
    if (accessToken) {
      fetchIdealPersonsCount();
    }
  }, [accessToken]);

  const handleSavePicture = () => {
    if (image) {
      savePicture(image);
      setIsPictureTaken(false);
    }
  };


  useEffect(() => {
    if (idealPersons && idealPersons.length > 0) {
      setSelectedIdealPersonImage(idealPersons[0].idealPersonImageUrl);
    }
  }, [idealPersons]);

  const totalPages = Math.ceil((idealPersons?.length ?? 0) / itemsPerPage);

  const handleNextClick = () => {
    // 다음 페이지로 이동, 마지막 페이지에서는 첫 번째 페이지로
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
  };

  const handlePrevClick = () => {
    // 이전 페이지로 이동, 첫 번째 페이지에서는 마지막 페이지로
    setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
  };

  // 이상형 목록 조회
  const fetchIdealPersons = async () => {
    if (accessToken !== null && accessToken !== undefined && accessToken !== '') {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ideal-people`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
          },
          // cache: 'no-store',
          // mode: 'cors',
          // credentials: 'include',
        });
        const data = await response.json();
        if (data.code === 200 && data.status === 'OK') {
          setIdealPersons(data.data.idealPeople);
          if (data.data.idealPeople.length > 0) {
            setSelectedIdealPersonImage(data.data.idealPeople[0].idealPersonImageUrl);
          }
        }
      } catch (error) {
        console.error('이상형 정보 가져오기 실패:', error);
      }
    }
  };

  // 이상형 개수 조회
const fetchIdealPersonsCount = async () => {
  if (!accessToken) {
    console.log('Access token is not available.');
    return;
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ideal-people/count`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    console.log('Full response data:', data); // 응답 데이터 전체를 로그로 출력

    // 데이터 구조 확인 후, 필드 접근 경로 업데이트
    if (data.code === 200 && data.status === 'OK' && data.data && typeof data.data.idealPersonCount !== 'undefined') {
      console.log('Setting idealPersonCount:', data.data.idealPersonCount);
      setIdealPersonCount(data.data.idealPersonCount);
    } else {
      console.error('Data is missing the idealPeopleCount field or response error:', data);
    }
  } catch (error) {
    console.error('Failed to fetch ideal person count:', error);
  }
};

  // 현재 페이지에 해당하는 이상형 목록 계산
  const currentPageIdealPersons = idealPersons
    ? idealPersons.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
    : [];

  const selectIdealPersonImage = (idealPersonImage: string) => {
    if (!isPictureTaken) {
      setSelectedIdealPersonImage(idealPersonImage);
    }
  };

  const handleStartCamera = () => {
    startCamera();
    setShowIntro(false);
    setIsPictureTaken(false);
    setSelectedIdealPersonImage(idealPersons?.[0].idealPersonImageUrl || '');
  };

  const handleGoBack = () => {
    handleStartCamera();
    setIsPictureTaken(false);
    setImage(null);
    setSelectedIdealPersonImage(idealPersons?.[0].idealPersonImageUrl || '');
    fetchIdealPersons();
    fetchIdealPersonsCount();
  };

  if (idealPersonCount === 0) {
    return <CreateIdealPersonPage />;
  }

  if (showIntro) {
    // 소개 페이지 표시
    return (
      <div
        className='intro-page w-full h-full flex flex-col justify-center items-center'
        style={{ textAlign: 'center' }}
      >
        <h1 className='text-white text-2xl mb-5' style={{ fontWeight: 'bold' }}>
          아인과 함께 사진을 찍어요!
        </h1>
        <div className='flex justify-center items-center mb-7'>
          <img src='./gif/camera_start.gif' className='w-[70%]' />
        </div>
        <p className='text-gray-300 text-xl mb-4'>
          아인과 멋진 사진을 남기고 싶다면, <br />
          카메라 권한을 허용해 주세요!
        </p>
        <button
          onClick={handleStartCamera}
          className='w-[200px] h-12 mb-2 bg-[#AB42CF] rounded-full text-center text-white text-xl shadow-md'
        >
          카메라 시작
        </button>
      </div>
    );
  }

  const cameraImgStyle = {
    cursor: 'pointer',
    width: isClicked ? '45px' : '50px', // 클릭 시 작아졌다 커지는 효과
    height: isClicked ? '45px' : '50px',
    transition: 'all 0.2s ease', // 부드러운 전환 효과
  };

  return (
    <div className="flex flex-col justify-center items-center" style={{ height: "calc(100vh - 65px - 68px)", overflowY: "auto" }}>
      <div className="relative w-[75%]" style={{ border: isCameraOn ? '4px solid white' : 'none' }}>
        {image ? (
          <img src={image} className="w-full" alt="Captured" /> // Captured image
        ) : (
          <video ref={videoRef} autoPlay playsInline muted className="w-full h-auto"/> // Video stream
        )}
        {isCameraOn && selectedIdealPersonImage && (
          <div style={{ position: 'absolute', right: '0', bottom: '0' }}>
            <img
              src={selectedIdealPersonImage}
              className={`w-auto h-auto pointer-events-none ${isPictureTaken ? 'pointer-events-none' : ''}`}
              alt='Overlay'
              style={{ width: '134px', height: '134px' }}
            />
            {/* Speech bubble */}
            <div style={{ 
              position: "absolute", 
              bottom: "140px", 
              right: "12px", 
              background: "rgba(95,15,122,0.8)", 
              borderRadius: "10px", 
              padding: "5px 10px", 
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
              display: "flex", 
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              color: "white" 
            }}>
              오늘 멋진데요~?
            </div>
          </div>
        )}
      </div>
      <div className={`flex flex-row justify-center items-center space-x-2 ${isPictureTaken ? 'pointer-events-none' : ''}`} style={{width: 'calc(3 * 120px)', justifyContent: 'space-between' }}>
        {/* Previous button */}
        <button onClick={handlePrevClick}>
          <img src="./icon/angle_left_white.png" alt="이전" className='w-6'/>
        </button>
  
        {/* Carousel component */}
        {isCameraOn && (
          <Carousel
            items={currentPageIdealPersons?.map((p) => ({
              idealPersonImageUrl: p.idealPersonImageUrl,
              idealPersonNickname: p.idealPersonNickname
            })) || []}
            selectedImage={selectedIdealPersonImage}
            onSelectImage={selectIdealPersonImage}
          />
        )}
  
        {/* Next button */}
        <button onClick={handleNextClick}>
          <img src="./icon/angle_left_white.png" alt="다음" className='w-6' style={{ transform: 'scaleX(-1)' }} />
        </button>
      </div>
      <div className='flex flex-row justify-center items-center mb-5'>
        {isCameraOn && (
          <div className='flex flex-row justify-center items-center space-x-5'>
            {/* Go back button */}
            <button
              onClick={handleGoBack}
              disabled={!isPictureTaken}
              className={`px-2 py-2 rounded-lg transition-colors duration-300 flex items-center space-x-2 ${
                isPictureTaken ? 'bg-[#AB42CF] text-white' : 'bg-gray-400 text-gray-600'
              }`}
            >
              <img
                src={isPictureTaken ? './icon/camera_back_white.png' : './icon/camera_back_gray.png'}
                alt="돌아가기"
                className="w-5 h-5"
              />
              <span>다시찍기</span>
            </button>
            {/* Capture button */}
            {!isPictureTaken ? (
              <img
                src={isHovering ? "./icon/camera_start2.png" : "./icon/camera_start.png"}
                alt="사진 촬영"
                onClick={takePicture}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                style={cameraImgStyle}
              />
            ) : (
              <div className="success-icon" style={{ width: '40px', height: '40px', fontSize: '4.5px', fontWeight:'bold' }}>
                <div className="success-icon__tip"></div>
                <div className="success-icon__long"></div>
              </div>
            )}
            {/* Save button */}
            <button
              onClick={handleSavePicture}
              disabled={!isPictureTaken}
              className={`px-2 py-2 rounded-lg transition-colors duration-300 flex items-center space-x-2 ${
                isPictureTaken ? 'bg-[#AB42CF] text-white' : 'bg-gray-400 text-gray-600'
              }`}
            >
              <img
                src={isPictureTaken ? './icon/camera_save_white.png' : './icon/camera_save_gray.png'}
                alt="저장하기"
                className="w-5 h-5"
              />
              <span>저장하기</span>
            </button>
          </div>
        )}
  
        {/* Start camera button (only shown when camera is off) */}
        {!isCameraOn && (
          <button onClick={startCamera}>카메라 시작</button>
        )}
      </div>
    </div>
  );
};

interface IdealPerson {
  idealPersonId: number;
  idealPersonFullName: string;
  idealPersonNickname: string;
  idealPersonImageUrl: string;
  idealPersonRank: number;
  idealPersonThreadId: string;
}
