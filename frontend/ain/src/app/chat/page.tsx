'use client';

import { StaticImageData } from 'next/image';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';

import Image from 'next/navigation';

import useModalStore from '@/store/modalStore';

import { useState, useEffect } from 'react';

import IdealDetailModal from '@/components/modal/IdealDetailModal';

interface IdealPerson {
  idealPersonId: number;
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
  const [arrayOrder, setArrayOrder] = useState([]);
  const [enabled, setEnabled] = useState(false);
  const [modalTest, setModalTest] = useState(false);
  const [nowOpenModal, setNowOpenModal] = useState(false);
  const [hideList, setHideList] = useState(false);

  const { idealDropDown, setIdealDropDownFalse } = useModalStore();

  const [tempNickname, setTempNickname] = useState<string>('');

  // const { tempImageUrl, setTempImageUrl } = useState('');

  const handleModalTest = (nickname: string, url: string) => {
    setModalTest(!modalTest);
    setHideList(!hideList);
    setIdealDropDownFalse();
    setTempNickname(nickname);
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
          idealPersonImage: 'https://ih1.redbubble.net/image.319291377.1118/st,small,507x507-pad,600x600,f8f8f8.u2.jpg',
          idealPersonRank: 1,
        },
        {
          idealPersonId: 2,
          idealPersonNickname: '이자바',
          idealPersonImage: 'https://ih1.redbubble.net/image.319291377.1118/st,small,507x507-pad,600x600,f8f8f8.u2.jpg',
          idealPersonRank: 2,
        },
        {
          idealPersonId: 3,
          idealPersonNickname: '리액트',
          idealPersonImage: 'https://ih1.redbubble.net/image.319291377.1118/st,small,507x507-pad,600x600,f8f8f8.u2.jpg',
          idealPersonRank: 3,
        },
        {
          idealPersonId: 4,
          idealPersonNickname: '김치킨',
          idealPersonImage: 'https://ih1.redbubble.net/image.319291377.1118/st,small,507x507-pad,600x600,f8f8f8.u2.jpg',
          idealPersonRank: 4,
        },
        {
          idealPersonId: 5,
          idealPersonNickname: '이재용',
          idealPersonImage: 'https://ih1.redbubble.net/image.319291377.1118/st,small,507x507-pad,600x600,f8f8f8.u2.jpg',
          idealPersonRank: 5,
        },
        {
          idealPersonId: 6,
          idealPersonNickname: '넥스트',
          idealPersonImage: 'https://ih1.redbubble.net/image.319291377.1118/st,small,507x507-pad,600x600,f8f8f8.u2.jpg',
          idealPersonRank: 6,
        },
        {
          idealPersonId: 7,
          idealPersonNickname: '스프링',
          idealPersonImage: 'https://ih1.redbubble.net/image.319291377.1118/st,small,507x507-pad,600x600,f8f8f8.u2.jpg',
          idealPersonRank: 7,
        },
        {
          idealPersonId: 8,
          idealPersonNickname: '비동기',
          idealPersonImage: 'https://ih1.redbubble.net/image.319291377.1118/st,small,507x507-pad,600x600,f8f8f8.u2.jpg',
          idealPersonRank: 8,
        },
        {
          idealPersonId: 9,
          idealPersonNickname: '하하하',
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
    <div className='overflow-auto'>
      {!hideList && (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className=''>
            <div className='text-xl text-white flex mt-2 mb-4'>치킨님의 아인</div>

            <Droppable droppableId='droppable'>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className='grid grid-cols-2 gap-8 mb-8'>
                  {dummyData.data.idealPersons.reverse().map((item, index) => (
                    <Draggable key={item.idealPersonRank} draggableId={item.idealPersonNickname} index={index}>
                      {(provided) => (
                        <div
                          onClick={() => handleModalTest(item.idealPersonNickname, item.idealPersonImage)}
                          className='flex flex-col text-center border-2 border-white rounded-xl w-36 h-38 cursor-pointer'
                          key={item.idealPersonRank}
                        >
                          <img className='rounded-t-xl ' src={item.idealPersonImage} alt='카카포' height={120} />

                          <div className='mt-2 '>{item.idealPersonNickname}</div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>
      )}

      {/* {!modalTest && <button onClick={handleModalTest}>모달 켜기</button>} */}
      {modalTest && <IdealDetailModal tempNickname={tempNickname} closeModal={handleModalTest} />}
    </div>
  );
}
