import {invokeCliniqueMailSearch} from "./clinique-du-mail/adapter";
import {SearchResponse} from "./response-types";

export class RdvDate {

    static printDate(d: RdvDate) {
        return d.date.toISOString().split("T")[0];
    }

    static compare(d1: RdvDate, d2: RdvDate) {
        return d1.date < d2.date ? -1 : 1;
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

    static uniqueDates(dates: RdvDate[]) {
        const uniqueDates = new Map(dates.map(d => [d.toString(), d])).values()
        return [...uniqueDates];
    }

    static sortedAndUniqueDates(dateStrings: string[]) {
        let dates = dateStrings.map(RdvDate.fromFrenchDate);
        let rdvDates = RdvDate.uniqueDates(dates);

        return rdvDates.sort(RdvDate.compare)
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


}

export function findDatesBefore(date: RdvDate, dates: RdvDate[]): RdvDate[] {
    return dates.filter(d => d < date)
}




export function extractAvailableDates(searchResponse: SearchResponse): RdvDate[] {
    let dateStrings: string[]= searchResponse.data.creneaux.flatMap(c => c.dates).map(dateElement => dateElement.date) as any as string[];
    return RdvDate.sortedAndUniqueDates(dateStrings);
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