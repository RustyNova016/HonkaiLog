import {DBModel} from "../tools/Database/DBModel";
import sequelize from "../tools/Database/SequelizeConnection";
import {DataTypes} from "sequelize";
import {database} from "./database";

class User extends DBModel<User> {
    declare id: number;
    declare name: string;
    declare password: string;

    static associate(models: typeof database) {
        User.hasMany(models.Material_log);
    }
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'user'
});

export default User;

/** Type of a responce from the API */
export interface User_response extends User {

}
