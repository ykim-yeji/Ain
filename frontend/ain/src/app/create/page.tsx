'use client'

import router from "next/router"
import useCreateStore from "@/store/createStore"
import { useState } from "react"
import Link from "next/link"

export default function CreatePage() {

  const [currentNum, setCurrentNum] = useState<number>(1)

  const [genderInput, setGenderInput] = useState<number>(0)
  const [faceInput, setFaceInput] = useState<string>('')
  const [shapeInput, setShapeInput] = useState<string>('')
  const [ectInput, setEctInput] = useState<string>('')

  const submitInput = () => {
    if (genderInput !== 0) {
      useCreateStore.setState(state => ({ mergeInput: faceInput + shapeInput + ectInput}))
      // router.push('/loading');
    }
    else {
      alert('성별을 선택해 주세요')
    }
  }

  return <div className="w-full h-full flex flex-col">
    {/* 현재 인덱스 표시 */}
    <div className="w-full h-[15%] flex items-center justify-center">
      <div  className={`w-3 h-3 mx-2 ${currentNum === 1 ? 'bg-white' : 'bg-[#D9D9D9]'} rounded-full shadow-md`}></div>
      <div  className={`w-3 h-3 mx-2 ${currentNum === 2 ? 'bg-white' : 'bg-[#D9D9D9]'} rounded-full shadow-md`}></div>
      <div  className={`w-3 h-3 mx-2 ${currentNum === 3 ? 'bg-white' : 'bg-[#D9D9D9]'} rounded-full shadow-md`}></div>
      <div  className={`w-3 h-3 mx-2 ${currentNum === 4 ? 'bg-white' : 'bg-[#D9D9D9]'} rounded-full shadow-md`}></div>
      <div  className={`w-3 h-3 mx-2 ${currentNum === 5 ? 'bg-white' : 'bg-[#D9D9D9]'} rounded-full shadow-md`}></div>
    </div>

    {/* 입력칸 영역 */}
    <div className="w-full h-[85%] flex flex-row items-start justify-center">
      
      {currentNum !== 5 ? (
      <div className="w-[70%] h-[90%] bg-[#F0D5FA] rounded-xl shadow-lg  flex flex-col items-center">
        <div className="w-[80%] h-6 mt-[10%]">
          {currentNum != 1 &&(
          <button onClick={(event) => setCurrentNum(currentNum -1)}>
            <img src="./icon/angle_left_purple.png" className="w-[10px]" />            
          </button>)}
        </div>

        {/* 질문 */}
        <div className="w-[80%] h-[15%] flex flex-col justify-start text-center text-lg text-bold text-black">
        {currentNum === 1 && (
          <p>아인의 성별은 <br />무엇인가요?</p>
        )}
        {currentNum === 2 && (
          <p>당신의 아인은 <br />어떤 이목구비를 가졌나요?</p>
        )}
        {currentNum === 3 && (
          <p>어떤 얼굴형과 <br />헤어스타일을 가졌나요?</p>
        )}
        {currentNum === 4 && (
          <p>기타 생김새를 <br /> 입력해주세요</p>
        )}
        </div>   

         {/* 이상형 성별 입력 받기 */}
        {currentNum == 1 ? (
        <div className="w-[80%] h-[60%] flex justify-center items-center bg-white rounded-xl px-4">
          <button  className={`flex flex-col items-center py-2 border-r-2 border-dashed rounded-md 
          ${genderInput === 1 ? 'bg-[#C5EEFF]' : 'hover:bg-[#C5EEFF]'}`}
          onClick={(event)=> {setGenderInput(1), setCurrentNum(2)}}>
            <img src="./icon/boy.png" className="w-[80%]"/>
            <p className="mt-6">남성</p>
          </button>
          <button  className={`flex flex-col items-center py-2 rounded-md 
          ${genderInput === 2 ? 'bg-[#FFD2F2]' : 'hover:bg-[#FFD2F2]'}`}
          onClick={(event)=> {setGenderInput(2), setCurrentNum(2)}}>
            <img src="./icon/girl.png" className="w-[80%]"/>   
            <p className="mt-6">여성</p>         
          </button>
        </div>)

        // 이상형 생김새 입력 받기
        : (
        <div className="w-[80%] h-[50%] flex justify-center items-center bg-white rounded-xl">
        {currentNum === 2 && (
          <textarea className="w-[90%] text-sm outline-none resize-none text-center" rows={10}
          value={faceInput} onChange={(event)=> setFaceInput(event.target.value)} placeholder='이목구비 입력 예시'/>
        )}
        {currentNum === 3 && (
          <textarea className="w-[90%] text-sm outline-none resize-none text-center" rows={10}
          value={shapeInput} onChange={(event)=> setShapeInput(event.target.value)} placeholder='얼굴형, 헤어스타일 입력 예시'/>
        )}
        {currentNum === 4 && (
          <textarea className="w-[90%] text-sm outline-none resize-none text-center" rows={10}
          value={ectInput} onChange={(event)=> setEctInput(event.target.value)} placeholder='기타 생김새 입력 예시'/>
        )}
        </div>)}

        {/* 입력완료, 잘 모르겠어요 버튼 */}
        {currentNum !== 1 && (
        <div className="w-[80%] h-[25%] flex flex-col items-center justify-center">
          <button className="w-[150px] h-[50px] bg-[#C776E3] rounded-2xl shadow-md text-center text-white text-lg hover:bg-[#AB42CF]"
          onClick={(event) => setCurrentNum(currentNum + 1)}>
            <p>입력 완료</p>
          </button>
          <button className="text-xs mt-4 text-[#5F0F7A]" 
          onClick={(event) => setCurrentNum(currentNum + 1)}>잘 모르겠어요..</button>
        </div>)}
      </div>)

      // currentNum이 5일때
      : (
        <div className="w-[70%] h-full flex flex-col justify-start items-center">
          <img src="./gif/question.gif" className="w-[70%]"/>
          <div className="w-[90%] h-[220px] bg-[#F0D5FA] rounded-2xl flex flex-col items-center justify-evenly shadow-xl">
            <div className="w-[80%] h-6 flex flex-col justify-end">
              <button onClick={(event) => setCurrentNum(currentNum -1)}>
                <img src="./icon/angle_left_purple.png" className="w-[10px]" />            
              </button>
            </div>
            <p className=" w-full text-lg text-center text-black">아인이 당신을 <br />기다리고 있어요!</p>
            <Link href='/loading' className="w-full flex justify-center">
            <button className="w-[70%] h-14 mb-2 bg-[#AB42CF] rounded-xl text-center text-white shadow-md"
            onClick={submitInput}>만나러 가기</button>
            </Link>                  
          </div>
        </div>
      )}
      
    </div>
  </div>
}


