from pydantic import BaseModel


class UserBase(BaseModel):
    name: str
    email: str
    class Config:
	    orm_mode=True

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    is_active: bool
