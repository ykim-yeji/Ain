"use client";

import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";

import { useState, useEffect } from "react";

import useUserStore from "@/store/userStore";
import useModalStore from "@/store/modalStore";

import IdealDetailModal from "@/components/modal/IdealDetailModal";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

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
  } = useModalStore();

  const { accessToken } = useUserStore();

  const [tempNickname, setTempNickname] = useState<string>("");
  const [tempFullName, setTempFullName] = useState<string>("");
  const [idealIdArray, setIdealIdArray] = useState<number[]>([]);
  const [tempTestArray, setTempTestArray] = useState<IdealPeople[]>([]);

  // const idealPersonRankings = [12, 11, 10, 9, 8, 7, 6, 5, 4];

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
    // console.log('DRAG START');
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`${API_URL}/ideal-people`, {
          headers: {
            Authorization: `Bearer ` + accessToken,
          },
        });

        if (res.ok) {
          // console.log(res.status);
          const result = await res.json();
          // console.log('결과', result);
          setListData(result.data);
        } else {
          console.log("fetch실패");
          console.log(res.status);
        }
      } catch (error) {
        console.log(">>>>", error);
      }
    };
    getData();
  }, [isNewFetch]);

  const changeIdealList = async () => {
    // isArrayUpdatedCount();

    try {
      setIsArrayUpdated(isArrayUpdated + 1);
      const res = await fetch(`${API_URL}/ideal-people/ranks`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ` + accessToken,
        },
        body: JSON.stringify({
          idealPersonRankings: idealIdArray,
        }),
      });

      if (res.ok) {
        // console.log('fetchIdeal', idealIdArray);
        console.log("이상형 순서 변경 성공");
        setIsNewFetch(isNewFetch + 1);
      } else {
        console.log("이상형 순서 변경 실패");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) {
      return;
    }

    // console.log('!!!!!!!!!!!!', listData);

    const sourceIndex = source.index;
    console.log("SOURCE", sourceIndex + 1);
    const destinationIndex = destination.index;
    console.log("DESTI", destinationIndex + 1);

    // const draggedItem = listData?.idealPeople[sourceIndex];
    // const destinationItem = listData?.idealPeople[destinationIndex];

    // console.log('드래그드', draggedItem?.idealPersonFullName);
    // console.log('데스티네이션', destinationItem?.idealPersonFullName);
    console.log("기존 어레이!!");
    console.log(idealIdArray);
    if (listData && listData.idealPeople) {
      const tempPeople = listData.idealPeople[sourceIndex];
      listData.idealPeople[sourceIndex] =
        listData.idealPeople[destinationIndex];
      listData.idealPeople[destinationIndex] = tempPeople;

      for (let i = 0; i < listData.idealPeople.length; i++) {
        idealIdArray[i] = listData.idealPeople[i].idealPersonId;
      }

      console.log("변경된 어레이!!");
      console.log(idealIdArray);
      changeIdealList();

      // const testtest = () => {
      //   const tempItem = [];

      //   for (let i = 0; i < listData.idealPeople.length; i++) {
      //     if (i !== sourceIndex && i !== destinationIndex) {
      //       tempItem[i] = listData.idealPeople[i];
      //     } else if (i === sourceIndex) {
      //       tempItem[sourceIndex] = listData.idealPeople[destinationIndex];
      //       // console.log('출발', sourceIndex);
      //       // console.log('도착', destinationIndex);
      //     } else if (i === destinationIndex) {
      //       tempItem[destinationIndex] = listData.idealPeople[sourceIndex];
      //       // console.log('출발2', destinationIndex);
      //       // console.log('도착2', sourceIndex);
      //     }
      //   }

      //   // 잘 바뀜
      //   console.log('임시배열', tempItem);

      //   // const updatedListData: ListData = {
      //   //   idealPeople: tempItem,
      //   // };

      //   const updatedListData: ListData = {
      //     idealPeople: tempItem,
      //   };

      //   setTempTestArray(tempItem);

      //   // 잘 바뀜
      //   console.log('업데이트배열', updatedListData);

      //   console.log('기존배열', listData);
      //   return updatedListData;
      // };
      // const tempIdArray = tempTestArray.map((person) => person.idealPersonId);
      // setIdealIdArray(tempIdArray);
      // // setListData(testtest);

      // setIsArrayUpdated(isArrayUpdated + 1);
      // changeIdealList();
    }

    // setIsArrayUpdated(isArrayUpdated + 1);
    // changeIdealList();
  };

  // useEffect(() => {
  //   if (tempTestArray !== null) {
  //     const tempIdArray = tempTestArray.map((person) => person.idealPersonId);
  //     setIdealIdArray(tempIdArray);
  //   }

  //   console.log('idealIdArray!!!!', idealIdArray);
  // }, [isArrayUpdated, listData, tempTestArray]);

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
    <div className="overflow-auto mt-[65px] mb-[68px]">
      <div className="text-xl text-white flex mt-2 mb-4 px-4">
        치킨님의 아인
      </div>

      <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
        {listData &&
          listData.idealPeople &&
          Array.from(
            { length: Math.ceil(listData.idealPeople.length / 2) },
            (_, rowIndex) => (
              <div key={rowIndex} className="grid grid-cols-2 gap-8 mb-8 mt-8">
                {listData.idealPeople
                  .slice(rowIndex * 2, rowIndex * 2 + 2)
                  .map((item, colIndex) => (
                    <Droppable
                      key={`${rowIndex}-${colIndex}`}
                      droppableId={`${rowIndex}-${colIndex}`}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
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
                                    item?.idealPersonImageUrl
                                  )
                                }
                                className="flex flex-col text-center rounded-2xl h-38 w-38 cursor-pointer"
                                //   key={item.idealPersonRank}
                                //   key={index}
                              >
                                <img
                                  className="rounded-t-2xl"
                                  src={item?.idealPersonImageUrl}
                                  alt="이미지"
                                  height={170}
                                  width={170}
                                />
                                <div
                                  className="pt-2.5 pb-1.5 text-xl text-white rounded-b-2xl shadow-[0px_3px_5px_0px_rgba(0,0,0,0.3)]"
                                  style={{ backgroundColor: "#BE44E9" }}
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
            )
          )}
      </DragDropContext>
      <div>
        {idealDetailModalOpen && (
          <div className="">
            <IdealDetailModal
              tempNickname={tempNickname}
              tempFullName={tempFullName}
              closeModal={handleModalTest}
            />
          </div>
        )}
      </div>
    </div>
  );
}
