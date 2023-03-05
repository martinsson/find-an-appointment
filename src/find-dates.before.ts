import {invokeCliniqueMailSearch} from "./clinique-du-mail/adapter";
import {SearchResponse} from "./response-types";
import {RdvDate} from "./rdv.date";

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