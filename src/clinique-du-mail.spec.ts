import axios from "axios";
import {SearchResponse} from "./response-types";
import * as fs from "fs";

function findDatesBefore(date: Date, dates: Date[]): Date[] {
    return dates.filter(d => d < date)
}
function compare(d1: Date, d2: Date) {
    return d1 < d2 ? -1 : 1;
}

function extractAvailableDates(searchResponse: SearchResponse) {
    let dateStrings = searchResponse.data.creneaux.flatMap(c => c.dates).map(dateElement => dateElement.date);
    let dates = dateStrings.map(ds => new Date(ds));
    return dates.sort(compare);
}

function nextDay(now: Date) {
    return new Date(now.getTime() + (1000 * 3600 * 24));
}

async function invokeCliniqueMailSearch(codeExamen: string) {
    const result = await axios.post<SearchResponse>("https://risweb.groupe-du-mail.com/XaPortaildiffusionmobile/Application/api/PriseRvExternal/SearchCreneauxReservation",
        {
            "codeSite": "",
            "typeExamen": "IR",
            "periode": "00",
            "date": nextDay(new Date()),
            "codeRadiologue": "",
            "typeAssurance": "",
            "isAffichageAllemagne": false,
            "examen": {
                "isProtocole": false,
                "code": codeExamen,
                "libelle": "IRM LOMBAIRE",
                "isProtocoleMutliSite": false
            }
        }
    );
    return result;
}

async function getAvailableDates(codeExamen: string) {
    const result = await invokeCliniqueMailSearch(codeExamen);
    let dateStrings = result.data.data.creneaux.flatMap(c => c.dates).map(dateElement => dateElement.date);
    let datesWithAvailabilities = dateStrings.map(ds => new Date(ds));
    return datesWithAvailabilities;
}

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
        expect(sortedDates[0]).toEqual(new Date("2023-04-05T22:00:00.000Z"))
    });

    it("should provide the dates that are before a given date", () => {
        let dates = ["2023-04-04", "2023-04-06", "2023-02-21"].map(s => new Date(s));
        const result = findDatesBefore(new Date("2023-04-05"), dates)
        expect(result).toEqual([new Date("2023-04-04"), new Date("2023-02-21")])
    });

    it('should ', () => {
        expect(nextDay(new Date("2023-03-05T00:00:00Z")).toISOString()).toEqual("2023-03-06T00:00:00.000Z")
        expect(nextDay(new Date("2023-02-28T00:00:00Z")).toISOString()).toEqual("2023-03-01T00:00:00.000Z")
    });

    // notify if dates before are not empty
});