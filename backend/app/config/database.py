# from sqlalchemy import Boolean, Column, Enum, Integer, String, DateTime, ForeignKey, Float
# from datetime import datetime
# from sqlalchemy.orm import relationship
# from app.schemas.schemas import Roles, generate_uuid

from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import os


SQLALCHEMY_DATABASE_URL = os.environ.get("SQLALCHEMY_DATABASE_URL")

engine = create_engine("postgresql://postgres:admin@localhost:5432/rspaw", pool_pre_ping=True)

def get_db():
    with DBContext() as db:
        try:
            yield db
        except:
            db.rollback()
            raise
        else:
            db.commit()

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()
metadata = Base.metadata

class DBContext:
    def __init__(self):
        self.db = SessionLocal()

    def __enter__(self):
        return self.db

    def __exit__(self, et, ev, traceback):
        self.db.close()
