import {SequelizeCRUD} from "../../../tools/Database/SequelizeCRUD";
import database from "../../../database/database";

export interface MaterialAPIFetchResponse {
    id: number,
    name: string
}

const handler = SequelizeCRUD.getIDRouteHandlerFromModel(database.Material);
export default handler