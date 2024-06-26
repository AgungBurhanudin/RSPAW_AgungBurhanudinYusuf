from typing import List
from datetime import date, datetime
from enum import Enum
import uuid
from fastapi import HTTPException
from typing import Any, Union
from ..util.util_waktu import *

from pydantic import BaseModel, EmailStr, Field


class PasienBase(BaseModel):
    id : str = None
    name : str = None
    nik : str = None
    kota : str = None
    address : str = None
    status: str = None
    bpjs: str = None
    created_at : datetime = None
    updated_at : datetime = None

    class Config:
        orm_mode = True

class PasienCreateBase(BaseModel):  
    name : str = None
    nik : str = None
    kota : str = None
    address : str = None
    status: str = None
    bpjs: str = None

    class Config:
        orm_mode = True