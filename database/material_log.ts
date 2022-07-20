import {DBModel} from "../tools/Database/DBModel";
import {DataTypes} from "sequelize";
import sequelize from "../tools/Database/SequelizeConnection";
import database from "./database";
import {SequelizeTableCommonDBResults} from "../tools/Types";
import {UserDBResponse} from "./user";
import {MaterialDBResponse} from "./material";

export interface MaterialLogItemJSON extends SequelizeTableCommonDBResults {
    count: number;
    id: number;
    log_date: string;
    materialId: MaterialDBResponse["id"];
    userId: UserDBResponse["id"];
}

class Material_log extends DBModel<Material_log> {
    //declare count: number;
    //declare id: number;
    //declare log_date: string;

    static associate(models: typeof database) {
        Material_log.belongsTo(models.Material, {
            foreignKey: 'materialId',
        });
        Material_log.belongsTo(models.User, {
            foreignKey: 'userId'
        });
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