import {KO, Message, NotificationResult, Notifier} from "./notifier";
import {google} from "googleapis";
import * as path from "path";

export class Gmail implements Notifier {
    constructor(private toEmail: string) {

    }

    async notify(message: Message): Promise<NotificationResult> {


        const gmail = google.gmail('v1');

        async function runSample() {
            // Obtain user credentials to use for the request
            let keyfilePath = path.join(__dirname, '../../credentials.json');
            // const content = fs.readFileSync(keyfilePath)
            // console.log(content)
            // const auth = await authenticate({
            //     keyfilePath: keyfilePath,
            //     scopes: [
            //         'https://mail.google.com/',
            //         'https://www.googleapis.com/auth/gmail.modify',
            //         'https://www.googleapis.com/auth/gmail.compose',
            //         'https://www.googleapis.com/auth/gmail.send',
            //     ],
            // });
            const authServiceAccount = new google.auth.GoogleAuth({
                keyFile: keyfilePath,
                scopes: [
                    // 'https://www.googleapis.com/auth/cloud-platform',
                    'https://mail.google.com/',
                    'https://www.googleapis.com/auth/gmail.modify',
                    'https://www.googleapis.com/auth/gmail.compose',
                    'https://www.googleapis.com/auth/gmail.send',
                ],
            });
            google.options({auth:authServiceAccount});

            // You can use UTF-8 encoding for the subject using the method below.
            // You can also just use a plain string if you don't need anything fancy.
            const subject = '🤘 Hello 🤘';
            const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`;
            const messageParts = [
                'From: Johan Martinsson <martinsson.johan@changit.fr>',
                'To: Johan Martinsson <jm1974@hotmail.com>',
                'Content-Type: text/html; charset=utf-8',
                'MIME-Version: 1.0',
                `Subject: ${utf8Subject}`,
                '',
                'This is a message just to say hello.',
                'So... <b>Hello!</b>  🤘❤️😎',
            ];
            const message = messageParts.join('\n');

            // The body needs to be base64url encoded.
            const encodedMessage = Buffer.from(message)
                .toString('base64')
                .replace(/\+/g, '-')
                .replace(/\//g, '_')
                .replace(/=+$/, '');

            const res = await gmail.users.messages.send({
                userId: 'me',
                requestBody: {
                    raw: encodedMessage,
                },
            });
            console.log('sent message')
            console.log(res.data);
            return res.data;
        }
        await runSample()
        return new KO("ot implmentned");
    }

}