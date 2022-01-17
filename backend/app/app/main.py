from fastapi import FastAPI
from app.api.stats import stats

app = FastAPI()

app.include_router(stats)
