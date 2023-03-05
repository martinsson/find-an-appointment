import {RdvDate} from "./find-dates.before";

export function printDates(dates: RdvDate[]): string {
    return dates.map(RdvDate.printDate).join("\n");

}

