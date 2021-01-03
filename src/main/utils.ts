import formatDistanceStrict from "date-fns/formatDistanceStrict";

// These constants are the number of milliseconds that the given time interval consists of.
export const ONE_MINUTE: number = 60 * 1000;
export const FIVE_MINUTES: number = 5 * ONE_MINUTE;
export const FIFTEEN_MINUTES: number = 15 * ONE_MINUTE;
export const ONE_HOUR: number = 60 * ONE_MINUTE;
export const ONE_DAY: number = 24 * ONE_HOUR;

// SEE: https://docs.microsoft.com/en-us/scripting/javascript/reference/json-parse-function-javascript
export const dateReviver = (key: string, value: any) => {
    if (typeof value === "string") {
        const a = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z?$/.exec(
            value
        );
        if (a) {
            return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4], +a[5], +a[6]));
        }
    }
    return value;
};

export const withDateStringsAsDates = (obj: any): any => {
    try {
        return JSON.parse(JSON.stringify(obj), dateReviver);
    } catch (err) {
        return obj;
    }
};

export const timeAgoInWords = (dateThen: Date, dateNow: Date = new Date()): string => {
    const now = dateNow.getTime();
    const then = dateThen.getTime();
    const timeDiff = now - then;
    if (timeDiff < ONE_MINUTE) {
        return "just now";
    }
    return formatDistanceStrict(dateThen, dateNow, {addSuffix: true});
};