import {SearchResponse} from "./response-types";
import * as fs from "fs";
import {extractAvailableDates, findDatesBefore, getAvailableDates, nextDay, RdvDate} from "./find-dates.before";
import {checkSlotsUseCase} from "./check-slots-usecase";
import {printDates} from "./logic";


describe('', function () {
    it.skip('should ', async() => {
        let codeExamen = "ILOMB";
        let datesWithAvailabilities = await getAvailableDates(codeExamen);
        expect(datesWithAvailabilities).toHaveLength(10)
        // expect(dateStrings).toHaveLength(10)
    })
    it('should order dates ', async() => {
        const searchResponse: SearchResponse = JSON.parse(fs.readFileSync("./example-response.json").toString())
        const sortedDates = extractAvailableDates(searchResponse);
        expect(sortedDates[0]).toEqual(RdvDate.fromFrenchDate("2023-04-05T22:00:00.000Z"))
    });

    it('should deduplicate dates ', async() => {
        const searchResponse: SearchResponse = JSON.parse(fs.readFileSync("./example-response.json").toString())
        const sortedDates = extractAvailableDates(searchResponse);
        expect(sortedDates.length).toBeLessThan(10)
    });


    it("should provide the dates that are before a given date", () => {
        let dates = ["2023-04-04", "2023-04-06", "2023-02-21"].map(RdvDate.fromFrenchDate);
        const result = findDatesBefore(RdvDate.fromFrenchDate("2023-04-05"), dates)
        expect(result).toEqual(["2023-04-04", "2023-02-21"].map(RdvDate.fromFrenchDate))
    });

    it('should ', () => {
        expect(nextDay(new Date("2023-03-05T00:00:00Z")).toISOString()).toEqual("2023-03-06T00:00:00.000Z")
        expect(nextDay(new Date("2023-02-28T00:00:00Z")).toISOString()).toEqual("2023-03-01T00:00:00.000Z")
    });

    // notify if dates before are not empty
});

describe('printDates', function () {
    it('should print without time', () => {
        let dates = ["2023-03-05T00:00:00Z","2023-03-10T00:00:00Z"].map(RdvDate.fromFrenchDate);
        expect(printDates(dates)).toEqual("2023-03-05\n2023-03-10")
    });
});

interface EmailMessage {
}

function buildEmail(email: string, messagebody: string): EmailMessage {
    return {}
}

function send(email: EmailMessage) {

}

describe('Send notification', function () {
    it.skip('should send an email', () => {
        const email = buildEmail("jm1974@hotmail.com", "slots are available starting on the 2023-03-04")
        expect(() => send(email)).not.toThrow()
    });
});

describe('use case notify when slots are available', function () {
    it('should not send anything when there are no slots', () => {

    });
    it('should send when slots are available', () => {

    });
});

describe('usecase', function () {
    it.skip('shou ld ', async () => {
        expect(async () => await checkSlotsUseCase("ILOMB", RdvDate.fromFrenchDate("2023-04-10T00:00:00Z"))).not.toThrow()
    });
});