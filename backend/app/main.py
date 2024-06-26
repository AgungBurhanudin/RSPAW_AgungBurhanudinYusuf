from dotenv import find_dotenv, load_dotenv
load_dotenv(find_dotenv())

from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine

from fastapi import Depends, FastAPI, HTTPException, status, Response, Query
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

import logging
import yaml

from .logging import config_str

from .route.router_pasien import router_pasien

from fastapi_pagination import Page, add_pagination, paginate

app = FastAPI()
companyApi = FastAPI()
branchApi = FastAPI()

# Logging
logging_config = yaml.safe_load(config_str)
logging.config.dictConfig(logging_config)

# CORS
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/', response_class=RedirectResponse, include_in_schema=False)
def docs():
    return RedirectResponse(url='/docs')

#SUPERADMIN
app.include_router(router_pasien, prefix="/rspaw/pasien",
                   tags=["PASIEN"], responses={404: {"description": "Not found"}})

add_pagination(app)  # important! add pagination to your app

                   