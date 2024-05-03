'use client'
import useCreateStore from "@/store/createStore";
import { useState, useEffect } from "react";

export default function LoadingPage() {

  const { mergeInput, genderInput } = useCreateStore();

  console.log(mergeInput)


    useEffect(() => {
      const fetchData = async () => {
  
        const requestBody = {
          idealPersonDescriptions: mergeInput,
          idealPersonGender: genderInput
        };
  
        try {
          const response = await fetch('https://myain/fastapi/api/ideal-people/images', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
          });
  
          if (response.ok) {
            const data = await response.json();
            console.log('data:', data )
            
          } else {
            // 서버로부터 오류 응답 받음
            throw new Error('Something went wrong');
          }
        } catch (error) {
          console.error('API request failed: ', error);
        } 
      };
  
      fetchData();
    }, [])
  

    return <div className="relative mt-[65px] mb-[68px] w-full h-full flex flex-col justify-center items-center">
      <img src="./gif/loading_circle.gif" className="w-[55%] rounded-full shadow-xl" />
      <p className="text-center text-xl text-white mt-10 leading-relaxed">조금만 기다려주시면 <br />아인과의 <span className="text-[#FF7FCE]">아름다운 만남</span>이 <br />시작될 거예요</p>
      <img src="./background/loading_top.png" className="absolute top-0 right-0 w-1/3" />
      <img src="./background/loading_bottom.png" className="absolute bottom-0 left-0 w-[60%]"/>
    </div>;
  }
  