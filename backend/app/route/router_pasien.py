from venv import create
from app.model.pasien import PasienModel
from app.util.util_waktu import dateYYYYMMDD
from ..schemas import schemas
from ..schemas.schemas import UserPlain, UserRegister
from ..schemas.pasien import PasienBase, PasienCreateBase
from ..database import db_pasien

from dotenv import find_dotenv, load_dotenv
load_dotenv(find_dotenv())

from fastapi import Security,APIRouter, Depends, HTTPException, status

from sqlalchemy.orm import Session
from typing import Optional


# from .. import auth, crud, models, sendmail
from ..util import auth
from ..config.database import get_db


from fastapi_pagination import Page, paginate
from fastapi_pagination.ext.sqlalchemy import paginate

router_pasien = APIRouter()


@router_pasien.get("", response_model=Page[Optional[PasienBase]])
def get_all_pasiens( db: Session = Depends(get_db)):
    stmt = db.query(PasienModel).order_by(PasienModel.name)
    return paginate(stmt)

@router_pasien.post("")
def add_pasien(pasien: PasienCreateBase, db: Session = Depends(get_db)):    
    
    create_pasien = db_pasien.create_pasien(db=db, data=pasien)
    db.commit()

    return schemas.ResponseModel(message="Berhasil menambah data pasien", data=PasienBase.from_orm(create_pasien))
    # except Exception as er:
    #     print(er)
    #     db.rollback()
    # finally:
    #     db.commit()

@router_pasien.put("/{id}", response_model=schemas.ResponseModel)
def update_pasien_(id: str, data: PasienCreateBase, db: Session = Depends(get_db)):
    potensi_pelayanan = db_pasien.update_pasien(db=db, data=data, id=id)
    # print(potensi_pelayanan)

    return schemas.ResponseModel(message="Berhasil Memperbarui data pasien", data = data)

@router_pasien.delete("/{id}", response_model=schemas.ResponseModel)
def delete_pasien_(id: str, db: Session = Depends(get_db)):
    potensi_pelayanan = db_pasien.delete_pasien(db=db, id=id)
    # print(potensi_pelayanan)

    return schemas.ResponseModel(message="Berhasil menghapus data pasien")
    
@router_pasien.get("/{pasien_id}", response_model=schemas.ResponseModel)
def get_pasien_by_id(pasien_id: str, db: Session = Depends(get_db)):
    data_pasien = db_pasien.get_pasien(db, id=pasien_id)
    if data_pasien is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return schemas.ResponseModel(data=data_pasien)

