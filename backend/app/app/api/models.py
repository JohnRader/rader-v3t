from pydantic import BaseModel

class Player(BaseModel):
    name: str
    position: str
    team: str
