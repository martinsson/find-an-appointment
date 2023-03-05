import {invokeCliniqueMailSearch} from "./clinique-du-mail/adapter";
import {SearchResponse} from "./response-types";

export class RdvDate {

    static printDate(d: RdvDate) {
        return d.date.toISOString().split("T")[0];
    }

    static compare(d1: RdvDate, d2: RdvDate) {
        return d1.date < d2.date ? -1 : 1;
    }

    constructor(private date: Date) {
        if (!date) {
            throw new Error("date cannot be undefined, was " + date)
        }
        this.date = date;
    }

    public toString() {
        return RdvDate.printDate(this)
    }

    static fromFrenchDate(dateString: string): RdvDate {
        let milliseconds = Date.parse(dateString);
        let timezoneOffset = - new Date(dateString).getTimezoneOffset();
        let milliSecondsOffset = 1000*60 * timezoneOffset;
        return new RdvDate(new Date(milliseconds + milliSecondsOffset))
    }
    static fromFrenchDate_(dateString: Date): RdvDate {
        let milliseconds = dateString.getTime()
        let timezoneOffset = new Date(dateString).getTimezoneOffset();
        let milliSecondsOffset = 1000*60 * timezoneOffset;
        return new RdvDate(new Date(milliseconds + milliSecondsOffset))
    }
}

export function findDatesBefore(date: RdvDate, dates: RdvDate[]): RdvDate[] {
    return dates.filter(d => d < date)
}


export function extractAvailableDates(searchResponse: SearchResponse): RdvDate[] {
    let dateStrings: string[]= searchResponse.data.creneaux.flatMap(c => c.dates).map(dateElement => dateElement.date) as any as string[];
    console.log(dateStrings)
    console.log(typeof dateStrings[0])
    let dates = dateStrings.map(RdvDate.fromFrenchDate);
    let sort = dates.sort(RdvDate.compare); //?
    return [...new Set(sort)]
}

export async function getAvailableDates(codeExamen: string) {
    const result = await invokeCliniqueMailSearch(codeExamen);
    let dateStrings = result.data.data.creneaux.flatMap(c => c.dates).map(dateElement => dateElement.date);
    let datesWithAvailabilities = dateStrings.map(ds => new Date(ds));
    return datesWithAvailabilities;
}

export function nextDay(now: Date) {
    return new Date(now.getTime() + (1000 * 3600 * 24));
}