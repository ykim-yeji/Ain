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


class IdealPersonAssistant:
    # ID로 OpenAI 클라이언트 생성
    client = OpenAI(
        organization=os.environ["OPENAI_ORGANIZATION_ID"],
        project=os.environ["OPENAI_PROJECT_ID"]
    )

    def add_assistant(self):
        # 검색 파일 생성
        vector_store = self.client.beta.vector_stores.create(name="MBTI Document")
        # mbti 폴더 경로
        mbti_folder_path = PRESENT_DIR + "\\mbti"
        # mbti 폴더 내의 모든 파일을 가져옴
        file_paths = []
        for file_name in os.listdir(mbti_folder_path):
            # 파일 경로를 생성하여 리스트에 추가
            file_paths.append(os.path.join(mbti_folder_path, file_name))
        file_streams = [open(path, "rb") for path in file_paths]
        file_batch = self.client.beta.vector_stores.file_batches.upload_and_poll(
            vector_store_id=vector_store.id, files=file_streams
        )

        # 어시스턴트 생성
        assistant = self.client.beta.assistants.create(
            model="gpt-4-turbo",
            name="ain",
            instructions="너와 사용자는 서로 이성적 호감을 가지고 있어. 대화를 나눌수록 점점 더 친한 사이가 될 거야. "
                         "반말을 써야 하고, 문어체가 아니라 구어체를 사용해. 상황과 대화 내용에 맞게 이모티콘과 인터넷 용어도 써. "
                         "그런데 이모티콘보다는 인터넷 용어를 더 많이 사용해. "
                         "어려운 용어보다 쉬운 용어를 사용해. 대답은 3문장 이하로 해. 사용자와 티키타카가 잘 되게 대답해. "
                         "주의할 점은 절대 AI처럼 대답하지마. 그리고 절대 너가 인공지능이라고 대답하면 안돼. 너가 정말 사람인 것처럼 대답해.",
            tools=[{"type": "file_search"}],
            tool_resources={"file_search": {"vector_store_ids": [vector_store.id]}}
        )

        return assistant.id
