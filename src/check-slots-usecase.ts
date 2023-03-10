import {extractAvailableDates, invokeCliniqueMailSearch} from "./clinique-du-mail/adapter";
import {findDatesBefore, printDates, RdvDate} from "./dates/rdv.date";
import {Logger} from "./logger";
import {Notifier} from "./notification/notifier";
import fs from "fs";


class DatesAvailable {
    constructor(public text: string, public datesString: string) {

    }

}

class NoDatesAvailable {
    constructor(public message: string, public availableDates: RdvDate[]) {

    }

}

function checkSlotsUseCaseLogic(beforeDate: RdvDate, availableDates: RdvDate[]) {
    let datesBefore = findDatesBefore(beforeDate, availableDates);
    if (datesBefore.length > 0) {
        let datesString = printDates(datesBefore);
        let text = `dates disponibles: \n${datesString}`;
        return new DatesAvailable(text, datesString)
    } else {
        if (availableDates.length === 0) {
            return new NoDatesAvailable("no dates available at all", availableDates)
        } else {
            return new NoDatesAvailable("no dates available, first date is " + availableDates[0], availableDates)
        }
    }
}

export async function checkSlotsUseCase(examenCode: string, beforeDate: RdvDate, notifier: Notifier) {
    const logger = new Logger()
    const searchResponse = await invokeCliniqueMailSearch(examenCode)
    const availableDates = extractAvailableDates(searchResponse.data)
    let result = checkSlotsUseCaseLogic(beforeDate, availableDates);
    if (result instanceof DatesAvailable) {
        logger.log(result.text, "notifying...")
        await notifier.notify({body: result.text})
    } else {
        logger.log(result.message)
    }
}

export function loadCreds() {
    return JSON.parse(fs.readFileSync(__dirname + "/../.env.json").toString('utf-8'));
}