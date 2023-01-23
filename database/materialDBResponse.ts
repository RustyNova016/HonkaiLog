import {SequelizeTableCommonDBResults} from "../tools/Types";

export interface MaterialDBResponse extends SequelizeTableCommonDBResults {
    id: string;
    name: string;
}