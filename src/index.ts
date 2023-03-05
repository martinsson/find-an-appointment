import {checkSlotsUseCase} from "./check-slots-usecase";
import {RdvDate} from "./dates/rdv.date";
import {Logger} from "./logger";


function validateArgs() {
    if (process.argv.length <= 2) {
        throw new Error("please provide examen code and the date you'd like to find a time for")
    }
    const examenCode = process.argv[2];
    const beforeDate = RdvDate.fromFrenchDate(process.argv[3])
    return {examenCode, beforeDate};
}

async function runIt() {
    let {examenCode, beforeDate} = validateArgs();
    return checkSlotsUseCase(examenCode, beforeDate)
};

runIt().catch(e => {
    const logger = new Logger()
    logger.error(e.message)
    process.exit(1)
} );