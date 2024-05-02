'use client';

import { StaticImageData } from 'next/image';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';

import Image from 'next/navigation';

import { useState, useEffect } from 'react';

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
          idealPersonNickname: '1번',
          idealPersonImage: 'https://ih1.redbubble.net/image.319291377.1118/st,small,507x507-pad,600x600,f8f8f8.u2.jpg',
          idealPersonRank: 1,
        },
        {
          idealPersonId: 2,
          idealPersonNickname: '2번',
          idealPersonImage: 'https://ih1.redbubble.net/image.319291377.1118/st,small,507x507-pad,600x600,f8f8f8.u2.jpg',
          idealPersonRank: 2,
        },
        {
          idealPersonId: 3,
          idealPersonNickname: '3번',
          idealPersonImage: 'https://ih1.redbubble.net/image.319291377.1118/st,small,507x507-pad,600x600,f8f8f8.u2.jpg',
          idealPersonRank: 3,
        },
        {
          idealPersonId: 4,
          idealPersonNickname: '4번',
          idealPersonImage: 'https://ih1.redbubble.net/image.319291377.1118/st,small,507x507-pad,600x600,f8f8f8.u2.jpg',
          idealPersonRank: 4,
        },
        {
          idealPersonId: 5,
          idealPersonNickname: '5번',
          idealPersonImage: 'https://ih1.redbubble.net/image.319291377.1118/st,small,507x507-pad,600x600,f8f8f8.u2.jpg',
          idealPersonRank: 5,
        },
        {
          idealPersonId: 6,
          idealPersonNickname: '6번',
          idealPersonImage: 'https://ih1.redbubble.net/image.319291377.1118/st,small,507x507-pad,600x600,f8f8f8.u2.jpg',
          idealPersonRank: 6,
        },
        {
          idealPersonId: 7,
          idealPersonNickname: '7번',
          idealPersonImage: 'https://ih1.redbubble.net/image.319291377.1118/st,small,507x507-pad,600x600,f8f8f8.u2.jpg',
          idealPersonRank: 7,
        },
        {
          idealPersonId: 8,
          idealPersonNickname: '8번',
          idealPersonImage: 'https://ih1.redbubble.net/image.319291377.1118/st,small,507x507-pad,600x600,f8f8f8.u2.jpg',
          idealPersonRank: 8,
        },
        {
          idealPersonId: 9,
          idealPersonNickname: '9번',
          idealPersonImage: 'https://ih1.redbubble.net/image.319291377.1118/st,small,507x507-pad,600x600,f8f8f8.u2.jpg',
          idealPersonRank: 9,
        },
      ],
    },
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

  // useEffect(() => {
  //   const tempListOrder = () => {
  //     const { idealPersons } = dummyData.data;
  //     const tempList = idealPersons.reverse().map((item) => item.idealPersonRank);
  //     return tempList;
  //   };

  //   console.log(tempListOrder());
  // }, []);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <div className='text-xl text-white flex mt-2 mb-4'>치킨님의 아인</div>

        <Droppable droppableId='droppable'>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className='grid grid-cols-2 gap-8 mb-8'>
              {dummyData.data.idealPersons.reverse().map((item, index) => (
                <Draggable key={item.idealPersonRank} draggableId={item.idealPersonNickname} index={index}>
                  {(provided) => (
                    <div
                      className='flex flex-col text-center border-2 border-white rounded-xl w-36 h-38'
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
  );
}
