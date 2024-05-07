'use client';

import { StaticImageData } from 'next/image';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';

import Image from 'next/navigation';

import useModalStore from '@/store/modalStore';

import { useState, useEffect } from 'react';

import IdealDetailModal from '@/components/modal/IdealDetailModal';

interface IdealPeople {
  idealPersonId: number;
  idealPersonFullName: string;
  idealPersonNickname: string;
  idealPersonImageUrl: string;
  idealPersonRank: number;
  idealPersonThreadId: string;
}

interface ListData {
  code: number;
  status: string;
  message: string;
  data: {
    idealPeople: IdealPeople[];
  };
}

interface IdealPerson {
  idealPersonId: number;
  idealPersonFullName: string;
  idealPersonNickname: string;
  idealPersonImage: string;
  idealPersonRank: number;
}

interface Data {
  idealPersons: IdealPerson[];
}

interface DummyData {
  code: number;
  status: string;
  message: string;
  data: Data;
}

export default function Page() {
  const [listData, setListData] = useState<ListData>();
  const [arrayOrder, setArrayOrder] = useState([]);
  const [enabled, setEnabled] = useState(false);
  // 이걸 스토어로 옮기자
  // const [modalTest, setModalTest] = useState(false);
  const [nowOpenModal, setNowOpenModal] = useState(false);
  // 이것도 스토어로
  // const [hideList, setHideList] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch('https://myain.co.kr/api/ideal-people');

        if (res.ok) {
          console.log(res.status);
          const data = await res.json();
          setListData(data);
          console.log(data);
          console.log(listData);
        } else {
          console.log('fetch실패');
          console.log(res.status);
        }
      } catch (error) {
        console.log('>>>>', error);
      }
    };
    getData();
  }, []);

  const {
    idealDropDown,
    setIdealDropDownFalse,
    idealDetailModalOpen,
    setIdealDetailModalTrue,
    setIdealDetailModalFalse,
    hideIdealList,
    setHideIdealListTrue,
    setHideIdealListFalse,
  } = useModalStore();

  const [tempNickname, setTempNickname] = useState<string>('');
  const [tempFullName, setTempFullName] = useState<string>('');

  // const { tempImageUrl, setTempImageUrl } = useState('');

  const handleModalTest = (nickname: string, fullname: string, url: string) => {
    // setModalTest(!modalTest);

    if (idealDetailModalOpen === true) {
      setIdealDetailModalFalse();
    } else {
      setIdealDetailModalTrue();
    }

    // setHideList(!hideList);
    if (hideIdealList === true) {
      setHideIdealListFalse();
    } else {
      setHideIdealListTrue();
    }

    setIdealDropDownFalse();
    // setTempNickname(nickname);
    setTempNickname(nickname);
    setTempFullName(fullname);
    // setTempFullName()
    // setTempImageUrl();
  };

  const onDragEnd = ({ source, destination }: DropResult) => {
    console.log('>>> source', source);
    console.log(' >>>>> destination', destination);
  };

  const dummyData: DummyData = {
    code: 201,
    status: 'CREATED',
    message: '닉네임 정보 입력에 성공하였습니다!',
    data: {
      idealPersons: [
        {
          idealPersonId: 1,
          idealPersonNickname: '김싸피',
          idealPersonFullName: '본명',
          idealPersonImage: 'https://ih1.redbubble.net/image.319291377.1118/st,small,507x507-pad,600x600,f8f8f8.u2.jpg',
          idealPersonRank: 1,
        },
        {
          idealPersonId: 2,
          idealPersonNickname: '이자바',
          idealPersonFullName: '본명',
          idealPersonImage: 'https://ih1.redbubble.net/image.319291377.1118/st,small,507x507-pad,600x600,f8f8f8.u2.jpg',
          idealPersonRank: 2,
        },
        {
          idealPersonId: 3,
          idealPersonNickname: '리액트',
          idealPersonFullName: '본명',
          idealPersonImage: 'https://ih1.redbubble.net/image.319291377.1118/st,small,507x507-pad,600x600,f8f8f8.u2.jpg',
          idealPersonRank: 3,
        },
        {
          idealPersonId: 4,
          idealPersonNickname: '김치킨',
          idealPersonFullName: '본명',
          idealPersonImage: 'https://ih1.redbubble.net/image.319291377.1118/st,small,507x507-pad,600x600,f8f8f8.u2.jpg',
          idealPersonRank: 4,
        },
        {
          idealPersonId: 5,
          idealPersonNickname: '이재용',
          idealPersonFullName: '본명',
          idealPersonImage: 'https://ih1.redbubble.net/image.319291377.1118/st,small,507x507-pad,600x600,f8f8f8.u2.jpg',
          idealPersonRank: 5,
        },
        {
          idealPersonId: 6,
          idealPersonNickname: '넥스트',
          idealPersonFullName: '본명',
          idealPersonImage: 'https://ih1.redbubble.net/image.319291377.1118/st,small,507x507-pad,600x600,f8f8f8.u2.jpg',
          idealPersonRank: 6,
        },
        {
          idealPersonId: 7,
          idealPersonNickname: '스프링',
          idealPersonFullName: '본명',
          idealPersonImage: 'https://ih1.redbubble.net/image.319291377.1118/st,small,507x507-pad,600x600,f8f8f8.u2.jpg',
          idealPersonRank: 7,
        },
        {
          idealPersonId: 8,
          idealPersonNickname: '비동기',
          idealPersonFullName: '본명',
          idealPersonImage: 'https://ih1.redbubble.net/image.319291377.1118/st,small,507x507-pad,600x600,f8f8f8.u2.jpg',
          idealPersonRank: 8,
        },
        {
          idealPersonId: 9,
          idealPersonNickname: '하하하',
          idealPersonFullName: '본명',
          idealPersonImage: 'https://ih1.redbubble.net/image.319291377.1118/st,small,507x507-pad,600x600,f8f8f8.u2.jpg',
          idealPersonRank: 9,
        },
      ],
    },
  };

  // const openModal = () => {
  //   setNowOpenModal(!nowOpenModal);
  // };

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

  // useEffect(() => {
  //   const tempListOrder = () => {
  //     const { idealPersons } = dummyData.data;
  //     const tempList = idealPersons.reverse().map((item) => item.idealPersonRank);
  //     return tempList;
  //   };

  //   console.log(tempListOrder());
  // }, []);

  return (
    <div className='overflow-auto mt-[65px] mb-[68px]'>
      {/* {!hideList && ( */}

      {/* 더미데이터로 만든거  */}
      {/* {!hideIdealList && (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className=''>
            <div className='text-xl text-white flex mt-2 mb-4 px-4'>치킨님의 아인</div>

            <Droppable droppableId='droppable'>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className='grid grid-cols-2 gap-8 mb-8 px-4'>
                  {dummyData.data.idealPersons.reverse().map((item, index) => (
                    <Draggable key={item.idealPersonRank} draggableId={item.idealPersonNickname} index={index}>
                      {(provided) => (
                        <div
                          onClick={() =>
                            handleModalTest(item.idealPersonNickname, item.idealPersonFullName, item.idealPersonImage)
                          }
                          className='flex flex-col text-center rounded-2xl h-38 w-38 cursor-pointer '
                          // className='flex flex-col text-center rounded-2xl h-38 cursor-pointer shadow-[3px_3px_10px_3px_rgba(0,0,0,0.3)] '
                          key={item.idealPersonRank}
                        >
                          <img
                            className='rounded-t-2xl '
                            src={item.idealPersonImage}
                            alt='카카포'
                            height={170}
                            width={170}
                          />

                          <div
                            className=' pt-2.5 pb-1.5 text-xl text-white rounded-b-2xl shadow-[0px_3px_5px_0px_rgba(0,0,0,0.3)]'
                            style={{ backgroundColor: '#BE44E9' }}
                          >
                            {item.idealPersonNickname}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>
      )} */}

      {!hideIdealList && (
        <div>
          <div className='text-xl text-white flex mt-2 mb-4 px-4'>치킨님의 아인</div>
          <div className='grid grid-cols-2 gap-8 mb-8 px-4'>
            {listData &&
              listData.data.idealPeople
                .sort((a, b) => a.idealPersonRank - b.idealPersonRank)
                .map((item, index) => (
                  <div
                    onClick={() =>
                      handleModalTest(item.idealPersonNickname, item.idealPersonFullName, item.idealPersonImageUrl)
                    }
                    className='flex flex-col text-center rounded-2xl h-38 w-38 cursor-pointer '
                    // className='flex flex-col text-center rounded-2xl h-38 cursor-pointer shadow-[3px_3px_10px_3px_rgba(0,0,0,0.3)] '
                    key={index}
                  >
                    <img
                      className='rounded-t-2xl '
                      src='https://ih1.redbubble.net/image.319291377.1118/st,small,507x507-pad,600x600,f8f8f8.u2.jpg'
                      alt='카카포'
                      height={170}
                      width={170}
                    />
                    {/* <div>{item.idealPersonId}</div> */}
                    {/* <div>{item.idealPersonFullName}</div> */}
                    <div
                      className=' pt-2.5 pb-1.5 text-xl text-white rounded-b-2xl shadow-[0px_3px_5px_0px_rgba(0,0,0,0.3)]'
                      style={{ backgroundColor: '#BE44E9' }}
                    >
                      {item.idealPersonNickname}
                    </div>
                    {/* <div>{item.idealPersonRank}</div> */}
                    {/* <div>{item.idealPersonThreadId}</div> */}
                  </div>
                ))}
          </div>
        </div>
      )}

      {/* {!modalTest && <button onClick={handleModalTest}>모달 켜기</button>} */}
      {/* {modalTest && (
        <div className='mt-[65px]'>
          <IdealDetailModal tempNickname={tempNickname} closeModal={handleModalTest} />
        </div>
      )} */}
      {idealDetailModalOpen && (
        <div className=''>
          <IdealDetailModal tempNickname={tempNickname} tempFullName={tempFullName} closeModal={handleModalTest} />
        </div>
      )}
    </div>
  );
}
