// DesktopPage.tsx
import React, { useState, useEffect } from 'react';
import { savePicture } from '../desktop_camera/savePicture';
import { useCamera } from '../desktop_camera/useCamera';
import { usePhotoCapture } from '../desktop_camera/usePhotoCapture';
import { CreateIdealPersonPage } from './CreateIdealPerson';
import Carousel from './Carousel';
import './success-icon.scss';

export const DesktopPage = () => {
  const [idealPersons, setIdealPersons] = useState<IdealPerson[] | null>(null);
  const [selectedIdealPersonImage, setSelectedIdealPersonImage] = useState('');
  const { videoRef, isCameraOn, startCamera, stopCamera } = useCamera();
  const { image, setImage, takePicture } = usePhotoCapture(videoRef, selectedIdealPersonImage);
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
      // setIsPictureTaken(false);
    }
  };

  useEffect(() => {
    const fetchIdealPersonsCount = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ideal-people/count`);
        const data = await response.json();
        if (data.code === 200 && data.status === 'OK') {
          setIdealPersons(data.data.idealPeople);
        }
      } catch (error) {
        console.error('이상형 개수 정보 가져오기 실패:', error);
      }
    };
    fetchIdealPersonsCount();
  }, []);

  useEffect(() => {
    if (idealPersons && idealPersons.length > 0) {
      setSelectedIdealPersonImage(idealPersons[0].idealPersonImageUrl);
    }
  }, [idealPersons]);

  useEffect(() => {
    if (idealPersonCount === 0) {
      return;
    }

    const fetchIdealPersons = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ideal-people`, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6ImFjY2Vzc1Rva2VuIiwibWVtYmVySWQiOjUsImlhdCI6MTcxNTMwOTQ2MywiZXhwIjoxNzE1MzEzMDYzfQ.u1gSw2NT9aM8deXJgc-29rXlwOvGl7mkjJ7p3jbZdW8`, // 헤더에 액세스 토큰 추가
          },
        });

        const data = await response.json();

        if (data.code === 200 && data.status === 'OK') {
          setIdealPersons(data.data.idealPeople);
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
    setIsPictureTaken(false);
    setSelectedIdealPersonImage(idealPersons?.[0].idealPersonImageUrl || '');
  };

  const handleGoBack = () => {
    handleStartCamera();
    setIsPictureTaken(false);
    setImage(null);
    setSelectedIdealPersonImage(idealPersons?.[0].idealPersonImageUrl || '');
  };

  if (idealPersonCount === 0) {
    return <CreateIdealPersonPage />;
  }

  if (showIntro) {
    return (
      <div
        className='intro-page w-full h-full flex flex-col justify-center items-center'
        style={{ textAlign: 'center' }}
      >
        <h1 className='text-white text-2xl mb-5' style={{ fontWeight: 'bold' }}>
          아인과 함께 사진을 찍어요!
        </h1>
        <div className='flex justify-center items-center mb-7'>
          <img src='./gif/camera_start.gif' className='w-[60%]' />
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

  interface IdealPerson {
    idealPersonId: number;
    idealPersonFullName: string;
    idealPersonNickname: string;
    idealPersonImageUrl: string; // 이전에는 idealPersonImage였습니다.
    idealPersonRank: number;
    idealPersonThreadId: string;
  }

  const totalPages = Math.ceil((idealPersons?.length ?? 0) / itemsPerPage);

  const handleNextClick = () => {
    // 다음 페이지로 이동, 마지막  페이지에서는 첫 번째 페이지로
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
  };

  const handlePrevClick = () => {
    // 이전 페이지로 이동, 첫 번째 페이지에서는 마지막 페이지로
    setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
  };

  const currentPageIdealPersons = idealPersons
    ?.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
    .map((idealPerson) => ({
      idealPersonImageUrl: idealPerson.idealPersonImageUrl,
      idealPersonNickname: idealPerson.idealPersonNickname,
    }));

  const cameraImgStyle = {
    cursor: 'pointer',
    width: isClicked ? '65px' : '70px', // 클릭 시 작아졌다 커지는 효과
    height: isClicked ? '65px' : '70px',
    transition: 'all 0.2s ease', // 부드러운 전환 효과
  };

  return (
    <div
      className='flex flex-col justify-center items-center space-y-9'
      style={{ height: 'calc(100vh)', overflowY: 'auto' }}
    >
      <div className='relative w-10/12'>
        {image ? (
          <img src={image} className='w-full' alt='Captured' /> // 캡처된 이미지 표시
        ) : (
          <video ref={videoRef} autoPlay muted /> // 비디오 스트림 표시
        )}
        {isCameraOn && selectedIdealPersonImage && (
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

      <div
        className='flex flex-row justify-center items-center space-x-5'
        style={{ width: 'calc(3 * 134px)', justifyContent: 'space-between' }}
      >
        {/* 이전 버튼 */}
        <button onClick={handlePrevClick}>
          <img src='./icon/angle_left_white.png' alt='이전' className='w-6' />
        </button>

        {/* 케러셀 컴포넌트 */}
        {isCameraOn && (
          <Carousel
            items={
              currentPageIdealPersons?.map((p) => ({
                idealPersonImageUrl: p.idealPersonImageUrl, // 이전에는 idealPersonImage였습니다.
                idealPersonNickname: p.idealPersonNickname,
              })) || []
            }
            selectedImage={selectedIdealPersonImage}
            onSelectImage={selectIdealPersonImage}
          />
        )}

        {/* 다음 버튼 */}
        <button onClick={handleNextClick}>
          <img src='./icon/angle_left_white.png' alt='다음' className='w-6' style={{ transform: 'scaleX(-1)' }} />
        </button>
      </div>

      {isCameraOn && (
        <div className='flex flex-row justify-center items-center space-x-12'>
          {/* 돌아가기 버튼 */}
          <button
            onClick={handleGoBack}
            disabled={!isPictureTaken}
            className={`px-2 py-2 rounded-lg transition-colors duration-300 flex items-center space-x-2 ${
              isPictureTaken ? 'bg-[#AB42CF] text-white' : 'bg-gray-400 text-gray-600'
            }`}
          >
            <img
              src={isPictureTaken ? './icon/camera_back_white.png' : './icon/camera_back_gray.png'}
              alt='돌아가기'
              className='w-5 h-5'
            />
            <span>다시찍기</span>
          </button>
          {/* 촬영 버튼 */}
          {!isPictureTaken ? (
            <img
              src={isHovering ? './icon/camera_start2.png' : './icon/camera_start.png'}
              alt='사진 촬영'
              onClick={takePicture}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              style={cameraImgStyle}
            />
          ) : (
            <div className='success-icon'>
              <div className='success-icon__tip'></div>
              <div className='success-icon__long'></div>
            </div>
          )}
          {/* 저장하기 버튼 */}
          <button
            onClick={handleSavePicture}
            disabled={!isPictureTaken}
            className={`px-2 py-2 rounded-lg transition-colors duration-300 flex items-center space-x-2 ${
              isPictureTaken ? 'bg-[#AB42CF] text-white' : 'bg-gray-400 text-gray-600'
            }`}
          >
            <img
              src={isPictureTaken ? './icon/camera_save_white.png' : './icon/camera_save_gray.png'}
              alt='저장하기'
              className='w-5 h-5'
            />
            <span>저장하기</span>
          </button>
        </div>
      )}
      {/* 카메라 시작 버튼 (카메라가 꺼져있을 때만 표시) */}
      {!isCameraOn && <button onClick={startCamera}>카메라 시작</button>}
    </div>
  );
};
