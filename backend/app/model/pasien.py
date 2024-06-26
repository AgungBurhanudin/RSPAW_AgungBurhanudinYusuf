from sqlalchemy import Boolean, Column, Enum, Integer, String, DateTime
from datetime import datetime
from sqlalchemy.orm import relationship

from ..config.database import Base
from ..schemas.schemas import Roles, generate_uuid


class PasienModel(Base):
    __tablename__ = "ref_pasien"

    id = Column(String, primary_key=True, index=True, nullable=False, default=generate_uuid)    
    name = Column(String, nullable=False)
    nik = Column(String, nullable=True)
    kota = Column(String, nullable=True)
    address = Column(String, nullable=True)
    status = Column(String, nullable=True)
    bpjs = Column(String, nullable=True)    
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now) 
