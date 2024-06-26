import email
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing_extensions import Annotated

from ..schemas.pasien import PasienBase, PasienCreateBase
from ..util.auth import *

from ..schemas.schemas import *
from ..model.pasien import *
import uuid
from typing import Optional

def get_pasien(db: Session, id: str):
    return db.query(PasienModel).filter(PasienModel.id == id).first()

def get_pasien_by_initial(db: Session, initial: str):
    pasien = db.query(PasienModel).filter(PasienModel.initial == initial).first()
    return pasien


def get_pasien_by_id(db: Session, id: str):
    pasien = db.query(PasienModel).filter(PasienModel.id == id).first()
    return pasien


def get_pasien_by_email(db: Session, email: str):
    pasien = db.query(PasienModel).filter(PasienModel.email == email).first()
    return pasien

def create_pasien(db: Session, data: PasienCreateBase):
    
    db_pasien = PasienModel(                
        name = data.name,
        nik = data.nik,
        kota = data.kota,
        address = data.address,
        status = data.status,
        bpjs = data.bpjs
    )
    db.add(db_pasien)
    db.flush()    

    return db_pasien

def update_pasien(db: Session, data: PasienCreateBase, id: str):    
    db_update = db.query(PasienModel).filter(PasienModel.id == id)
    if db_update.first() :
        dataUodate = PasienBase(**data.dict())
        dataUodate.id = id                
        db_update.update(dataUodate.dict())
        db.flush()
                
    return data

def delete_pasien(db: Session, id: str):    
    db_update = db.query(PasienModel).filter(PasienModel.id == id)
    db_update.delete()
    db.flush()
                
    return True


def get_pasiens(db: Session, skip: int = 0, limit: int = 100):
    pasiens = db.query(PasienModel).offset(skip).limit(limit).all()
    return pasiens

def get_count_pasien(db: Session):
    pasiens = db.query(PasienModel).all()
    return len(pasiens)


def get_max_pasien_code(db: Session):
    pasien = db.query((func.max(PasienModel.pasienCode)).label('code')).first()
    
    if pasien.code:
        code = int(pasien.code) + 1
    else:
        code = 1
    return f'{code:04}'