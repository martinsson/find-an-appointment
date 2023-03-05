export interface Message {
    body: string
}

class OK {
}

export class KO {
    constructor(public error: string) {
    }
}

export type NotificationResult = OK | KO

export interface Notifier {
    notify(message: Message): NotificationResult;
}