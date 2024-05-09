import logging
import uvicorn
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from chatbot.assistants import IdealPersonAssistant
from total.dto.Response import Response
from total.constant.SuccessCode import SuccessCode

from pydantic import BaseModel
from fastapi.responses import StreamingResponse
import io
import dalle_test
from chatbot.threads import IdealPersonThread

# FastAPI 호출
app = FastAPI()

# 로깅 설정
logging.basicConfig(level=logging.INFO)

# 모든 IP주소 연결 허용
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0")

# cors 설정
origins = ["https://myain.co.kr", "http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["MBTI"]
)


class IPContent(BaseModel):
    idealPersonDescriptions: str
    idealPersonGender: str

# assistant 생성
@app.post("/assistants/ideal-people")
async def add_ideal_person_assistant(
):
    try:
        ideal_person_assistant_id = IdealPersonAssistant().add_assistant()

        return {"idealPersonAssistantId": ideal_person_assistant_id}
    except Exception as e:
        logging.error(e)

# 이상형 챗봇 생성
@app.post("/chatbots/ideal-people")
async def add_ideal_person_chatbot(
):
    try:
        ideal_person_thread_id = IdealPersonThread().add_thread()

        return Response.success(SuccessCode.CREATE_IDEAL_PERSON_CHATBOT, data={"idealPersonThreadId": ideal_person_thread_id})
    except Exception as e:
        logging.error(e)


@app.post("/ideal-people/images")
async def generate_image(
        ip_content: IPContent,
):
    try:
        image = dalle_test.call_dalle(
            description=ip_content.idealPersonDescriptions,
            gender=ip_content.idealPersonGender
        )

        # PIL 처리
        img_byte_arr = io.BytesIO()
        image.save(img_byte_arr, format='PNG')
        img_byte_arr.seek(0)

        headers = {"MBTI": "ENTP"}
        return StreamingResponse(img_byte_arr, headers=headers)

    except Exception as e:
        # 에러 발생 시 적절한 에러 메시지와 에러 코드 반환
        print(e)
        return e


@app.post("/test")
async def test():
    return {"test": "test"}
