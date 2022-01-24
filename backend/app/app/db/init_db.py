import logging
from sqlalchemy.orm import Session

from app.crud import crud
from app.schemas import schemas
from app.config import settings
from app.db.database import engine
from app.db.base_class import Base


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def init_db(db: Session) -> None:
    Base.metadata.create_all(bind=engine)

    # Create superuser in db if not already initialized
    user = crud.get_user_by_email(db, email=settings.FIRST_SUPERUSER)
    if not user:
        logger.info("Creating superuser")
        user_in = schemas.UserCreate(
            name="Admin",
            email=settings.FIRST_SUPERUSER,
            password=settings.FIRST_SUPERUSER_PASSWORD,
            is_superuser=True,
        )
        user = crud.create_user(db=db, user=user_in)
