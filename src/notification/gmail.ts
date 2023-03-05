import {KO, Message, NotificationResult, Notifier} from "./notifier";

export class Gmail implements Notifier {
    constructor(private toEmail: string) {

    }

    notify(message: Message): NotificationResult {
        return new KO("ot implmentned");
    }

}