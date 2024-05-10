'use client';

import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';

import ReactDOM from 'react-dom';

import { GridContextProvider, GridDropZone, GridItem, swap } from 'react-grid-dnd';

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

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Page() {
  const [enabled, setEnabled] = useState<boolean>(false);
  const [isNewFetch, setIsNewFetch] = useState<number>(0);
  const [isArrayUpdated, setIsArrayUpdated] = useState<number>(0);

  const [items, setItems] = useState<IdealPeople[]>([]);

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
  const [idealIdArray, setIdealIdArray] = useState<number[]>([]);
  const [tempTestArray, setTempTestArray] = useState<IdealPeople[]>([]);
  const [isfetched, setIsFetched] = useState<boolean>(false);

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

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`${API_URL}/ideal-people`, {
          headers: {
            authorization: `
            Bearer eyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6ImFjY2Vzc1Rva2VuIiwibWVtYmVySWQiOjIsImlhdCI6MTcxNTMzNzExOCwiZXhwIjoxNzE1MzQwNzE4fQ.9mp7ZKhoDbHG3K834XnRggPN8gUt_mjPMwhOXPP6HmU`,
          },
        });

        if (res.ok) {
          // console.log(res.status);
          const result = await res.json();
          // console.log('결과', result);
          setItems(result.data.idealPeople);
          console.log('>>', items);
          setIsFetched(true);
        } else {
          console.log('fetch실패');
          console.log(res.status);
        }
      } catch (error) {
        console.log('>>>>', error);
      }
    };
    getData();
  }, [isNewFetch]);

  const changeIdealList = async () => {
    // isArrayUpdatedCount();

    try {
      setIsArrayUpdated(isArrayUpdated + 1);
      const res = await fetch(`${API_URL}/ideal-people/ranks`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          authorization: `
          Bearer eyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6ImFjY2Vzc1Rva2VuIiwibWVtYmVySWQiOjIsImlhdCI6MTcxNTMzNzExOCwiZXhwIjoxNzE1MzQwNzE4fQ.9mp7ZKhoDbHG3K834XnRggPN8gUt_mjPMwhOXPP6HmU`,
        },
        body: JSON.stringify({
          idealPersonRankings: idealIdArray,
        }),
      });

      if (res.ok) {
        // console.log('fetchIdeal', idealIdArray);
        console.log('이상형 순서 변경 성공');
        setIsNewFetch(isNewFetch + 1);
      } else {
        console.log('이상형 순서 변경 실패');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (sourceId: string, sourceIndex: number, targetIndex: number, targetId?: string | undefined) => {
    if (sourceIndex !== targetIndex) {
      const newItems = swap(items, sourceIndex, targetIndex);
      setItems(newItems);

      for (let i = 0; i < items.length; i++) {
        idealIdArray[i] = items[i].idealPersonId;
      }
      changeIdealList();
    }
  };

  return (
    <GridContextProvider onChange={onChange}>
      <div className='container'>
        <GridDropZone className='dropzone left' id='left' boxesPerRow={2} rowHeight={250}>
          {items.map((item, index) => (
            <GridItem key={index}>
              <div className='grid-item border-2 bg-white'>
                <div className='grid-item-content'>{item.idealPersonFullName}</div>
              </div>
            </GridItem>
          ))}
        </GridDropZone>
      </div>
    </GridContextProvider>
  );
}

{
  /* <div
  onClick={() => handleModalTest(item?.idealPersonNickname, item?.idealPersonFullName, item?.idealPersonImageUrl)}
  className='flex flex-col text-center rounded-2xl h-38 w-38 cursor-pointer'
  //   key={item.idealPersonRank}
  //   key={index}
>
  <img className='rounded-t-2xl' src={item?.idealPersonImageUrl} alt='이미지' height={170} width={170} />
  <div
    className='pt-2.5 pb-1.5 text-xl text-white rounded-b-2xl shadow-[0px_3px_5px_0px_rgba(0,0,0,0.3)]'
    style={{ backgroundColor: '#BE44E9' }}
  >
    {item?.idealPersonNickname}
  </div>
</div>; */
}
