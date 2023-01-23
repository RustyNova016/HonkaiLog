import {DBModel} from "../tools/Database/DBModel";
import {DataTypes} from "sequelize";
import sequelize from "../tools/Database/SequelizeConnection";
import database from "./database";
import {SequelizeTableCommonDBResults} from "../tools/Types";
import {UserDBResponse} from "./user";
import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import {MaterialDBResponse} from "./materialDBResponse";

/*@Table
class Material_logs extends Model {
  @Column
  id: number;

  @Column
  quantity: number;

  @Column
  log_date: string;


  @HasMany(() => database.Material)
  hobbies: Mate[];
}*/




export interface MaterialLogItemJSON extends SequelizeTableCommonDBResults {
    quantity: number;
    id: number;
    log_date: string;
    materialId: MaterialDBResponse["id"];
    userId: UserDBResponse["id"];
}

class Material_logs extends DBModel<Material_logs> {
    //declare quantity: number;
    //declare id: number;
    //declare log_date: string;

    static associate(models: typeof database) {
        Material_logs.belongsTo(models.Material, {
            foreignKey: 'materialId',

        });
        Material_logs.belongsTo(models.User, {
            foreignKey: 'userId'
        });
    }
}

Material_logs.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    quantity: {
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

export default Material_logs;