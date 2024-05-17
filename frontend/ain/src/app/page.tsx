"use client";

import Link from "next/link";

import { useState } from "react";

import { useRouter } from "next/navigation";

import useModalStore from "@/store/modalStore";
import useUserStore from "@/store/userStore";
import Swal from "sweetalert2";

export default function Home() {
  const router = useRouter();
  const {
    nicknameModalState,
    setNicknameModalState,
    testNum,
    increaseTestNum,
  } = useModalStore();
  const [idealNum, setIdealNum] = useState<number>();

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const { isLogin, accessToken } = useUserStore();

  const confirmIdealCnt = async () => {
    try {
      const res = await fetch(`${API_URL}/ideal-people/count`, {
        headers: {
          Authorization: `Bearer ` + accessToken,
        },
      });
      if (res.ok) {
        const result = await res.json();
        setIdealNum(result.data.idealPersonCount);
      } else {
        console.log(res.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const idealNumTest = () => {
    if (isLogin === true) {
      confirmIdealCnt().then(() => {
        if (idealNum !== undefined) {
          if (idealNum === 10) {
            Swal.fire({
              text: "아인은 최대 10명까지 생성 가능합니다!",
              icon: "warning",
              heightAuto: false,
            });
          } else if (idealNum !== undefined) {
            router.push(`/create`);
          }
        }
      });
    } else {
      router.push(`/create`);
    }
  };

  return (
    <main className="mt-[65px] mb-[68px] w-full h-full text-center flex flex-col justify-between">
      <div className="w-full h-full flex flex-col justify-evenly items-center pb-10">
        <img src="./gif/main_heart.gif" className="w-[80%]" />
        <div className="text-xl text-white leading-relaxed">
          당신의 아인을 <br />
          지금 만나러 가세요
        </div>
        <button
          type="button"
          onClick={idealNumTest}
          className="w-[200px] h-12 mb-2 bg-[#AB42CF] rounded-full text-center text-white text-xl shadow-md"
        >
          만나러 가기
        </button>

        {/* <Link href='/create'>
          <button className='w-[200px] h-12 mb-2 bg-[#AB42CF] rounded-full text-center text-white text-xl shadow-md'>
            만나러 가기
          </button>
        </Link> */}
      </div>
      <div className="w-full relative">
        <img
          src="./background/main_left.png"
          className="absolute w-[40%] bottom-0 left-0"
        />
        <img
          src="./background/main_right.png"
          className="absolute w-[45%] bottom-0 right-0"
        />
      </div>
    </main>
  );
}
