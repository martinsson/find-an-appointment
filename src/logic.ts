import {RdvDate} from "./rdv.date";

export function printDates(dates: RdvDate[]): string {
    return dates.map(RdvDate.printDate).join("\n");

}

