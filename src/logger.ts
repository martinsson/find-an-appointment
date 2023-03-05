export class Logger {
    log(...msgs: string[]) {
        console.log(this.getTimeStamp(), ...msgs)
    }

    error(...msgs: (string | Error)[]) {
        console.error(this.getTimeStamp(), ...msgs)
    }

    private getTimeStamp() {
        // 2023-03-05T17:17:01.421Z => 2023-03-05 17:17:01
        return new Date().toISOString().replace("T", " ").split(".")[0]
    }
}