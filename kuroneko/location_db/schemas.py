from typing import List, Optional

from pydantic import BaseModel




class LocationCreate(BaseModel):
    camp_id: int
    latitude: float
    longitude: float

class Location(LocationCreate):
    id: int
    
    class Config:
        orm_mode = True
