import re

from app.util.util_waktu import convertStrDateToDate

def isiDefault(dataAsal, dataSumber, isBalance : bool = False):
  dataAsal.company_id = dataSumber.company_id
  dataAsal.branch_id = dataSumber.branch_id
  if isBalance == True:
    dataAsal.coa_id = dataSumber.coa_id
    dataAsal.user_id = dataSumber.user_id
  
  return dataAsal


def row2dict(row):
    d = {}
    for column in row.__table__.columns:
        d[column.name] = str(getattr(row, column.name))

    return d


def computed_operator(column, v):
  if re.match(r"^!", v):
    """__ne__"""
    val = re.sub(r"!", "", v)
    return column.__ne__(val)
  if re.match(r">(?!=)", v):
    """__gt__"""
    val = re.sub(r">(?!=)", "", v)
    return column.__gt__(val)
  if re.match(r"<(?!=)", v):
    """__lt__"""
    val = re.sub(r"<(?!=)", "", v)
    return column.__lt__(val)
  if re.match(r">=", v):
    """__ge__"""
    val = re.sub(r">=", "", v)
    return column.__ge__(val)
  if re.match(r"<=", v):
    """__le__"""
    val = re.sub(r"<=", "", v)
    return column.__le__(val)
  if re.match(r"\w*,\w*", v):
    """between"""
    a, b = re.split(r",", v)
    return column.between(a, b)

  if "," in v:
    """between"""
    a, b = re.split(r",", v)  
    return column.between(convertStrDateToDate(a), convertStrDateToDate(b))
  """ default __eq__ """
  return column.__eq__(v)


def computed_operator_(v):
  if re.match(r"^!", v):
    """__ne__"""
    val = re.sub(r"!", "", v)
    return "ne"
  if re.match(r">(?!=)", v):
    """__gt__"""
    val = re.sub(r">(?!=)", "", v)
    return "gt"
  if re.match(r"<(?!=)", v):
    """__lt__"""
    val = re.sub(r"<(?!=)", "", v)
    return "lt"
  if re.match(r">=", v):
    """__ge__"""
    val = re.sub(r">=", "", v)
    return "ge"
  if re.match(r"<=", v):
    """__le__"""
    val = re.sub(r"<=", "", v)
    return "le"
  if re.match(r"(\w*),(\w*)", v):
    """between"""
    a, b = re.split(r",", v)
    return "between"
  """ default __eq__ """
  return "=="