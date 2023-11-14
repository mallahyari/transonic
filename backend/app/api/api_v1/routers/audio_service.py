from fastapi import APIRouter, Depends, HTTPException, status, Response, Request, UploadFile
from fastapi.responses import StreamingResponse
from app.config import settings
from app.data_models.schemas import UserQuery
from typing import List, Dict, Any, Optional, AsyncGenerator
import tempfile
import structlog
import os
import torch
from transformers import pipeline

from faster_whisper import WhisperModel




logger = structlog.get_logger()

audio_router = r = APIRouter()

device = "cuda:0" if torch.cuda.is_available() else "cpu"

model = WhisperModel('medium', device="cpu", compute_type="int8")


pipe = pipeline("automatic-speech-recognition",
                settings.whisper_model,
                generate_kwargs={"task": "transcribe", "language": "en"},
                torch_dtype=torch.float32,
                device=device)

pipe.model = pipe.model.to_bettertransformer()


@r.post("/transcribe")
async def transcribe_audio(file: UploadFile):
    try:
        # Create a directory to store audio files if not exists
        os.makedirs("audio_files", exist_ok=True)

        # Save the audio file to a unique filename
        audio_path = f"audio_files/{'test'}.wav"
        
        logger.info(f"{audio_path}")
        # transcript = "Consumer prices were unchanged from the prior month in October as a drop in oil prices dragged down headline inflation while core inflation rose at the slowest annual pace in September 2021, according to the latest data from the Bureau of Labor statistic released Tuesday morning. The Consumer Price Index, or CPI, showed prices rose 0% over last month and 3.2% over the prior year in October, a declaration from September's 0.4% monthly increase and 3.7% annual gain in prices. Economists had expected prices to increase 0.1% month over month and 3.3% year over year, according to data from Bloomberg."
        # return {"transcript": transcript}

        content = await file.read()
        # Create a temporary file to store the PDF content
        with tempfile.NamedTemporaryFile(dir="audio_files", suffix=".wav", delete=False) as temp_file:
            temp_file.write(content)
            temp_file_path = temp_file.name
            
            logger.info(temp_file_path)
            
            segments, info = model.transcribe(temp_file_path, beam_size=5)

            print("Detected language '%s' with probability %f" % (info.language, info.language_probability))
            segments = list(segments) 
            transcript = ""
            for segment in segments:
                transcript += segment.text
            logger.info(f"transcript: {transcript}")
            return {"transcript": transcript,"message": "Audio file received and saved successfully."}

    except Exception as e:
        # Handle errors and return an appropriate response
        return {"message": f"Error: {str(e)}"}


@r.post("/transcribe/chunk")
async def transcribe_audio(file: UploadFile):
    try:
        # Create a directory to store audio files if not exists
        os.makedirs("audio_files", exist_ok=True)

        # Save the audio file to a unique filename
        audio_path = f"audio_files/{'test'}.wav"
        
        logger.info(f"{audio_path}")
        
        
        content = await file.read()
        # Create a temporary file to store the PDF content
        with tempfile.NamedTemporaryFile(dir="audio_files", suffix=".wav", delete=False) as temp_file:
            temp_file.write(content)
            temp_file_path = temp_file.name
            
            logger.info(temp_file_path)
            
            transcript = pipe(temp_file_path,
               chunk_length_s=30,
               batch_size=24,
               language='fa',
               return_timestamps=True)

            logger.info(f"transcript: {transcript}")
            return {"transcript": transcript["text"],"message": "Audio file received and saved successfully."}

    except Exception as e:
        # Handle errors and return an appropriate response
        return {"message": f"Error: {str(e)}"}


