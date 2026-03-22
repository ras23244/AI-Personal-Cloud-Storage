from fastapi import FastAPI
from pydantic import BaseModel
import requests
import tempfile
import os

from parser import parse_and_chunk

app = FastAPI()

class ParseRequest(BaseModel):
    file_url: str


@app.post("/parse")

def parse_document(request: ParseRequest):

    file_url = request.file_url

    response = requests.get(file_url)

    if response.status_code != 200:
        return {"error": "file download failed"}

    with tempfile.NamedTemporaryFile(delete=False) as temp:

        temp.write(response.content)
        temp_path = temp.name

    try:

        chunks = parse_and_chunk(temp_path)

        return {
            "chunks": chunks
        }

    finally:

        os.remove(temp_path)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("app:app", host="0.0.0.0", port=8000, log_level="info")