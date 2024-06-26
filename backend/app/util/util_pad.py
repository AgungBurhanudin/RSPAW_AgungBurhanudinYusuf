import hmac
import json
from typing import Any
import urllib.parse
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from typing_extensions import Annotated
from pprint import pprint

from fastapi import HTTPException
import requests
from app.config.database import get_db
from app.database.db_setting import getSettingValue
from app.database.db_syncapi import get_syncapi_by_id
from app.util.util_waktu import convertDateToStrDate




def get_token_pad(db, api_host, api_username, api_password):
    api_url = f"{api_host}login"

    # headers
    # headers = {'Content-Type': 'application/json'}

    # request body
    data = {
        "username": api_username,
        "password": api_password,
        "aplikasi" : "pad",
        "tahun" : 2023        
    }

    headers = {
        "Content-Type" : "application/json"
    }

    # request
    # print(headers)
    response = requests.request("GET", api_url, headers=headers, data=data, timeout=10, verify=False)

    # response
    if response.status_code == 200:
        pprint("status_code: " + str(response.status_code))
        response = response.json()
        try:
            if response.get("token"):
                return response.get("token")
            else:
                raise HTTPException(status_code=500, detail=response)
        except Exception as e:
            raise HTTPException(status_code=500, detail=response)

    else:
        pprint("status_code: " + str(response.status_code))
        raise HTTPException(status_code=500, detail="gagal get token " + response.content.decode())


def req_data_rincian_harian_pendapatan(db: Session, id: str, param: Any, page: int = 1):    
    api_host = getSettingValue(db, "sync_base_url")
    print(api_host)

    api_username = getSettingValue(db, "sync_username")
    api_password = getSettingValue(db, "sync_password")

    syncapi = get_syncapi_by_id(db, id)
    if not syncapi:
        raise HTTPException(status_code=404, detail="Endpoint Not Found")

    if not syncapi.sinkronisasi_api:
        raise HTTPException(status_code=400, detail="API belum di setting")

    api_url = f"{api_host}{syncapi.sinkronisasi_api}"
    token = get_token(db, api_host, api_username, api_password)
    # print(token)
    payload = {}
    if param:
        for item in param.param:
            if item:
                value = item.get('value')
                if value:
                    if item.get('type') == "date":
                        value = convertDateToStrDate(value)
                    payload[item.get('field')] = value
                    api_url = api_url.replace(f"[{item.get('field')}]", value)
    all_data = []
    page = 1
    while True:
        payload['page'] = param.param[0]['page']
        payload['page'] = page

        headers = {'Content-Type': 'application/json', 'x-authorization-token-simpra': f'{token}'}

        try:
            response = requests.request("POST", api_url, headers=headers, data=json.dumps(payload), verify=False)
        except HTTPException as e:
            raise e

        if response.status_code == 200:
            pprint("status_code: " + str(response.status_code))

            response_json = response.json()

            if response_json["metadata"]["code"] == 200:
                current_page_value = response_json["response"]["current_page"] 
                last_page_value = response_json["response"]["last_page"]
                per_page_value = response_json["response"]["per_page"]
                total_value = response_json["response"]["total"]
                last_page_value = (total_value // per_page_value) + 1 if total_value % per_page_value != 0 else total_value // per_page_value
            else:
                raise HTTPException(status_code=500, detail=response_json)
        else:
            pprint("status_code: " + str(response.status_code))
            raise HTTPException(status_code=500, detail="gagal mendapatkan data " + response.content.decode())

        all_data.extend(response_json["response"]["data"])

        if page >= last_page_value:
            break
        page += 1

    result = all_data
    return result
    
def req_data(db: Session, id: str, param: Any):
    api_host = getSettingValue(db, "sync_base_url")
    print(api_host)

    api_username = getSettingValue(db, "sync_username")
    api_password = getSettingValue(db, "sync_password")

    syncapi = get_syncapi_by_id(db, id)
    if not syncapi:
        raise HTTPException(status_code=404, detail="Endpoint Not Found")

    if not syncapi.sinkronisasi_api:
        raise HTTPException(status_code=400, detail="API belum di setting")

    api_url = f"{api_host}{syncapi.sinkronisasi_api}"
    token = get_token(db, api_host, api_username, api_password)
    print(token)
    payload = {}
    if param:
        for item in param.param:
            print(item)
            if item:
                value = item.get('value')
                if value:
                    if item.get('type') == "date":
                        value = convertDateToStrDate(value)
                    payload[item.get('field')] = value
                    # api_url = api_url.replace(f"[{item.get('field')}]", value)

    print(api_url)
    # payload['page'] = param.param[0]['page']
    print("Payload = ",payload)
    # headers
    headers = {'Content-Type': 'application/json', 'x-authorization-token-simpra' : f'{token}'}

    response = requests.request("POST", api_url, headers=headers, data=json.dumps(payload), verify=False)

    # response
    if response.status_code == 200:
        pprint("status_code: " + str(response.status_code))

        response_json = response.json()

        if response_json["metadata"]["code"] == 200:
            result = response_json["response"]
            return result
        else:
            raise HTTPException(status_code=500, detail=response_json)
    else:
        pprint("status_code: " + str(response.status_code))
        raise HTTPException(status_code=500, detail="gagal mendapatkan data " + response.content.decode())



async def log_create(host, req, res):
    kemarin = datetime.now() - timedelta(days=3, hours=0, minutes=0, seconds=0)
    kemarin = datetime.strftime(kemarin, '%Y-%m-%d 23:59:59')
    # tbl_bjbs_log_create.delete_many({'waktu': {'$lte': datetime.fromisoformat(kemarin)}})
    simpan = {'waktu': datetime.now(), 'data_from_tki': req, 'url_bank': str(host.client), 'response_bank': res}
    ins = await tbl_bjbs_log_create.insert_one(simpan)