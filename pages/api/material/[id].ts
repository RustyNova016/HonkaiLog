import {SequelizeCRUD} from "../../../tools/Database/SequelizeCRUD";
import database from "../../../database/database";

const handler = SequelizeCRUD.getIDRouteHandlerFromModel(database.Material);
export default handler