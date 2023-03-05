export class RdvDate {

    static printDate(d: RdvDate) {
        return d.date.toISOString().split("T")[0];
    }

    static compare(d1: RdvDate, d2: RdvDate) {
        return d1.date < d2.date ? -1 : 1;
    }

    static fromFrenchDate(dateString: string): RdvDate {
        let milliseconds = Date.parse(dateString);
        let timezoneOffset = -new Date(dateString).getTimezoneOffset();
        let milliSecondsOffset = 1000 * (60*2) * timezoneOffset; // winter time
        return new RdvDate(new Date(milliseconds + milliSecondsOffset))
    }

    static fromFrenchDate_(dateString: Date): RdvDate {
        let milliseconds = dateString.getTime()
        let timezoneOffset = new Date(dateString).getTimezoneOffset();
        let milliSecondsOffset = 1000 * 60 * timezoneOffset;
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

export function printDates(dates: RdvDate[]): string {
    return dates.map(RdvDate.printDate).join("\n");

}