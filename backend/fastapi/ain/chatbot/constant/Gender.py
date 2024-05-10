from enum import Enum


class Gender(str, Enum):
    MALE = "남자"
    FEMALE = "여자"