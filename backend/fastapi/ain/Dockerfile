FROM python:3.9
EXPOSE 8000
# 필요한 패키지 설치
RUN apt-get update && \
    apt-get install -y gcc git wget

COPY . /app
WORKDIR /app

# requirements.txt 설치
RUN pip install --use-deprecated=legacy-resolver -r requirements.txt
RUN pip install uvicorn
RUN pip install fastapi

ENTRYPOINT ["uvicorn", "main:app", "--reload", "--hostg", "0.0.0.0"]