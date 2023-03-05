import {SearchResponse} from "./clinique-du-mail/response-types";
import * as fs from "fs";
import {checkSlotsUseCase} from "./check-slots-usecase";
import {findDatesBefore, printDates, RdvDate} from "./dates/rdv.date";
import {extractAvailableDates, nextDay} from "./clinique-du-mail/adapter";




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