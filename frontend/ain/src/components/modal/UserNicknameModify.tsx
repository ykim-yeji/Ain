"use client";

import React from "react";
import { useState, useEffect, ChangeEvent } from "react";

import { useRouter } from "next/navigation";

import useUserStore from "@/store/userStore";

import useModalStore from "@/store/modalStore";
import Swal from "sweetalert2";

interface Props {
  closeModal: any;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function UserNicknameModifyModal({ closeModal }: Props) {
  const router = useRouter();
  const [inputValue, setInputValue] = useState<string>("");
  const [originNickname, setOriginNickname] = useState<string>("");

  const {
    nicknameModalState,
    setNicknameModalState,
    setHeaderDropDown,
    setIsNicknameModified,
  } = useModalStore();

  const { accessToken } = useUserStore();
  const koreanRegex = /^[가-힣]*$/;

  useEffect(() => {
    if (accessToken !== null) {
      const getMyNickname = async () => {
        try {
          const res = await fetch(`${API_URL}/members`, {
            headers: {
              Authorization: `Bearer ` + accessToken,
            },
          });

          if (res.ok) {
            const result = await res.json();

            // 이때 store에 있는 유저 닉네임도 변경??
            //  아니면 유저 닉네임을 기존 store에서 가져올까?
            if (result.code === 200) {
              setOriginNickname(result.data.memberNickname);
            } else if (result.code === 401) {
              // alert('ERROR UNAUTHORIZED');
              return;
            } else if (result.code === 403) {
              // alert('ERROR FORBIDDEN');
              return;
            } else if (result.code === 404) {
              // alert('ERROR NOT FOUND');
              return;
            } else {
              // alert('401, 403, 404 이외 에러 발생');
              return;
            }
          } else {
            console.log("에러발생");
            return;
          }
        } catch (error) {
          // alert('에러발생으로 닉네임 정보 불러오기 실패');
          console.log(error);
        }
      };

      // 로그인이 되어있어야 자동 실행되게끔...?
      getMyNickname();
    }
  }, []);

  const modifyMyNickname = async () => {
    if (
      koreanRegex.test(inputValue) &&
      inputValue !== "" &&
      inputValue !== null &&
      accessToken !== null
    ) {
      // fetch post
      // alert(accessToken);
      try {
        const res = await fetch(`${API_URL}/members`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + accessToken,
          },
          body: JSON.stringify({
            memberNickname: inputValue,
          }),
        });

        if (res.ok) {
          const result = await res.json();

          if (result.code === 200) {
            Swal.fire({
              icon: "success",
              title: "닉네임 수정에 성공했습니다!",
              showConfirmButton: false,
              timer: 1500,
              heightAuto: false,
            });
            setIsNicknameModified();
            closeModal();
          } else if (result.code === 400) {
            // alert('ERROR_BAD_REQUEST');
            return;
          } else if (result.code === 401) {
            // alert('ERROR_UNAUTHORIZED');
            return;
          } else if (result.code === 403) {
            // alert('ERROR_FORBIDDEN');
            return;
          } else if (result.code === 404) {
            // alert('ERROR_NOT_FOUND');
            return;
          } else {
            // alert('400, 401, 403, 404 제외 에러 발생');
            console.log(result);
            return;
          }
        } else {
          Swal.fire({
            icon: "error",
            text: "닉네임 등록에 실패했습니다.",
            heightAuto: false,
          });
          console.log(res.status);
          return;
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          text: "닉네임 등록에 실패했습니다.",
          heightAuto: false,
        });
        console.log(error);
        // throw new Error();
      }
    } else {
      Swal.fire({
        icon: "error",
        text: "닉네임은 한글 1~5자로 설정해주세요.",
        heightAuto: false,
      });
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 5) {
      e.target.value = e.target.value.slice(0, 5);
    }

    setInputValue(e.target.value);
  };

  return (
    <div onClick={setNicknameModalState}>
      <div className="fixed left-1/2 bottom-1/2 transform -translate-x-1/2 translate-y-1/2 flex items-center justify-center w-full h-full text-center z-20">
        <div
          onClick={setNicknameModalState}
          className="bg-white flex flex-col rounded-3xl"
          style={{
            width: "250px",
            height: "250px",
            backgroundColor: "#F0D5FA",
          }}
        >
          <button className="self-end mt-2 mr-4" onClick={closeModal}>
            X
          </button>
          <div className="mt-2 text-xl">수정할 닉네임을</div>
          <div className="mb-6 text-xl">입력해주세요.</div>
          <input
            className="mx-10 px-2 py-2 rounded-md text-center text-lg text-white outline-0 shadow-md"
            type="text"
            value={inputValue}
            style={{ backgroundColor: "#C37CDB" }}
            placeholder={originNickname}
            maxLength={5}
            onChange={(e) => handleInputChange(e)}
          />
          <button
            // onClick={modifyNickname}
            onClick={modifyMyNickname}
            className="mt-2 border-solid rounded-full  px-2 py-2 mx-10 text-lg text-white shadow-md"
            style={{ backgroundColor: "#BE44E9" }}
          >
            확인
          </button>
        </div>
      </div>

      {/* {nicknameModalState && (
        <div
          className='overlay fixed top-0 left-0 w-full h-full bg-black opacity-70 z-30'
          onClick={setNicknameModalState}
        />
      )} */}
    </div>
  );
}
