export type MaterialLogData = {
    id: string | null;
    idMaterial: string;
    idUser: string;
    quantityTotal: number;
    quantityChange: number | null;
    /** Date string */
    atTime: string;
    comment: string | null;
    /** Refresh time of the server. So all imports are rounded down at the hour */
    importTime: string | null;
    /** Id of the previous log in the import */
    idPreviousLog: string | null;
    /** Id of the next log in the import */
    idNextLog: string | null;
}