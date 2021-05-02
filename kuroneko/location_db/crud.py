from sqlalchemy.orm import Session

from . import models, schemas




def get_locations(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Location).offset(skip).limit(limit).all()

def create_location(db: Session, location: schemas.LocationCreate):
    db_location = models.Location(camp_id=location.camp_id, latitude=location.latitude, longitude=location.longitude)
    db.add(db_location)
    db.commit()
    db.refresh(db_location)
    return db_location