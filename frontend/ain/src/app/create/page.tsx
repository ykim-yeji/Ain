'use client'

import { useEffect, useState } from "react"

export default function CreatePage() {
  const [currentNum, setCurrentNum] = useState<number>(1)

  const [faceInput, setFaceInput] = useState<string>('')
  const [shapeInput, setShapeInput] = useState<string>('')
  const [ectInput, setEctInput] = useState<string>('')

  const [showPrev, setShowPrev] = useState<boolean>(false)
  const [showNext, setShowNext] = useState<boolean>(false)

  const movePrev = () => {
    setCurrentNum(currentNum -1)
  }

  const moveNext = () => {
    setCurrentNum(currentNum +1)
  }

  useEffect(() => {
    if (currentNum == 1) {
      setShowPrev(false)
      setShowNext(true)
    }
    else if (currentNum == 2) {
      setShowPrev(true)
      setShowNext(true)
    }
    else if (currentNum == 3) {
      setShowPrev(true)
      setShowNext(true)
    }
    else if (currentNum == 4) {
      setShowPrev(true)
      setShowNext(false)
    }
  }, [currentNum])
  




  return <div className="w-full h-full flex flex-col">
    {/* 현재 인덱스 표시 */}
    <div className="w-full h-[10%] pb-4 flex items-end justify-center">
      <div  className={`w-3 h-3 mx-2 ${currentNum === 1 ? 'bg-white' : 'bg-[#D9D9D9]'} rounded-full shadow-md`}></div>
      <div  className={`w-3 h-3 mx-2 ${currentNum === 2 ? 'bg-white' : 'bg-[#D9D9D9]'} rounded-full shadow-md`}></div>
      <div  className={`w-3 h-3 mx-2 ${currentNum === 3 ? 'bg-white' : 'bg-[#D9D9D9]'} rounded-full shadow-md`}></div>
      <div  className={`w-3 h-3 mx-2 ${currentNum === 4 ? 'bg-white' : 'bg-[#D9D9D9]'} rounded-full shadow-md`}></div>
    </div>
    {/* 입력칸 영역 */}
    <div className="w-full h-[75%] flex flex-row items-center justify-center">
      <div className="w-[15%] h-full flex flex-col items-center">
        {showPrev && (
        <button className="w-5 m-auto"
        onClick={movePrev}><img src="./icon/angle_left.png" /></button>
        )}   
      </div>

      {currentNum !== 4 ? (
      <div className="w-[70%] h-full bg-[#F0D5FA] rounded-xl shadow-lg  flex flex-col items-center">
        {/* 질문 */}
        <div className="w-[80%] h-[25%] flex flex-col justify-center text-center text-md text-bold text-black">
        {currentNum === 1 && (
          <p>당신의 아인은 <br />어떤 이목구비를 가졌나요?</p>
        )}
        {currentNum === 2 && (
          <p>어떤 얼굴형과 <br />헤어스타일을 가졌나요?</p>
        )}
        {currentNum === 3 && (
          <p>기타 생김새를 <br /> 입력해주세요</p>
        )}
        </div>   
        {/* 입력받기     */}
        <div className="w-[80%] h-[50%] flex justify-center items-center bg-white rounded-xl">
        {currentNum === 1 && (
          <textarea className="w-[90%] text-sm outline-none resize-none text-center" rows={10}
          value={faceInput} onChange={(event)=> setFaceInput(event.target.value)} placeholder='이목구비 입력 예시'/>
        )}
        {currentNum === 2 && (
          <textarea className="w-[90%] text-sm outline-none resize-none text-center" rows={10}
          value={shapeInput} onChange={(event)=> setShapeInput(event.target.value)} placeholder='얼굴형, 헤어스타일 입력 예시'/>
        )}
        {currentNum === 3 && (
          <textarea className="w-[90%] text-sm outline-none resize-none text-center" rows={10}
          value={ectInput} onChange={(event)=> setEctInput(event.target.value)} placeholder='기타 생김새 입력 예시'/>
        )}
        </div>
        <div className="w-[80%] h-[25%] flex items-center justify-center">
          <button className="w-full h-[60px] bg-[#EAACFF] rounded-3xl shadow-md text-center text-white text-lg">
            <p>잘 모르겠어요</p>
          </button>
        </div>
      </div>)
      : (
        <div className="w-[70%] h-full"></div>
      )}

      <div className="w-[15%] h-full flex flex-col items-center">
        {showNext && (
        <button className="w-5 m-auto"
        onClick={moveNext}><img src="./icon/angle_right.png" /></button> 
        )}   
      </div>
    </div>
  </div>
}

