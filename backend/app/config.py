from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    whisper_model: str = "openai/whisper-base"
    openai_api_key: str

    class Config:
        env_file = ".env"


settings = Settings()