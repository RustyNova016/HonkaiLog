import {DBModel} from "../tools/Database/DBModel";
import {DataTypes} from "sequelize";
import sequelize from "../tools/Database/SequelizeConnection";
import database from "./database";
import {SequelizeTableCommonDBResults} from "../tools/Types";

export interface MaterialDBResponse extends SequelizeTableCommonDBResults {
    id: number;
    name: string;
}

class Material extends DBModel<Material> {
    declare id: number;
    declare name: string;

    static associate(models: typeof database) {
        Material.hasMany(models.Material_log, {
            foreignKey: 'materialId',
        });
    }
}

Material.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize,
})

export default Material;