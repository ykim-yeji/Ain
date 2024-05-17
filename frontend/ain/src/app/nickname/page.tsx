"use client";

import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";

import useUserStore from "@/store/userStore";
import Swal from "sweetalert2";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Page() {
  const [inputValue, setInputValue] = useState<string>("");

  const { accessToken, setAccessToken, refreshToken } = useUserStore();

  // userStore에서 가져오기 (일단 localStorage에서 가져오기도 가능)
  console.log("ACCESS", accessToken);

  const router = useRouter();

  const koreanRegex = /^[가-힣]*$/;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 5) {
      e.target.value = e.target.value.slice(0, 5);
    }

    setInputValue(e.target.value);
  };

  const postMyNickname = async () => {
    if (
      koreanRegex.test(inputValue) &&
      inputValue !== "" &&
      inputValue !== null &&
      accessToken !== null
    ) {
      // fetch post

      try {
        console.log(`bearer ` + accessToken);
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
              title: "닉네임 등록을 성공했습니다!",
              showConfirmButton: false,
              timer: 1500,
              heightAuto: false,
            });
            router.push("/");
          } else if (result.code === 400) {
            // alert("ERROR_BAD_REQUEST");
            return;
          } else if (result.code === 401) {
            // alert(
            //   "ERROR_UNAUTHORIZED, refreshToken으로 accessToken을 재발급합니다."
            // );
            // 여기서 토큰재발급 함수를 실행하려고 했는데...
            return;
          } else if (result.code === 403) {
            // alert("ERROR_FORBIDDEN");
            return;
          } else if (result.code === 404) {
            // alert("ERROR_NOT_FOUND");
            return;
          } else {
            // alert("400, 401, 403, 404 제외 에러 발생");
            return;
          }
        } else {
          Swal.fire({
            icon: "error",
            text: "닉네임 등록에 실패했습니다.",
            heightAuto: false,
          });
          // console.log(res.status);
          return;
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          text: "닉네임 등록에 실패했습니다.",
          heightAuto: false,
        });
        // console.log(error);
        // throw new Error();
      }
    } else {
      Swal.fire({
        icon: "error",
        text: "닉네임은 한글 1~5자로 설정해주세요.",
        showConfirmButton: false,
        timer: 1500,
        heightAuto: false,
      });
    }
  };

  return (
    <div className="text-center flex flex-col items-center h-full justify-center">
      <div className="text-2xl text-white mt-10 ">
        <div className="">아인이 불러줄 당신의</div>
        <div>닉네임을 입력해주세요.</div>
      </div>
      <input
        type="text"
        className="mt-4 mx-10 w-40 x-2 py-2 rounded-md text-center text-lg text-white outline-0"
        value={inputValue}
        style={{ backgroundColor: "#F4DBFD" }}
        placeholder="사용자"
        maxLength={5}
        onChange={(e) => handleInputChange(e)}
      />
      <button
        type="button"
        onClick={postMyNickname}
        // onClick={setIdealNickname}
        className="mt-2 mb-10 w-40 border-solid rounded-full px-2 py-2 mx-4 text-lg text-white"
        style={{ backgroundColor: "#BE44E9" }}
      >
        확인
      </button>
    </div>
  );
}
