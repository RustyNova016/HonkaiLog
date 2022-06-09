import {DBModel} from "../tools/Database/DBModel";
import {DataTypes} from "sequelize";
import sequelize from "../tools/Database/SequelizeConnection";
import database from "./database";

export interface IMaterialLogDBResponse {
    id: number;
    count: number;
    log_date: string;
}

class Material_log extends DBModel<Material_log> implements IMaterialLogDBResponse {
    declare id: number;
    declare count: number;
    declare log_date: string;

    static associate(models: typeof database) {
        Material_log.belongsTo(models.Material);
        Material_log.belongsTo(models.User);
    }
}

Material_log.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    count: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    log_date: {
        type: DataTypes.DATE,
        allowNull: false,
    }
}, {
    sequelize,
})

export default Material_log;