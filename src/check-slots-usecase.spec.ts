import {checkSlotsUseCase} from "./check-slots-usecase";
import {RdvDate} from "./dates/rdv.date";


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