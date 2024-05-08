'use client'

import useCreateStore from "@/store/createStore";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'

export default function LoadingPage() {

  const router = useRouter()

  const { mergeInput, genderInput } = useCreateStore();
  const [mbtiValue, setMbtiValue] = useState<string>('')

  const fetchCharacterImage = async () => {
  
    const requestBody = {
      idealPersonDescriptions: mergeInput,
      idealPersonGender: genderInput
    };

    try {
      await fetch('https://myain.co.kr/fast/ideal-people/images', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })

      .then((response: {blob(): any; headers: { get: (arg0: string) => any; }; 
        }) => {

        // 응답 헤더에서 'Mbti' 값을 추출
        const newMbti: string = response.headers.get('mbti');
        setMbtiValue(newMbti) 
        return response.blob();

      }) .then(blob => {
        // 받은 파일(blob)을 처리하는 로직을 작성합니다.
        const newUrl: string = URL.createObjectURL(blob); // blob 객체를 가리키는 URL을 생성
        useCreateStore.setState(state => ({ mbti: mbtiValue, imageUrl: newUrl }))
        // const image = document.createElement('img'); //새로운 <img> HTML 요소를 생성
        // image.src = url; //생성된 이미지 요소(image)의 소스(src) 속성에, 2단계에서 생성된 blob URL을 할당
        // document.body.appendChild(image);//이미지 요소를 문서의 body에 추가

    })
    } catch (error) {
      console.error('API request failed: ', error);
    } 
  };

  const fetchCharacterName = async () => {
    const requestBody = {
      idealPersonGender: genderInput
    };

    try {
      // await fetch('https://myain.co.kr/api/ideal-people/names', {
        const response = await fetch('https://bad7e4c4-8676-4672-86a2-212cf9b3de90.mock.pstmn.io/api/ideal-people/names', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })
      return response.json()

      .then((response): any  => {

        const newCharacterName : string = response.data.idealPersonName
        useCreateStore.setState(state => ({ characterName: newCharacterName }))
        
      }) 
    } catch (error) {
      console.error('API request failed: ', error);
    } 
  }

    useEffect(() => {

      fetchCharacterImage();
      fetchCharacterName()
      router.push('/result')
    }, [])
  

    return <div className="relative mt-[65px] mb-[68px] w-full h-full flex flex-col justify-center items-center">
      <img src="./gif/loading_circle.gif" className="w-[55%] rounded-full shadow-xl" />
      <p className="text-center text-xl text-white mt-10 leading-relaxed">조금만 기다려주시면 <br />아인과의 <span className="text-[#FF7FCE]">아름다운 만남</span>이 <br />시작될 거예요</p>
      <img src="./background/loading_top.png" className="absolute top-0 right-0 w-1/3" />
      <img src="./background/loading_bottom.png" className="absolute bottom-0 left-0 w-[60%]"/>
    </div>;
  }

