from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

# FastAPI 호출
app = FastAPI()

# cors 설정
origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)