from enum import Enum


class SuccessCode(Enum):
    # 챗봇
    CREATE_IDEAL_PERSON_CHATBOT = "이상형 챗봇을 생성하는데 성공했습니다!"
    DELETE_IDEAL_PERSON_CHATBOT = "이상형 챗봇을 삭제하는데 성공했습니다!"

    # 채팅
    CREATE_IDEAL_PERSON_CHAT = "이상형에게 채팅 메시지를 전송하는데 성공했습니다!"