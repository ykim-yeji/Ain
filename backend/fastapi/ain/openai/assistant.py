import os
from openai import OpenAI

# OPENAI API KEY 키 값
openai_api_key = os.environ["OPENAI_API_KEY"]
# API 키로 OpenAI 클라이언트 생성
client = OpenAI(openai_api_key)