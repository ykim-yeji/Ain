'use client';

import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';

import { useState, useEffect } from 'react';

import useUserStore from '@/store/userStore';
import useModalStore from '@/store/modalStore';
import useIdealStore from '@/store/idealStore';

import IdealDetailModal from '@/components/modal/IdealDetailModal';

import { CreateIdealPersonPage } from '@/components/platform/CreateIdealPerson';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface IdealPeople {
  idealPersonId: number;
  idealPersonFullName: string;
  idealPersonNickname: string;
  idealPersonImageUrl: string;
  idealPersonRank: number;
  idealPersonThreadId: string;
}

interface ListData {
  idealPeople: IdealPeople[];
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Page() {
  const [listData, setListData] = useState<ListData>();
  const [enabled, setEnabled] = useState<boolean>(false);
  const [isNewFetch, setIsNewFetch] = useState<number>(0);
  const [isArrayUpdated, setIsArrayUpdated] = useState<number>(0);

  const {
    idealDropDown,
    setIdealDropDownFalse,
    idealDetailModalOpen,
    setIdealDetailModalTrue,
    setIdealDetailModalFalse,
    hideIdealList,
    setHideIdealListTrue,
    setHideIdealListFalse,
    isNicknameModified,
    setIsNicknameModified,
  } = useModalStore();

  const {
    selectedIdealName,
    selectedIdealFullName,
    selectedIdealId,
    selectedIdealThreadId,
    selectedIdealImageUrl,
    setTempIdealName,
    setTempIdealFullName,
    setTempIdealId,
    setTempIdealThreadId,
    setTempIdealImageUrl,
  } = useIdealStore();

  const { accessToken, isLogin } = useUserStore();

  // const [tempNickname, setTempNickname] = useState<string>('');
  const [tempFullName, setTempFullName] = useState<string>('');
  const [tempPersonId, setTempPersonId] = useState<number>();
  const [tempThreadId, setTempThreadId] = useState<string>('');
  const [tempImageUrl, setTempImageUrl] = useState<string>('');
  const [idealIdArray, setIdealIdArray] = useState<number[]>([]);
  const [tempTestArray, setTempTestArray] = useState<IdealPeople[]>([]);
  // const [isNicknameModified, setIsNicknameModified] = useState<number>(0);

  const [originNickname, setOriginNickname] = useState<string>('');

  // const idealPersonRankings = [12, 11, 10, 9, 8, 7, 6, 5, 4];

  const handleModalTest = (
    nickname: string,
    fullname: string,
    url: string,
    personId: number,
    threadId: string,
    imageUrl: string
  ) => {
    if (idealDetailModalOpen === true) {
      setIdealDetailModalFalse();
    } else {
      setIdealDetailModalTrue();
    }

    if (hideIdealList === true) {
      setHideIdealListFalse();
    } else {
      setHideIdealListTrue();
    }

    setIdealDropDownFalse();
    // setTempNickname(nickname);
    setTempFullName(fullname);
    setTempPersonId(personId);
    setTempThreadId(threadId);

    setTempIdealName(nickname);
    setTempIdealFullName(fullname);
    setTempIdealId(personId);
    setTempIdealThreadId(threadId);
    setTempIdealImageUrl(imageUrl);
  };

  const onDragStart = () => {
    // console.log('DRAG START');
  };

  useEffect(() => {
    if (isLogin === false) {
      const timer = setTimeout(() => {
        window.location.href = `/login`;
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const getMyNickname = async () => {
      try {
        const res = await fetch(`${API_URL}/members`, {
          headers: {
            Authorization: `Bearer ` + accessToken,
          },
        });

        if (res.ok) {
          const result = await res.json();
          if (result.code === 200) {
            setOriginNickname(result.data.memberNickname);
          } else if (result.code === 401) {
            alert('ERROR UNAUTHORIZED');
            return;
          } else if (result.code === 403) {
            alert('ERROR FORBIDDEN');
            return;
          } else if (result.code === 404) {
            alert('ERROR NOT FOUND');
            return;
          } else {
            alert('401, 403, 404 이외 에러 발생');
            return;
          }
        } else {
          console.log('에러발생');
          return;
        }
      } catch (error) {
        alert('에러발생으로 닉네임 정보 불러오기 실패');
        console.log(error);
      }
    };

    if (accessToken !== '' && accessToken !== null && accessToken !== undefined) {
      getMyNickname();
    }
  }, [isNewFetch, accessToken, isNicknameModified]);

  useEffect(() => {
    const getData = async () => {
      if (accessToken !== null && accessToken !== undefined && accessToken !== '') {
        try {
          const res = await fetch(`${API_URL}/ideal-people`, {
            // cache: "no-store",
            headers: {
              Authorization: `Bearer ` + accessToken,
            },
          });

          if (res.ok) {
            // console.log(res.status);
            const result = await res.json();
            console.log('>>>', result);
            // console.log('결과', result);
            if (result.code === 200) {
              console.log(result.data);
              setListData(result.data);
            } else {
              alert(result.code);
            }
          } else {
            console.log('fetch실패');
            console.log(res.status);
            alert('실패다');
          }
        } catch (error) {
          alert('에러실패');
          console.log('>>>>', error);
        }
      } else {
        alert('뭔가..');
      }
    };

    if (accessToken !== '' && accessToken !== null && accessToken !== undefined) {
      getData();
    }
  }, [isNewFetch, accessToken, isNicknameModified]);

  const changeIdealList = async () => {
    try {
      setIsArrayUpdated(isArrayUpdated + 1);
      const res = await fetch(`${API_URL}/ideal-people/ranks`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ` + accessToken,
        },
      });

      if (res.ok) {
        console.log('이상형 순서 변경 성공');
        setIsNewFetch(isNewFetch + 1);
      } else {
        console.log('이상형 순서 변경 실패');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) {
      return;
    }

    const sourceIndex = source.index;
    console.log('SOURCE', sourceIndex + 1);
    const destinationIndex = destination.index;
    console.log('DESTI', destinationIndex + 1);

    console.log('기존 어레이!!');
    console.log(idealIdArray);
    if (listData && listData.idealPeople) {
      const tempPeople = listData.idealPeople[sourceIndex];
      listData.idealPeople[sourceIndex] = listData.idealPeople[destinationIndex];
      listData.idealPeople[destinationIndex] = tempPeople;

      for (let i = 0; i < listData.idealPeople.length; i++) {
        idealIdArray[i] = listData.idealPeople[i].idealPersonId;
      }

      console.log('변경된 어레이!!');
      console.log(idealIdArray);
      changeIdealList();
    }
  };

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return (
    <div className='overflow-auto mt-[65px] mb-[68px]'>
      {isLogin && !hideIdealList && listData && listData.idealPeople && (
        <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
          {listData && listData.idealPeople.length > 0 && originNickname && (
            <div className='text-xl text-white flex mt-2 mb-4 px-4'>{originNickname}님의 아인</div>
          )}
          {listData &&
            listData.idealPeople &&
            Array.from({ length: Math.ceil(listData.idealPeople.length / 2) }, (colIndex, rowIndex) => (
              <Droppable key={`${rowIndex}-${colIndex}`} droppableId={`${rowIndex}-${colIndex}`}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    <div key={rowIndex} className='grid grid-cols-2 gap-8 mb-8 mt-8'>
                      {listData.idealPeople.slice(rowIndex * 2, rowIndex * 2 + 2).map((item, colIndex) => (
                        <Draggable
                          key={item?.idealPersonFullName}
                          draggableId={`${rowIndex}-${colIndex}`}
                          index={item?.idealPersonRank}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              onClick={() =>
                                handleModalTest(
                                  item?.idealPersonNickname,
                                  item?.idealPersonFullName,
                                  item?.idealPersonImageUrl,
                                  item?.idealPersonId,
                                  item?.idealPersonThreadId,
                                  item?.idealPersonImageUrl
                                )
                              }
                              className='flex flex-col text-center rounded-2xl h-38 w-38 cursor-pointer'
                              //   key={item.idealPersonRank}
                              //   key={index}
                            >
                              <img
                                className='rounded-t-2xl bg-white'
                                src={item?.idealPersonImageUrl}
                                alt='이미지'
                                height={170}
                                width={170}
                              />
                              <div
                                className='pt-2.5 pb-1.5 text-xl text-white rounded-b-2xl shadow-[0px_3px_5px_0px_rgba(0,0,0,0.3)]'
                                style={{ backgroundColor: '#BE44E9' }}
                              >
                                {item?.idealPersonNickname}
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {/* <button onClick={changeIdealList}>순서변경TEST</button> */}
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
        </DragDropContext>
      )}
      {isLogin && listData && listData.idealPeople && listData.idealPeople.length === 0 && <CreateIdealPersonPage />}
      {isLogin && idealDetailModalOpen && (
        <div>
          <IdealDetailModal
            tempPersonId={tempPersonId}
            closeModal={handleModalTest}
            isNicknameModified={isNicknameModified}
            setIsNicknameModified={setIsNicknameModified}
          />
        </div>
      )}
      {!isLogin && (
        <div className='relative mt-[65px] mb-[68px] w-full h-full flex flex-col justify-center items-center'>
          <div className='text-center text-xl text-white mt-32 leading-relaxed'>
            채팅 기능은 로그인 후 이용할 수 있습니다.
          </div>
          <div className='text-center text-xl text-white mt-2 leading-relaxed'>로그인 페이지로 이동합니다.</div>
        </div>
      )}
    </div>
  );
}
