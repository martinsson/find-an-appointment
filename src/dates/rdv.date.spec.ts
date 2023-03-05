import {SearchResponse} from "../clinique-du-mail/response-types";
import * as fs from "fs";
import {checkSlotsUseCase} from "../check-slots-usecase";
import {findDatesBefore, printDates, RdvDate} from "./rdv.date";
import {extractAvailableDates, nextDay} from "../clinique-du-mail/adapter";


describe('RdvDate', function () {
    describe('findDatesBefore', function () {
        it("should provide the dates that are before a given date", () => {
            let dates = ["2023-04-04", "2023-04-06", "2023-02-21"].map(RdvDate.fromFrenchDate);
            const result = findDatesBefore(RdvDate.fromFrenchDate("2023-04-05"), dates)
            expect(result).toEqual(["2023-04-04", "2023-02-21"].map(RdvDate.fromFrenchDate))
        });

        it("should provide the dates that are before a given date", () => {
            let dates = ["2023-04-04", "2023-04-06", "2023-02-21"].map(RdvDate.fromFrenchDate);
            const result = findDatesBefore(RdvDate.fromFrenchDate("2023-04-01"), dates)
            expect(result).toEqual(["2023-02-21"].map(RdvDate.fromFrenchDate))
        });
    });


    describe('printDates', function () {
        it('should print without time', () => {
            let dates = ["2023-03-05T00:00:00Z","2023-03-10T00:00:00Z"].map(RdvDate.fromFrenchDate);
            expect(printDates(dates)).toEqual("2023-03-05\n2023-03-10")
        });
    });

});



