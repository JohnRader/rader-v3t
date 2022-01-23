from fastapi import FastAPI
from app.api.api import api_router
from app.config import settings


app = FastAPI(title=settings.PROJECT_NAME)


@app.get("/")
async def root():
    return {"message": "Hello World"}


app.include_router(api_router)
