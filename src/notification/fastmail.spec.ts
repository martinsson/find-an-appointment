import {OK} from "./notifier";
import {Fastmail} from "./fastmail";

describe('fastmail', function () {
    it('should send an email', async () => {
        jest.setTimeout(10000)
        const notifier = new Fastmail("jm1974@hotmail.com", "c5g2gr7hak8e5zuc")
        const result = await notifier.notify({body: "slots are available starting on the 2023-03-04"})
        expect(result).toBeInstanceOf(OK)
    });
});