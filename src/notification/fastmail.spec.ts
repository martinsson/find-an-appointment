import {Message, NotificationResult, Notifier, OK} from "./notifier";
import * as nodemailer from "nodemailer"

class Fastmail implements Notifier {
    constructor(private toEmail: string, private fastmailPassword: string) {
    }

    async notify(message: Message): Promise<NotificationResult> {
        let transporter = nodemailer.createTransport({
            host: "smtp.fastmail.com",
            port: 587,
            // secure: false, // true for 465, false for other ports
            auth: {
                user: 'contact@hackyourjob.com',
                pass: this.fastmailPassword,
            },
        });

        let info = await transporter.sendMail({
            from: '"Rdv médicaux par Johan 👻" <rdv.medicaux@hackyourjob.com>', // sender address
            to: this.toEmail,
            subject: "Nouveau rdv trouvé",
            text: message.body,
            html: `<p>${message.body}</p>`,
        });

        console.log("result of send", info)

        return new OK()
    }

}

describe('fastmail', function () {
    it('should send an email', async () => {
        jest.setTimeout(10000)
        const notifier = new Fastmail("jm1974@hotmail.com", "c5g2gr7hak8e5zuc")
        const result = await notifier.notify({body: "slots are available starting on the 2023-03-04"})
        expect(result).toBeInstanceOf(OK)
    });
});