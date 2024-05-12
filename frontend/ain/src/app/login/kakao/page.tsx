"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import useUserStore from "@/store/userStore";
import { access } from "fs";

const client_id = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
const redirect_uri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

export default function Page() {
  const param = useSearchParams();
  const router = useRouter();
  const [authCode, setAuthCode] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

  const [isNewMember, setIsNewMember] = useState(false);

  const { isLogin, setIsLogin, accessToken, setAccessToken } = useUserStore();

  useEffect(() => {
    const getAccessToken = async () => {
      if (param?.get("authorization")) {
        setAccessToken(param.get("authorization") as string);
        console.log("!!", accessToken);
      }
      if (authCode !== "") {
        alert(authCode);
      }
    };
    getAccessToken();
  }, [param, authCode]);

  return (
    <div className="flex allign-center text-center items-center">
      <div>카카오 소셜 로그인 중입니다.</div>
    </div>
  );
}
