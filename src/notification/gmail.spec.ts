import {Gmail} from "./gmail";

interface EmailMessage {
}

function buildEmail(email: string, messagebody: string): EmailMessage {
    return {}
}

function send(email: EmailMessage) {

}

describe('gmail', function () {
    it('should send an email', async () => {
        const notifier = new Gmail("jm1974@hotmail.com")
        const result = await notifier.notify({body: "slots are available starting on the 2023-03-04"})
        // expect(result).toEqual(new OK())
        // const email = buildEmail("jm1974@hotmail.com", "slots are available starting on the 2023-03-04")
        // expect(() => send(email)).not.toThrow()
    });
});