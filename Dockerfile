FROM tiangolo/uvicorn-gunicorn-fastapi:python3.8

COPY ./kuroneko/location_db /app

RUN pip install SQLAlchemy

WORKDIR /