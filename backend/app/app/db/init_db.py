from sqlalchemy.orm import Session

from app import crud, schemas
from app.config import settings
from app.db.database import engine
from app.db.base import Base

def init_db(db: Session) -> None:
    Base.metadata.create_all(bind=engine)

    user = crud.get_user_by_email(db, email=settings.FIRST_SUPERUSER)
    if not user:
        user_in = schemas.UserCreate(
            name="Admin",
            email=settings.FIRST_SUPERUSER,
            password=settings.FIRST_SUPERUSER_PASSWORD,
            is_superuser=True,
        )
        user = crud.create_user(db=db, user=user_in)
