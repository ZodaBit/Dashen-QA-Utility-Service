export function convertExtendedJSON(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(convertExtendedJSON);
  }

  if (obj && typeof obj === "object") {
    if (obj.$date) {
      if (typeof obj.$date === "string") return new Date(obj.$date);
      if (obj.$date.$numberLong) return new Date(Number(obj.$date.$numberLong));
    }

    if (obj.$numberLong) return Number(obj.$numberLong);
    if (obj.$numberInt) return Number(obj.$numberInt);
    if (obj.$oid) return obj.$oid.toString();
    if (obj.$binary) return Buffer.from(obj.$binary.base64, "base64");

    const newObj: any = {};
    for (const key in obj) {
      newObj[key] = convertExtendedJSON(obj[key]);
    }
    return newObj;
  }

  return obj;
}

export function cleanEnumFields(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(cleanEnumFields);
  }

  if (obj && typeof obj === "object") {
    for (const key in obj) {
      const val = obj[key];

      if (val === "") {
        obj[key] = null;
        continue;
      }

      if (typeof val === "object") {
        cleanEnumFields(val);
      }
    }
  }
  return obj;
}
