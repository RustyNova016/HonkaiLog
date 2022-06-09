import {DBModel} from "../tools/Database/DBModel";
import {DataTypes} from "sequelize";
import sequelize from "../tools/Database/SequelizeConnection";
import database from "./database";

class Material_log extends DBModel<Material_log> {
    declare id: number;
    declare count: number;
    declare log_date: Date;

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