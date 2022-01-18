from sqlalchemy.orm import Session

from app.models import models
from app.schemas import schemas


def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.UserCreate):
    # TODO: replace with real hashing
    fake_hash = user.password + "alazyhash"
    
    db_user = models.User(name=user.name, email=user.email, hashed_password=fake_hash)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user