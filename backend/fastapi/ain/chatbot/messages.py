import os
import logging
import time
from datetime import datetime, timedelta, timezone

from openai import OpenAI
from dotenv import load_dotenv
from chatbot.dto.ChatDTO import *

# 로깅 설정
logging.basicConfig(level=logging.INFO)

# 환경변수 설정
PRESENT_DIR = os.path.dirname(os.path.abspath(__file__))
PREVIOUS_DIR = os.path.dirname(PRESENT_DIR)
load_dotenv(os.path.join(PREVIOUS_DIR, ".env"))


class IdealPersonMessage:
    # ID로 OpenAI 클라이언트 생성
    client = OpenAI(
        organization=os.environ["OPENAI_ORGANIZATION_ID"],
        project=os.environ["OPENAI_PROJECT_ID"]
    )

    # 메시지 생성, 스레드에 저장
    def send_message(self, thread_id: str, chat_message_content: str):
        message = self.client.beta.threads.messages.create(
            thread_id=thread_id,
            role="user",
            content=chat_message_content
        )

    # 답장 받기
    def get_message(self, chat_info: AddIdealPersonChatRequest):
        run = self.add_run(chat_info)
        # 런이 완료될 때까지 대기
        self.poll_run(run, chat_info.idealPersonThreadId)
        reply_chat_message = self.get_reply_message(chat_info.idealPersonThreadId)

        return IdealPersonReplyChatResponse(
            id=reply_chat_message.id,
            content=reply_chat_message.content[0].text.value,
            time=self.convert_time(reply_chat_message.created_at)
        )

    # 런 생성
    def add_run(self, chat_info):
        member_nickname_instruction = ""
        if len(chat_info.memberNickname) == 1:
            member_nickname_instruction = "사용자는 성은 가지고 있지 않고 사용자의 이름은 " + chat_info.memberNickname[0] +"야."
        else:
            member_nickname_instruction = "사용자의 성은 " + chat_info.memberNickname[0] + "이고 이름은 " + chat_info.memberNickname[1:] +"야."

        run = self.client.beta.threads.runs.create(
            assistant_id=chat_info.idealPersonAssistantId,
            thread_id=chat_info.idealPersonThreadId,
            additional_instructions="네 성은 " + chat_info.idealPersonFullName[0] + "이고 이름은 " + chat_info.idealPersonFullName[1:] + "이야. "
                                    "네 성별은 " + chat_info.idealPersonGender.value + "이야. "
                                    "" + member_nickname_instruction + " "
                                    "네 별명은 " + chat_info.idealPersonNickname + "이고 친한 사이에서만 네 별명을 부를 수 있어. "
                                    "사용자를 부를 때 사용자의 성은 빼고 사용자의 이름만 불러. "
                                    "네 MBTI는 " + chat_info.idealPersonMbti.value + "야. "
                                    "" + chat_info.idealPersonMbti.value + "_Document.txt 내용을 바탕으로 네 성격을 만들어. "
                                    "사용자가 대화를 요청하면 네 성격을 바탕으로 실제 사람처럼 대답해."
        )

        return run

    # 이상형 답장 메시지 추출
    def get_reply_message(self, thread_id: str):
        messages = self.client.beta.threads.messages.list(thread_id=thread_id, limit=1)

        return messages.data[0]

    # 런이 완료되었는지 확인하는 함수
    def poll_run(self, run, thread_id):
        while run.status != "completed":
            run = self.client.beta.threads.runs.retrieve(
                thread_id=thread_id,
                run_id=run.id
            )
            time.sleep(0.5)

    # 시간 변환
    def convert_time(self, chat_time):
        chat_utc_time = datetime.utcfromtimestamp(chat_time)
        korea_timezone = timezone(timedelta(hours=9))
        chat_korea_time = chat_utc_time.replace(tzinfo=timezone.utc).astimezone(korea_timezone)

        return chat_korea_time.strftime('%Y-%m-%d %H:%M')

    # 메세지 조회
    def get_dialogs(self, thread_id, last_chat_id):
        if last_chat_id is None:
            thread_messages = self.client.beta.threads.messages.list(thread_id, limit=30)
        else:
            thread_messages = self.client.beta.threads.messages.list(thread_id, limit=30, after=last_chat_id)

        chats = []
        for thread_message in thread_messages.data:
            chats.append(GetIdealPersonChatResponse(
                chatMessageId=thread_message.id,
                chatMessage=thread_message.content[0].text.value,
                chatSender=thread_message.role,
                chatTime=self.convert_time(thread_message.created_at)
            ))

        if thread_messages.has_more:
            isLastChat = False
        else:
            isLastChat = True
        chats.reverse()
        return GetIdealPeopleChatsResponse(
            chats=chats,
            isLastChats=isLastChat
        )