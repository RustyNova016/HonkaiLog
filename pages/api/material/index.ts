import {SequelizeCRUD} from "../../../tools/Database/SequelizeCRUD";
import database from "../../../database/database";

const handler = SequelizeCRUD.getRouteHandlerFromModel(database.Material);
export default handler