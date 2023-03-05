import axios from "axios";
import {extractAvailableDates, findDatesBefore, getAvailableDates, RdvDate} from "./find-dates.before";
import {invokeCliniqueMailSearch} from "./clinique-du-mail/adapter";
import {printDates} from "./logic";


export async function checkSlotsUseCase(examenCode: string, beforeDate: RdvDate) {
    const searchResponse = await invokeCliniqueMailSearch(examenCode)
    const availableDates = extractAvailableDates(searchResponse.data)
    let datesBefore = findDatesBefore(beforeDate, availableDates);
    if (datesBefore.length > 0) {
        let datesString = printDates(datesBefore);
        console.log("found dates before : \n", datesString)
        let text = `dates disponibles: \n${datesString}`;
        await axios.post("https://hooks.slack.com/services/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", {text});
    } else {
        if (availableDates.length === 0) {
            console.log("no dates available ");

        } else {
            console.log("no dates available, first date is " + availableDates[0])
        }
    }

}