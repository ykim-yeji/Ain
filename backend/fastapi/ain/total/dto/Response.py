from pydantic import BaseModel
from enum 

class Response(BaseModel):
    code: int
    status: str
    message: str
    data: dict

    def success(cls, success_code: SuccessCode, data: dict = None):
        return cls(
            code = 200,
            status = "OK",
            message = success_code,
            data = data or {}
        )