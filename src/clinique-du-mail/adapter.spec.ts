import {extractAvailableDates, nextDay} from "./adapter";
import {SearchResponse} from "./response-types";
import fs from "fs";
import {RdvDate} from "../dates/rdv.date";


describe('extractAvailableDates', function () {
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
});
describe('nextDay', function () {
    it('nextDay ', () => {
        expect(nextDay(new Date("2023-03-05T00:00:00Z")).toISOString()).toEqual("2023-03-06T00:00:00.000Z")
        expect(nextDay(new Date("2023-02-28T00:00:00Z")).toISOString()).toEqual("2023-03-01T00:00:00.000Z")
    });
});