import axios from "axios";
import {SearchResponse} from "../response-types";
import {nextDay} from "../find-dates.before";

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