import pytz
from datetime import datetime

TIMEZONE = pytz.timezone('Asia/Jakarta')

def dateNow():
    timenow = datetime.now(tz = TIMEZONE)
    waktuSekarangStr = timenow.strftime("%Y-%m-%d")
    waktuSekarang = datetime.strptime(waktuSekarangStr, "%Y-%m-%d")
    return waktuSekarang

def dateTimeNow():
    timenow = datetime.now(tz = TIMEZONE)
    waktuSekarangStr = timenow.strftime("%Y-%m-%d %H:%M:%S")
    waktuSekarang = datetime.strptime(waktuSekarangStr, "%Y-%m-%d %H:%M:%S")
    # fmt = '%Y-%m-%d %H:%M:%S'
    return waktuSekarang #timenow.strftime(fmt)

def timeNow():
    timenow = datetime.now(tz = TIMEZONE)
    waktuSekarangStr = timenow.strftime("%H:%M:%S")
    waktuSekarang = datetime.strptime(waktuSekarangStr, '%H:%M:%S').time()
    return waktuSekarang

def dateTimeNowStr():
    timenow = datetime.now(tz = TIMEZONE)
    waktuSekarangStr = timenow.strftime("%Y-%m-%d %H:%M:%S")
    return waktuSekarangStr

def dateDDMMYY():
    timenow = datetime.now(tz = TIMEZONE)
    waktuSekarangStr = timenow.strftime("%d%m%y")
    return waktuSekarangStr

def dateYYMMDD():
    timenow = datetime.now(tz = TIMEZONE)
    waktuSekarangStr = timenow.strftime("%y%m%d")
    return waktuSekarangStr

def dateYYYYMMDD():
    timenow = datetime.now(tz = TIMEZONE)
    waktuSekarangStr = timenow.strftime("%Y%m%d")
    return waktuSekarangStr

def dateTime():
    timenow = datetime.now(tz = TIMEZONE)
    waktuSekarangStr = timenow.strftime("%y%m%d%H%M%S")
    return waktuSekarangStr

def dateYYMM():
    timenow = datetime.now(tz = TIMEZONE)
    waktuSekarangStr = timenow.strftime("%y%m")
    return waktuSekarangStr

def dateDDMM():
    timenow = datetime.now(tz = TIMEZONE)
    waktuSekarangStr = timenow.strftime("%d%m")
    return waktuSekarangStr

def dateHHiiSS():
    timenow = datetime.now(tz = TIMEZONE)
    waktuSekarangStr = timenow.strftime("%H%M%S")
    return waktuSekarangStr

def dateNowStr():
    timenow = datetime.now(tz = TIMEZONE)
    waktuSekarangStr = timenow.strftime("%Y-%m-%d")
    return waktuSekarangStr

def timeNowStr():
    timenow = datetime.now(tz = TIMEZONE)
    waktuSekarangStr = timenow.strftime("%H:%M:%S")
    return waktuSekarangStr

def convertStrDateToDate(strDate : str): 
    if strDate:       
        if type(strDate) == datetime:   
            return strDate
        elif type(strDate) == datetime.date:   
            return strDate
        else:
            date = datetime.strptime(str(strDate), '%Y-%m-%d')
            return date
    else:
        return None

def convertStrDateTimeToDate(strDate : str): 
    if strDate:       
        if type(strDate) == datetime:   
            return strDate
        elif type(strDate) == datetime.date:   
            return strDate
        else:
            date = datetime.strptime(str(strDate[0:10]), '%Y-%m-%d')
            return date
    else:
        return None

def convertStrDateTimeToDateTime(strDate : str):        
    if strDate:       
        if type(strDate) == datetime:   
            return strDate
        elif type(strDate) == datetime.date:   
            return strDate
        else:
            if len(str(strDate)) == 10:
                date = datetime.strptime(str(strDate) + " 00:00:00", '%Y-%m-%d %H:%M:%S')
            else:    
                try:
                    date = datetime.strptime(str(strDate), '%Y-%m-%d %H:%M:%S')
                except:
                    date = datetime.strptime(str(strDate), '%d/%m/%Y %H:%M:%S')
            return date
    else:
        return None
    
