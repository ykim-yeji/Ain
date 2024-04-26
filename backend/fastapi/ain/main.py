import logging
import uvicorn
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from chatbot.assistants import IdealPersonAssistant

# FastAPI 호출
app = FastAPI()

# 로깅 설정
logging.basicConfig(level=logging.INFO)

# 모든 IP주소 연결 허용
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0")

# cors 설정
origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/assistants/ideal-people")
async def add_ideal_person_chatbot(
):
    try:
        ideal_person_assistant_id = IdealPersonAssistant().add_assistant()

        return {"idealPersonAssistantId": ideal_person_assistant_id}
    except Exception as e:
        logging.error(e)