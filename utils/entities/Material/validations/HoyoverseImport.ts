import {HoyoverseImportModel} from ".prisma/client";

export class HoyoverseImport implements HoyoverseImportModel {
    id: string;
    idUser: string;
    serverUpdateTime: Date;
    
}