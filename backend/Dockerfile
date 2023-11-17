
FROM python:3.10

RUN mkdir /app
WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt


COPY . .

# Expose the port on which FastAPI runs
EXPOSE 8000

CMD [ "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]