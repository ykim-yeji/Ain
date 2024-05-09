import os
import logging

from openai import OpenAI
from dotenv import load_dotenv

# 로깅 설정
logging.basicConfig(level=logging.INFO)

# 환경변수 설정
PRESENT_DIR = os.path.dirname(os.path.abspath(__file__))
PREVIOUS_DIR = os.path.dirname(PRESENT_DIR)
load_dotenv(os.path.join(PREVIOUS_DIR, ".env"))


class IdealPersonThread:
    # ID로 OpenAI 클라이언트 생성
    client = OpenAI(
        organization=os.environ["OPENAI_ORGANIZATION_ID"],
        project=os.environ["OPENAI_PROJECT_ID"]
    )

    def add_thread(self):
        # 스레드 생성
        thread = self.client.beta.threads.create()

        return thread.id