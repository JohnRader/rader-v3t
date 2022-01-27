import logging
from sqlalchemy.orm import Session

from app.crud.user_crud import user
from app.schemas import user_schema
from app.core.config import settings
from app.db.database import engine
from app.db.base_class import Base


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def init_db(db: Session) -> None:
    Base.metadata.create_all(bind=engine)

    # Create superuser in db if not already initialized
    super_user = user.get_user_by_email(db, email=settings.FIRST_SUPERUSER)
    if not super_user:
        logger.info("Creating superuser")
        user_in = user_schema.UserCreate(
            name="Admin",
            email=settings.FIRST_SUPERUSER,
            password=settings.FIRST_SUPERUSER_PASSWORD,
            is_superuser=True,
        )
        super_user = user.create_user(db=db, user=user_in)
