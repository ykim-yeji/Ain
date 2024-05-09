'use client';

import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';

import useModalStore from '@/store/modalStore';

import { useState, useEffect } from 'react';

import IdealDetailModal from '@/components/modal/IdealDetailModal';

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

interface IdealPerson {
  idealPersonId: number;
  idealPersonFullName: string;
  idealPersonNickname: string;
  idealPersonImage: string;
  idealPersonRank: number;
}

interface DummyData {
  idealPersons: IdealPerson[];
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// const dummyData: DummyData = {
//   idealPersons: [
//     {
//       idealPersonId: 1,
//       idealPersonNickname: '김싸피',
//       idealPersonFullName: '본명',
//       idealPersonImage: 'https://ih1.redbubble.net/image.319291377.1118/st,small,507x507-pad,600x600,f8f8f8.u2.jpg',
//       idealPersonRank: 1,
//     },
//     {
//       idealPersonId: 2,
//       idealPersonNickname: '이자바',
//       idealPersonFullName: '본명',
//       idealPersonImage: 'https://ih1.redbubble.net/image.319291377.1118/st,small,507x507-pad,600x600,f8f8f8.u2.jpg',
//       idealPersonRank: 2,
//     },
//     {
//       idealPersonId: 3,
//       idealPersonNickname: '리액트',
//       idealPersonFullName: '본명',
//       idealPersonImage: 'https://ih1.redbubble.net/image.319291377.1118/st,small,507x507-pad,600x600,f8f8f8.u2.jpg',
//       idealPersonRank: 3,
//     },
//     {
//       idealPersonId: 4,
//       idealPersonNickname: '김치킨',
//       idealPersonFullName: '본명',
//       idealPersonImage: 'https://ih1.redbubble.net/image.319291377.1118/st,small,507x507-pad,600x600,f8f8f8.u2.jpg',
//       idealPersonRank: 4,
//     },
//     {
//       idealPersonId: 5,
//       idealPersonNickname: '이재용',
//       idealPersonFullName: '본명',
//       idealPersonImage: 'https://ih1.redbubble.net/image.319291377.1118/st,small,507x507-pad,600x600,f8f8f8.u2.jpg',
//       idealPersonRank: 5,
//     },
//     {
//       idealPersonId: 6,
//       idealPersonNickname: '넥스트',
//       idealPersonFullName: '본명',
//       idealPersonImage: 'https://ih1.redbubble.net/image.319291377.1118/st,small,507x507-pad,600x600,f8f8f8.u2.jpg',
//       idealPersonRank: 6,
//     },
//     {
//       idealPersonId: 7,
//       idealPersonNickname: '스프링',
//       idealPersonFullName: '본명',
//       idealPersonImage: 'https://ih1.redbubble.net/image.319291377.1118/st,small,507x507-pad,600x600,f8f8f8.u2.jpg',
//       idealPersonRank: 7,
//     },
//     {
//       idealPersonId: 8,
//       idealPersonNickname: '비동기',
//       idealPersonFullName: '본명',
//       idealPersonImage: 'https://ih1.redbubble.net/image.319291377.1118/st,small,507x507-pad,600x600,f8f8f8.u2.jpg',
//       idealPersonRank: 8,
//     },
//     {
//       idealPersonId: 9,
//       idealPersonNickname: '하하하',
//       idealPersonFullName: '본명',
//       idealPersonImage: 'https://ih1.redbubble.net/image.319291377.1118/st,small,507x507-pad,600x600,f8f8f8.u2.jpg',
//       idealPersonRank: 9,
//     },
//   ],
// };

export default function Page() {
  const [listData, setListData] = useState<ListData>();
  const [enabled, setEnabled] = useState(false);

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

  const idealPersonRankings = [1, 2, 3];

  const handleModalTest = (nickname: string, fullname: string, url: string) => {
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
    setTempNickname(nickname);
    setTempFullName(fullname);
  };

  const onDragStart = () => {
    console.log('DRAG START');
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`${API_URL}/ideal-people`, {
          headers: {
            authorization: `
            Bearer eyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6ImFjY2Vzc1Rva2VuIiwibWVtYmVySWQiOjIsImlhdCI6MTcxNTI0NDA1NywiZXhwIjoxNzE1MjQ3NjU3fQ.3WEprEIXXTUbKGI9D8kTSZI8JoeycKZUjTsgKeyflJY`,
          },
        });

        if (res.ok) {
          console.log(res.status);
          const result = await res.json();
          console.log('결과', result);
          setListData(result.data);
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

  const changeIdealList = async () => {
    try {
      const res = await fetch(`${API_URL}/ideal-people/ranks`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6ImFjY2Vzc1Rva2VuIiwibWVtYmVySWQiOjUsImlhdCI6MTcxNTIzNDU3NiwiZXhwIjoxNzE1MjM4MTc2fQ.VjycMY-a7RHNIXCbgGvBVtz8UDRK22Q_ktlcPBb9-8g`,
        },
        body: JSON.stringify({
          idealPersonRankings: idealPersonRankings,
        }),
      });

      if (res.ok) {
        console.log('이상형 순서 변경 성공');
      } else {
        console.log('이상형 순서 변경 실패');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log('리스트데이터가 잘 왔나요?', listData);
  }, [listData]);

  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) {
      return;
    }

    const sourceIndex = source.index;
    console.log('SOURCE', sourceIndex);
    const destinationIndex = destination.index;

    console.log('DESTI', destinationIndex);
    const draggedItem = listData?.idealPeople[sourceIndex];
    const destinationItem = listData?.idealPeople[destinationIndex];

    console.log('드래그드', draggedItem);
    console.log('데스티네이션', destinationItem);

    if (listData && listData.idealPeople) {
      const testtest = () => {
        const tempItem = [];

        for (let i = 0; i < listData.idealPeople.length; i++) {
          if (i !== sourceIndex - 1 && i !== destinationIndex - 1) {
            tempItem[i] = listData.idealPeople[i];
          } else if (i === sourceIndex - 1) {
            tempItem[sourceIndex - 1] = listData.idealPeople[destinationIndex - 1];

            console.log('출발', sourceIndex);
            console.log('도착', destinationIndex);
          } else if (i === destinationIndex - 1) {
            tempItem[destinationIndex - 1] = listData.idealPeople[sourceIndex - 1];

            console.log('출발2', destinationIndex);
            console.log('도착2', sourceIndex);
          }
        }
        console.log('임시배열', tempItem);

        const updatedListData: ListData = {
          idealPeople: tempItem,
        };
        return updatedListData;
      };

      const updatedList = testtest();
      setListData(updatedList);
    }
  };

  //   useEffect(() => {
  //     const animation = requestAnimationFrame(() => setEnabled(true));

  //     return () => {
  //       cancelAnimationFrame(animation);
  //       setEnabled(false);
  //     };
  //   }, []);

  if (!enabled) {
    return null;
  }

  const returnItemsForRowAndCol = (row: number, col: number) => {};

  //   0 -> 1,1
  //   1 -> 1,2
  //   2 -> 2,1
  //   3 -> 2,2
  //   4 -> 3,1
  //   5 -> 3,2
  //   6 -> 4,1
  //   index가 n일때,
  // n===0 이면 row =1, col =1
  // n!==0 일때 n/2 === 0 이면 col =1 , n!==0 일때 n/2!==0이면 col=2
  //  n===1일때 row는 1,
  //  n>=2이면 row는 n/2 +1 이 된다?

  // 0 -> 0,0
  //   1 -> 0,1
  //   2 -> 1,0
  //   3 -> 1,1
  //   4 -> 2,0
  //   5 -> 2,1
  //   6 -> 3,0

  //   index가 n일때,
  // n===0 이면 row =0, col =0
  // n!==0 일때 n이 홀수면 row = n/2 (나머지 버리기) ,col = 1, n이 짝수면 row=n/2 ,col=0,

  //   return (
  //     <div className='overflow-auto mt-[65px] mb-[68px]'>
  //       <div className='text-xl text-white flex mt-2 mb-4 px-4'>치킨님의 아인</div>
  //       {!hideIdealList && (
  //         <DragDropContext onDragEnd={onDragEnd}>
  //           <div className='grid grid-cols-2 gap-8 mb-8 px-4'>
  //             {dummyData.data.idealPersons.reverse().map((item, index) => (
  //               <Droppable droppableId='droppable'>
  //                 {(provided) => (
  //                   <Draggable key={index} draggableId={item.idealPersonFullName} index={index}>
  //                     {(provided) => (
  //                       <div
  //                         ref={provided.innerRef}
  //                         {...provided.draggableProps}
  //                         {...provided.dragHandleProps}
  //                         onClick={() =>
  //                           handleModalTest(item.idealPersonNickname, item.idealPersonFullName, item.idealPersonImage)
  //                         }
  //                         className='flex flex-col text-center rounded-2xl h-38 w-38 cursor-pointer '
  //                         key={item.idealPersonRank}
  //                       >
  //                         <img
  //                           className='rounded-t-2xl '
  //                           src={item.idealPersonImage}
  //                           alt='카카포'
  //                           height={170}
  //                           width={170}
  //                         />

  //                         <div
  //                           className=' pt-2.5 pb-1.5 text-xl text-white rounded-b-2xl shadow-[0px_3px_5px_0px_rgba(0,0,0,0.3)]'
  //                           style={{ backgroundColor: '#BE44E9' }}
  //                         >
  //                           {item.idealPersonNickname}
  //                         </div>
  //                       </div>
  //                     )}
  //                   </Draggable>
  //                 )}
  //               </Droppable>
  //             ))}
  //           </div>
  //         </DragDropContext>
  //       )}
  //     </div>
  //   );
  // }

  return (
    <div className='overflow-auto mt-[65px] mb-[68px]'>
      <div className='text-xl text-white flex mt-2 mb-4 px-4'>치킨님의 아인</div>
      {/* {!hideIdealList && (
        <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
          <div className='gap-8 mb-8 px-4'>
            {Array.from({ length: Math.ceil(items.length / 2) }, (_, rowIndex) => (
              <div key={rowIndex} className='grid grid-cols-2 gap-8 mb-8 mt-8'>
                {items.slice(rowIndex * 2, rowIndex * 2 + 2).map((item, colIndex) => (
                  <Droppable key={`${rowIndex}-${colIndex}`} droppableId={`${rowIndex}-${colIndex}`}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        <Draggable
                          key={item.idealPersonFullName}
                          draggableId={`${rowIndex}-${colIndex}`}
                          index={item.idealPersonRank}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              onClick={() =>
                                handleModalTest(
                                  item.idealPersonNickname,
                                  item.idealPersonFullName,
                                  item.idealPersonImage
                                )
                              }
                              className='flex flex-col text-center rounded-2xl h-38 w-38 cursor-pointer'
                              //   key={item.idealPersonRank}
                              //   key={index}
                            >
                              <img
                                className='rounded-t-2xl'
                                src={item.idealPersonImage}
                                alt='카카포'
                                height={170}
                                width={170}
                              />
                              <div
                                className='pt-2.5 pb-1.5 text-xl text-white rounded-b-2xl shadow-[0px_3px_5px_0px_rgba(0,0,0,0.3)]'
                                style={{ backgroundColor: '#BE44E9' }}
                              >
                                {item.idealPersonNickname}
                              </div>
                            </div>
                          )}
                        </Draggable>
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                ))}
              </div>
            ))}
          </div>
        </DragDropContext>
      )} */}

      {hideIdealList && (
        <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
          {listData &&
            listData.idealPeople &&
            Array.from({ length: Math.ceil(listData.idealPeople.length / 2) }, (_, rowIndex) => (
              <div key={rowIndex} className='grid grid-cols-2 gap-8 mb-8 mt-8'>
                {listData.idealPeople.slice(rowIndex * 2, rowIndex * 2 + 2).map((item, colIndex) => (
                  <Droppable key={`${rowIndex}-${colIndex}`} droppableId={`${rowIndex}-${colIndex}`}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        <Draggable
                          key={item?.idealPersonFullName}
                          draggableId={`${rowIndex}-${colIndex}`}
                          //   index={item.idealPersonRank}
                          index={item?.idealPersonId}
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
                                  item?.idealPersonImageUrl
                                )
                              }
                              className='flex flex-col text-center rounded-2xl h-38 w-38 cursor-pointer'
                              //   key={item.idealPersonRank}
                              //   key={index}
                            >
                              <img
                                className='rounded-t-2xl'
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
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                ))}
                {/* <button onClick={changeIdealList}>순서변경TEST</button> */}
              </div>
            ))}

          <div>
            {/* <div className='grid grid-cols-2 gap-8 mb-8 px-4'>
              {listData &&
                listData.idealPeople &&
                listData.idealPeople
                  .sort((a, b) => a.idealPersonRank - b.idealPersonRank)
                  .map((item, index) => (
                    <div
                      onClick={() =>
                        handleModalTest(item.idealPersonNickname, item.idealPersonFullName, item.idealPersonImageUrl)
                      }
                      className='flex flex-col text-center rounded-2xl h-38 w-38 cursor-pointer '
                      key={index}
                    >
                      <img
                        className='rounded-t-2xl '
                        src='https://ih1.redbubble.net/image.319291377.1118/st,small,507x507-pad,600x600,f8f8f8.u2.jpg'
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
                  ))}
            </div> */}
          </div>
        </DragDropContext>
      )}
    </div>
  );
}
