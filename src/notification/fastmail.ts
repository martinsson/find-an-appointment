import {Message, NotificationResult, Notifier, OK} from "./notifier";
import * as nodemailer from "nodemailer";

export class Fastmail implements Notifier {
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

        let htmlContent = message.body.replaceAll("\n", "<br>");
        let info = await transporter.sendMail({
            from: '"Rdv médicaux par Johan 👻" <rdv.medicaux@hackyourjob.com>', // sender address
            to: this.toEmail,
            subject: "Nouveau rdv trouvé",
            text: message.body,
            html: `<p>${htmlContent}</p>`,
        });

        return new OK()
    }

}