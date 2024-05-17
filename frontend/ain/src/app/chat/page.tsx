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
import useIdealStore from "@/store/idealStore";

import ReissueToken from "@/hooks/ReissueToken";

import IdealDetailModal from "@/components/modal/IdealDetailModal";

import { CreateIdealPersonPage } from "@/components/platform/CreateIdealPerson";

import Swal from "sweetalert2";

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

  const [tempFullName, setTempFullName] = useState<string>("");
  const [tempPersonId, setTempPersonId] = useState<number>();
  const [tempThreadId, setTempThreadId] = useState<string>("");
  const [tempImageUrl, setTempImageUrl] = useState<string>("");
  const [idealIdArray, setIdealIdArray] = useState<number[]>([]);
  const [tempTestArray, setTempTestArray] = useState<IdealPeople[]>([]);

  const [originNickname, setOriginNickname] = useState<string>("");

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
    setTempFullName(fullname);
    setTempPersonId(personId);
    setTempThreadId(threadId);

    setTempIdealName(nickname);
    setTempIdealFullName(fullname);
    setTempIdealId(personId);
    setTempIdealThreadId(threadId);
    setTempIdealImageUrl(imageUrl);
  };

  const onDragStart = () => {};

  // useEffect(() => {
  //   if (isLogin === false && accessToken === '') {
  //     const timer = setTimeout(() => {
  //       window.location.href = `/login`;
  //     }, 3000);

  //     return () => clearTimeout(timer);
  //   }
  // }, []);

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
            alert("ERROR UNAUTHORIZED");
            return;
          } else if (result.code === 403) {
            alert("ERROR FORBIDDEN");
            return;
          } else if (result.code === 404) {
            alert("ERROR NOT FOUND");
            return;
          } else {
            alert("401, 403, 404 이외 에러 발생");
            return;
          }
        } else {
          console.log("에러발생");
          return;
        }
      } catch (error) {
        alert("에러발생으로 닉네임 정보 불러오기 실패");
        console.log(error);
      }
    };

    if (
      accessToken !== "" &&
      accessToken !== null &&
      accessToken !== undefined
    ) {
      getMyNickname();
    }
  }, [isNewFetch, accessToken, isNicknameModified]);

  useEffect(() => {
    const getData = async () => {
      if (
        accessToken !== null &&
        accessToken !== undefined &&
        accessToken !== ""
      ) {
        try {
          const res = await fetch(`${API_URL}/ideal-people`, {
            // cache: "no-store",
            headers: {
              Authorization: `Bearer ` + accessToken,
            },
          });

          if (res.ok) {
            const result = await res.json();

            if (result.code === 200) {
              setListData(result.data);
            } else if (result.code === 401) {
            } else {
              alert(result.code);
            }
          } else {
            console.log(res.status);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
      }
    };

    if (
      accessToken !== "" &&
      accessToken !== null &&
      accessToken !== undefined
    ) {
      getData();
    }
  }, [isNewFetch, accessToken, isNicknameModified]);

  if (
    isLogin &&
    listData &&
    listData.idealPeople &&
    listData.idealPeople.length === 0
  ) {
    return <CreateIdealPersonPage />;
  }

  return (
    <div className="overflow-auto mt-[65px] mb-[68px]">
      {isLogin &&
        !hideIdealList &&
        listData &&
        listData.idealPeople &&
        listData.idealPeople.length > 0 &&
        originNickname && (
          <div>
            <div className="text-xl text-white flex mt-2 mb-4 px-4 rounded-2xl">
              {originNickname}님의 아인
            </div>

            <div className="grid grid-cols-2 gap-6">
              {listData?.idealPeople.map((item, index) => (
                <div
                  key={index}
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
                >
                  <img
                    className="rounded-t-2xl bg-white"
                    src={item?.idealPersonImageUrl}
                    alt="이미지"
                    height={170}
                    width={170}
                  />
                  <div
                    className="pt-2.5 pb-1.5 mb-6 text-xl text-white text-center rounded-b-2xl shadow-[0px_3px_5px_0px_rgba(0,0,0,0.3)]"
                    style={{ backgroundColor: "#BE44E9" }}
                  >
                    {item?.idealPersonNickname}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      {/* {isLogin && listData && listData.idealPeople && listData.idealPeople.length === 0 && <CreateIdealPersonPage />} */}

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
        <div className="relative mt-[65px] mb-[68px] w-full h-full flex flex-col justify-center items-center">
          <div className="text-center text-xl text-white mt-32 leading-relaxed">
            로딩 중입니다.
          </div>
          {/* <div className='text-center text-xl text-white mt-2 leading-relaxed'>로그인 페이지로 이동합니다.</div> */}
        </div>
      )}
    </div>
  );
}
