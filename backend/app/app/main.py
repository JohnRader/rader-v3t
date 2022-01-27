from fastapi import FastAPI
from app.api.api import api_router
from app.core.config import settings
from app.init_data import init_data


def start_application():
    app = FastAPI(title=settings.PROJECT_NAME)
    app.include_router(api_router)
    init_data() 
    return app

app = start_application()
