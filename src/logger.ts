export class Logger {
    log(...msgs: string[]) {
        console.log(new Date().toISOString(), ...msgs)
    }

    error(...msgs: (string | Error)[]) {
        console.error(new Date().toISOString(), ...msgs)
    }
}