'use client'

import useCreateStore from "@/store/createStore";
import { useRouter } from 'next/navigation'
import { useState, useEffect } from "react";

export default function ResultPage() {

    const router = useRouter()
    const { mergeInput, genderInput, mbti, imageUrl, characterName } = useCreateStore();

    const reCreate = () => {    

        useCreateStore.setState(state => ({ mergeInput: '', genderInput: null,  mbti: '', imageUrl: '', characterName: ''}))
        router.push('/create')

    }

    const save = () => {
        
        router.push('/chat')
    }

    // useEffect(() => {
    //   console.log('1', mergeInput, '2', genderInput, '3', mbti, '4', imageUrl, '5', characterName)
    // }, [ mergeInput, genderInput, mbti, imageUrl, characterName ])
    



    return <div className="relative mt-[65px] mb-[68px] w-full h-full flex flex-col justify-evenly items-center">
        <img src="./gif/result_firework2.gif" className="absolute top-[180px] left-1/2 transform -translate-x-1/2 -translate-y-1/2"/>

        {/* 이상형 정보 */}
        <div className="w-full h-[75%] flex flex-col justify-center items-center">
            <div className="relative w-full flex justify-center items-center">
              <img src="./image/purple_speech.png" alt="" className="w-[300px] mb-4 z-10"/> 
              <p className="absolute top-[50px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-[15px]">
                 제 이름은 <span className="text-[#FF7FCE] text-xl">{characterName}</span> 입니다. <br />만나서 반가워요!</p>  
            </div>
                          
            {/* 이상형 결과 */}
            <div className="relative w-full flex flex-col items-center justify-center">
                <div className="relative w-[250px] h-[250px]">
                    <img src="./image/purple_circle.jpg" className="rounded-full"/>
                    <div className="absolute w-[220px] h-[220px] bg-[#faedff] rounded-full shadow-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"></div>
                </div>       
                <img src={imageUrl} className="absolute w-[150px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20" />
            </div>
              
        </div>
        {/* 저장하기 */}
        <div className="w-[300px] h-[25%] flex justify-around items-start">
            <button onClick={reCreate}
            className="w-[120px] h-[130px] bg-[#EDBAFF] rounded-2xl text-white text-lg shadow-xl flex flex-col items-center justify-evenly">
                <img src="./image/arrow_circle.png" className="w-[35px]" />다시할래요</button>
            <button onClick={save}
            className="w-[120px] h-[130px] bg-[rgba(190,68,233,0.7)] rounded-2xl text-white text-lg shadow-xl flex flex-col items-center justify-evenly">
            <img src="./image/heart_plus.png" className="w-[40px]" />저장할래요</button>
        </div>
    </div>;
  }
  