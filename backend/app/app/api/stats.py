from fastapi import APIRouter
from typing import List
from http.client import HTTPException

from app.api.models import Player

fake_db = [
    {
        'name': 'Name',
        'position': 'Position',
        'team': 'Team,'
    }
]

stats = APIRouter()

@stats.get('/', response_model=List[Player])
async def root():
    return fake_db

@stats.post('/', status_code=201)
async def create_player(payload: Player):
    player = payload.dict()
    fake_db.append(player)
    return { 'id': len(fake_db) - 1 }

@stats.put('/{id}')
async def update_player(id: int, payload: Player):
    player = payload.dict()
    db_length = len(fake_db)
    if 0 <= id <= db_length:
        fake_db[id] = player
        return None
    raise HTTPException(status_code=404, detail='Player with given id not found')

@stats.delete('/{id}')
async def delete_player(id: int):
    db_length = len(fake_db)
    if 0 <= id <= db_length:
        del fake_db[id]
        return None
    raise HTTPException(status_code=404, detail='Player with given id not found')