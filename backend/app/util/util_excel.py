from itertools import count
import typing
from fastapi.exceptions import HTTPException
import pytz
from datetime import datetime
from ..util.util_waktu import (
    convertStrDateToDate,
    convertStrTimeToTime,
    dateNow,
    dateNowStr,
    dateTimeNow,
    dateTimeNowStr,
)
import math


def getString(row):
    if type(row) == float:
        x = float(row)
        if math.isnan(x) == True:
            row = ""
    if row:
        string = str(row)
        return string
    else:
        return None


def getNumber(row):
    if type(row) == float:
        x = float(row)
        if math.isnan(x) == True:
            row = ""
    if row:
        string = str(row)
        number = float(string)
        return number
    else:
        return None


def getDate(row):
    if type(row) == float:
        x = float(row)
        if math.isnan(x) == True:
            row = None
    if row:
        row = row.replace("'", "")
        row = row.replace('"', "")
        row = row.replace(" ", "-")
        date = ""
        # print(type(row))
        if type(row) == str:
            string = str(row)
            if "/" in string:
                print("date pake /")
                string_arr = string.split("/")
                bulan = string_arr[1]
                if string_arr[2]:
                    if int(string_arr[2]) > 31:
                        year = string_arr[2]
                        tanggal = string_arr[0]
                    else:
                        year = string_arr[0]
                        tanggal = string_arr[2]
                    date = str(year) + "-" + str(bulan) + "-" + str(tanggal)
                else:
                    date = ""
            elif "-" in string:
                string_arr = string.split("-")
                bulan = string_arr[1]
                if string_arr[2]:
                    if int(string_arr[2]) > 31:
                        year = string_arr[2]
                        tanggal = string_arr[0]
                    else:
                        year = string_arr[0]
                        tanggal = string_arr[2]
                    date = str(year) + "-" + str(bulan) + "-" + str(tanggal)
                else:
                    date = ""
            if date:
                return convertStrDateToDate(date)
            else:
                return dateNow()
        elif type(row) == datetime:
            return row
    else:
        return None


def getJenisKelamin(row):
    if type(row) == float:
        x = float(row)
        if math.isnan(x) == True:
            return None
    if row:
        string = str(row)
        if row:
            if string[0].upper() == "L":
                return "MALE"
            elif string[0].upper() == "P":
                return "FEMALE"
            elif string[0].upper() == "M":
                return "MALE"
            elif string[0].upper() == "F":
                return "FEMALE"
        else:
            return "MALE"
    else:
        return None