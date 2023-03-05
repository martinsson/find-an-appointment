export interface SearchResponse {
    confirmationMessages: any[];
    data:                 Data;
    dataDashboard:        null;
    exportDocument:       null;
    itemDeleteId:         any[];
    itemId:               any[];
    printDocuments:       any[];
    storageServerId:      string;
    success:              boolean;
    validationErrors:     any[];
}

export interface Data {
    creneaux:           Creneau[];
    debutPeriode:       Date;
    finPeriode:         Date;
    messageEmptyResult: null;
    nbJoursRecherche:   number;
}

export interface Creneau {
    codeSite:    string;
    dates:       DateElement[];
    libelleSite: string;
}

export interface DateElement {
    date:   Date;
    heures: Heure[];
    jour:   string;
}

export interface Heure {
    code:                  string;
    codeCreneau:           string;
    codePoste:             CodePoste;
    codeVacation:          string;
    depassementHonoraires: DepassementHonoraires;
    idProgrammation:       string;
    isFavorite:            boolean;
    libelle:               string;
    listePostesPhases:     null;
}

export enum CodePoste {
    Irced3 = "IRCED3",
    Irdra3 = "IRDRA3",
    Irma22 = "IRMA22",
}

export enum DepassementHonoraires {
    D = "D",
    Empty = "",
}
