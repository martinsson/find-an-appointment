import {Gmail} from "./gmail";

describe.skip('gmail', function () { // does not work
    it('should send an email', async () => {
        const notifier = new Gmail("jm1974@hotmail.com")
        await notifier.notify({body: "slots are available starting on the 2023-03-04"});
    });
});