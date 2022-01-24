from app.db.init_db import init_db
from app.db.database import SessionLocal


def init_data() -> None:
    db = SessionLocal()
    init_db(db)