def convertStrIsoDateToDateTime(strDate : str):        
    if strDate:       
        if type(strDate) == datetime:   
            return strDate
        elif type(strDate) == datetime.date:   
            return strDate
        else:
            if len(str(strDate)) == 10:
                date = datetime.strptime(str(strDate) + " 00:00:00", "%Y-%m-%dT%H:%M:%S%Z")
            else:    
                date = datetime.strptime(str(strDate), "%Y-%m-%dT%H:%M:%S.000Z")
            print(date)
            return date
    else:
        return None

def convertStrTimeToTime(strTime : str):
    time = datetime.strptime(strTime, '%H:%M').time()
    return time

def DateTimeToDateTimeIndo(dateTime : datetime): 
    fmt = '%Y-%m-%d %H:%M:%S'
    loc_dt = TIMEZONE.localize(dateTime)
    return loc_dt.strftime(fmt)

def convertDateToStrDate(date):  
    if date:  
        if type(date) == str:   
            return date
        elif type(date) == int:   
            print(date)
            return None
        else:
            date = datetime.strftime(date, '%Y-%m-%d')
            return date
    else:
        return None


def convertDateToStrMonthDate(date):  
    if date:  
        if type(date) == str:   
            return date
        elif type(date) == int:   
            print(date)
            return None
        else:
            date = datetime.strftime(date, '%m')
            return date
    else:
        return None

def convertDateTimeToStrDateTime(date):  
    if date:  
        if type(date) == str:   
            return date
        else:            
            date = datetime.strftime(date, '%Y-%m-%d %H:%M:%S')
            return date
    else:
        return None

def convertDateTimeToStrDDMMYYY(date):  
    if date:  
        if type(date) == str:   
            return date
        else:
            date = datetime.strftime(date, '%d/%m/%Y %H:%M:%S')
            return date
    else:
        return None

def dateHHIISS():
    timenow = datetime.now(tz = TIMEZONE)
    waktuSekarangStr = timenow.strftime("%H%M%S")
    return waktuSekarangStr

def convertSlashDatetimeToDate(input: str):
    if input:
        inputArr = input.split(" ")
        inputDate = inputArr[0]
        inputDateArr = inputDate.split("/")
        strDate = str(inputDateArr[2]) + "-" + str(inputDateArr[1]) + "-" + str(inputDateArr[0])
        realDate = convertStrDateToDate(strDate)
        return strDate
    else:
        return None
    
def convertSlashDatetimetoDatetime(input:str):
    if input:
        inputArr = input.split(" ")
        inputDate = inputArr[0]
        inputDateArr = inputDate.split("/")
        strDate = str(inputDateArr[2]) + "-" + str(inputDateArr[1]) + "-" + str(inputDateArr[0])

        inputTime = inputArr[1]
        strDatetime = strDate+' '+inputTime
        datetime = convertStrDateTimeToDateTime(strDatetime)
        return datetime
    else:
        return None

def get_day_of_week(input:datetime):
    hari = {
        0 : "Senin",
        1 : "Selasa",
        2 : "Rabu",
        3 : "Kamis",
        4 : "Jumat",
        5 : "Sabtu",
        6 : "Minggu"
    }
    try:
        d = input.weekday()
        return hari[d]
    except:
        return "Hari"

from devtools import debug
def get_month(date):  
    # debug(date)
    # debug(date[5:7])
    if date:  
        if type(date) == str:   
            return int(date[5:7])
        elif type(date) == int:   
            print(date)
            return date
        else:
            date = datetime.strftime(date, '%Y-%m-%d')
            return int(date[5:7])
    else:
        return None



def dateYY():
    timenow = datetime.now(tz = TIMEZONE)
    waktuSekarangStr = timenow.strftime("%y")
    return waktuSekarangStr

def dateMM():
    timenow = datetime.now(tz = TIMEZONE)
    waktuSekarangStr = timenow.strftime("%m")
    return waktuSekarangStr


def dateDD():
    timenow = datetime.now(tz = TIMEZONE)
    waktuSekarangStr = timenow.strftime("%d")
    return waktuSekarangStr