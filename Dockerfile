FROM tiangolo/uvicorn-gunicorn-fastapi:python3.8

COPY ./kuroneko/location_db /app/app

RUN pip install SQLAlchemy

WORKDIR /app