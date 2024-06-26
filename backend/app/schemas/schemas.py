from typing import List
from datetime import date, datetime
from enum import Enum
import uuid
from fastapi import HTTPException
from typing import Any, Union
from ..util.util_waktu import *

from pydantic import BaseModel, EmailStr, Field

class RealDate(str):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v): 
        # print(v)
        # print(type(v))
        if type(v) == str:            
            # try:
            v = v[0:10]
        elif type(v) == date:
            v = convertDateToStrDate(v)                            
            # except:
            #     return "Not valid date"         

        if not isinstance(v, str):
            raise HTTPException(status_code=400, detail="Not a valid Date")
        # print(v)
        
        return v

class RealStr(str):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v): 
        # print(v)
        # print(type(v))
        if type(v) != str:            
            # try:
            v = str(v)
        elif type(v) == date:
            v = convertDateToStrDate(v)           

        if not isinstance(v, str):
            raise HTTPException(status_code=400, detail="Not a valid Date")
        # print(v)
        
        return v

def generate_uuid():
    return str(uuid.uuid4())

class RealInt(str):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v): 
        # print(v)
        # print(type(v))
        if type(v) == str:            
            # try:
            v = int(v)       
        
        if v == None:
            v = 0

        if not isinstance(v, str):
            raise HTTPException(status_code=400, detail=f"{v} Not a valid int")
        # print(v)
        
        return v
          

class Roles(Enum):
    bendahara = "bendahara"
    admin = "admin"
    biasa = "biasa"

    SUPERADMIN = "SUPERADMIN"
    MASTER_COMPANY = "MASTER_COMPANY"
    MASTER_BRANCH = "MASTER_BRANCH"

class CategoryAccountingTransaction(Enum):
    PEMBELIAN = "PEMBELIAN"
    PENJUALAN = "PENJUALAN"
    REQUEST_PRODUCT = "REQUEST_PRODUCT"
    KAS_MASUK = "KAS_MASUK"
    KAS_KELUAR = "KAS_KELUAR"
    JURNAL_UMUM = "JURNAL_UMUM"
    PEMBAYARAN_HUTANG = "PEMBAYARAN_HUTANG"
    PEMBAYARAN_PIUTANG = "PEMBAYARAN_PIUTANG"
    

class CategoryTransactionCode(Enum):
    PEMBELIAN = "PEMBELIAN"
    PENJUALAN = "PENJUALAN"
    KAS_MASUK = "KAS_MASUK"
    KAS_KELUAR = "KAS_KELUAR"
    JURNAL_UMUM = "JURNAL_UMUM"
    PURCHASE_REQUEST = "PURCHASE_REQUEST"
    PENERIMAAN_BARANG = "PENERIMAAN_BARANG"
    PENAWARAN = "PENAWARAN"
    PEMBAYARAN_HUTANG = "PEMBAYARAN_HUTANG"
    PEMBAYARAN_PIUTANG = "PEMBAYARAN_PIUTANG"

class PaymentStatus(Enum):
    PAID = "PAID"
    UNPAID = "UNPAID"    

class UserBase(BaseModel):
    nip: str = None
    nama: str = None
    no_telp: str = None
    jabatan: str = None
    email: EmailStr = None
    username: str = None
    level: int = None
    role: str = None
    company_id: str = None
    branch_id: str = None

class UserRegister(UserBase):
    password: str = None

class UserDB(UserBase):
    id: str
    role: Roles = None
    is_active: bool = False
    hashed_password: str
    
    class Config:
        orm_mode = True

class UserPlain(BaseModel):
    id: str = None
    username: str = None
    nama: str = None
    nip: str = None
    email: str = None
    no_telp: str = None
    jabatan: str = None
    role: Roles = None
    company_id: str = None
    branch_id: str = None
    level: int = None
    
    class Config:
        orm_mode = True


class Token(BaseModel):
    access_token: str
    token_type: str

class Page(BaseModel):
    page: int = 1
    size: int = 10
    totalElements: int = 0
    totalPages: int = 0
    lastSyncron: datetime = None

class ResponseModel(BaseModel):
    status: str = "200"
    message: str = None
    data: Any = None

    class Config:
        orm_mode = True

class DefaultUploadExcel(BaseModel):
    bank: str = None
    total: int = None
    valid: int = None
    validData: List[dict] = []
    inValid: int = None
    inValidData: List[dict] = []
    fileName: str = None


class RespSum(BaseModel):
    total: int = 0