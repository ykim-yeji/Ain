from pydantic import BaseModel
from total.constant.SuccessCode import SuccessCode


class Response(BaseModel):
    code: int
    status: str
    message: str
    data: dict

    @classmethod
    def success(cls, success_code: SuccessCode, data: dict = None):
        return cls(
            code=200,
            status="OK",
            message=success_code.value,
            data=data or {}
        )