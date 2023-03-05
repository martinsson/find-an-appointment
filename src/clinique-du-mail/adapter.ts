import axios from "axios";
import {SearchResponse} from "./response-types";
import {RdvDate} from "../dates/rdv.date";

export function extractAvailableDates(searchResponse: SearchResponse): RdvDate[] {
    let dateStrings: string[] = searchResponse.data.creneaux.flatMap(c => c.dates).map(dateElement => dateElement.date) as any as string[];
    return RdvDate.sortedAndUniqueDates(dateStrings);
}

export function nextDay(now: Date) {
    return new Date(now.getTime() + (1000 * 3600 * 24));
}

export async function invokeCliniqueMailSearch(codeExamen: string) {
    const result = await axios.post<SearchResponse>("https://risweb.groupe-du-mail.com/XaPortaildiffusionmobile/Application/api/PriseRvExternal/SearchCreneauxReservation",
        {
            "codeSite": "",
            "typeExamen": "IR",
            "periode": "00",
            "date": nextDay(new Date()),
            "codeRadiologue": "",
            "typeAssurance": "",
            "isAffichageAllemagne": false,
            "examen": {
                "isProtocole": false,
                "code": codeExamen,
                "libelle": "IRM LOMBAIRE",
                "isProtocoleMutliSite": false
            }
        }
    );
    return result;
}