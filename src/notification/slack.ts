import {Message, NotificationResult, Notifier, OK} from "./notifier";
import axios from "axios";

export class Slack implements Notifier {
    constructor(private slackHookUrl: string) {

    }

    async notify(message: Message): Promise<NotificationResult> {
        await axios.post(this.slackHookUrl, {text: message});
        return new OK()
    }

}