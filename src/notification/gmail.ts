import {KO, Message, NotificationResult, Notifier} from "./notifier";

export class Gmail implements Notifier {
    constructor(private toEmail: string) {

    }

    async notify(message: Message): Promise<NotificationResult> {
        return new KO("ot implmentned");
    }

}