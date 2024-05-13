from pydantic import BaseModel
from chatbot.constant.Gender import Gender
from chatbot.constant.Mbti import Mbti


class AddIdealPersonChatRequest(BaseModel):
    idealPersonAssistantId: str
    idealPersonThreadId: str
    idealPersonFullName: str
    idealPersonNickname: str
    idealPersonGender: Gender
    idealPersonMbti: Mbti
    memberNickname: str
    memberChatMessage: str


class AddIdealPersonChatResponse(BaseModel):
    idealPersonChatMessageId: str
    idealPersonChatMessage: str
    idealPersonChatTime: str


class IdealPersonReplyChatResponse(BaseModel):
    id: str
    content: str
    time: str


class DeleteIdealPersonReqeust(BaseModel):
    idealPersonThreadId: str


class GetIdealPersonChatRequest(BaseModel):
    idealPersonThreadId: str
    lastChatMessageId: str


class GetIdealPersonChatResponse(BaseModel):
    chatMessageId: str
    chatMessage: str
    chatSender: str
    chatTime: str